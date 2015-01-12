var async = require("async");
var Browser = require("zombie");
var cheerio = require("cheerio");

module.exports = {

  courses: {},

  spamming: true,

  scrape: function(entid,pass,success,failure){
    var _this = this
    _this.browser = new Browser()
    _this.browser.
    visit("https://eas.admin.uillinois.edu/eas/servlet/EasLogin?redirect=https://webprod.admin.uillinois.edu/ssa/servlet/SelfServiceLogin?appName=edu.uillinois.aits.SelfServiceLogin&dad=BANPROD1").
    then(function(){return _this.browser.fill("#ENT_ID", entid).fill("#PASSWORD", pass).pressButton("BTN_LOGIN")}).
    then(function() {
      //TODO awful code.  Need to handle errors better
      if(_this.browser.queryAll('a.submenulinktext2').length == 0){
        failure();
      }
      return _this.browser.clickLink("Registration & Records")}).
    then(function() {return _this.browser.clickLink("Registration")}).
    then(function() {return _this.browser.clickLink("Add/Drop Classes")}).
    then(function() {return _this.browser.clickLink("I Agree to the Above Statement")}).
    then(function() {return _this.browser.pressButton("Submit")}).
    then(function() {
      _this.scraper(_this.browser.html())
      success();
    });
  },

  spam: function(toAdd,webCallback){
    this.spamming = true;
    var _this = this
    console.log('ghey?')
    console.log(toAdd.length)
    console.log(toAdd.length != 0 && this.spamming)
    async.doWhilst(
      function(callback){
        console.log('here?')
        $ = cheerio.load(_this.browser.html());
        $("tr","table.datadisplaytable").each(function(){
          $(this).find(".dddefault").each(function(){
            $(this).find("input").each(function() {
              if($(this).attr("name") == "CRN_IN" && toAdd.indexOf($(this).attr("value")) > -1){
                newCrn = $(this).attr("value")
                _this.scraper(_this.browser.html());
                toAdd.splice(toAdd.indexOf($(this).attr("value")),1)
              }
            });
          })
        });
        console.log(_this.courses)
        for(var i = 1; i <= toAdd.length; i++){
          _this.browser.fill('#crn_id' + i, toAdd[i-1])
        }
        console.log(toAdd.length)
        _this.browser.pressButton("Submit Changes").then(callback);
      },
      function() {return (toAdd.length != 0 && _this.spamming)},
      function(err){
        console.log(err);
        webCallback()
      });
  },

  scraper: function(html){
    _this = this
    $ = cheerio.load(html);
    $("tr","table.datadisplaytable").each(function(){
      $(this).find(".dddefault").each(function(){
        $(this).find("input").each(function() {
          if($(this).attr("name") == "CRN_IN"){
            crn = $(this).attr("value");
            if(_this.courses[crn] == null){
              _this.courses[crn] = {}
            }
          }
          if($(this).attr("name") == "SUBJ"){
            _this.courses[crn].subject = $(this).attr("value");
          }
          if($(this).attr("name") == "CRSE"){
            _this.courses[crn].course = $(this).attr("value");
          }
          if($(this).attr("name") == "TITLE"){
            _this.courses[crn].title = $(this).attr("value");
          }
          if($(this).attr("name") == "SEC"){
            _this.courses[crn].section = $(this).attr("value");
          }
          if($(this).attr("name") == "CRED"){
            _this.courses[crn].hours = parseInt($(this).attr("value"));
          }
        });
      })
    });
  },

  stopSpamming: function() {
    this.spamming = false;
  },

  logout: function(){
    this.stopSpamming();
    this.browser.close()
    delete this.browser;
  }

}
