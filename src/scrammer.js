var async = require("async");
var Browser = require("zombie");
var cheerio = require("cheerio");
var browser = new Browser()

module.exports = {

  courses: {},

  spamming: true,

  scrape: function(entid,pass,callback){
    var _this = this
    browser.
    visit("https://eas.admin.uillinois.edu/eas/servlet/EasLogin?redirect=https://webprod.admin.uillinois.edu/ssa/servlet/SelfServiceLogin?appName=edu.uillinois.aits.SelfServiceLogin&dad=BANPROD1").
    then(function(){return browser.fill("#ENT_ID", entid).fill("#PASSWORD", pass).pressButton("BTN_LOGIN")}).
    then(function() {return browser.clickLink("Registration & Records")}).
    then(function() {return browser.clickLink("Registration")}).
    then(function() {return browser.clickLink("Add/Drop Classes")}).
    then(function() {return browser.clickLink("I Agree to the Above Statement")}).
    then(function() {return browser.pressButton("Submit")}).
    then(function() {
      _this.scraper(browser.html())
      callback()
    });
  },

  spam: function(toAdd,webCallback){
    this.spamming = true;
    _this = this
    console.log('ghey?')
    console.log(toAdd.length)
    console.log(toAdd.length != 0 && this.spamming)
    async.whilst(
      function() {return (toAdd.length != 0 && _this.spamming)},
      function(callback){
        console.log('here?')
        var $ = cheerio.load(browser.html());
        $("tr","table.datadisplaytable").each(function(){
          $(this).find(".dddefault").each(function(){
            $(this).find("input").each(function() {
              if($(this).attr("name") == "CRN_IN" && toAdd.indexOf($(this).attr("value")) > -1){
                var newCrn = $(this).attr("value")
                _this.scraper(browser.html());
                toAdd.splice(toAdd.indexOf($(this).attr("value")),1)
                //TODO call nodemailer
              }
            });
          })
        });
        console.log(_this.courses)
        for(var i = 1; i <= toAdd.length; i++){
          browser.fill('#crn_id' + i, toAdd[i-1])
        }
        console.log(toAdd.length)
        browser.pressButton("Submit Changes").then(callback);
      },
      function(err){
        console.log(err);
        webCallback()
      });
  },

  scraper: function(html){
    _this = this
    var $ = cheerio.load(html);
    $("tr","table.datadisplaytable").each(function(){
      $(this).find(".dddefault").each(function(){
        $(this).find("input").each(function() {
          if($(this).attr("name") == "CRN_IN"){
            crn = $(this).attr("value");
            _this.courses[crn] = {}
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
    browser.close()
  }

}
