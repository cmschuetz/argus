var async = require("async");
var Browser = require("zombie");
var assert = require("assert");
var cheerio = require("cheerio")
var config = require("./config.json")
var courses = {}
var toAdd = ['cool','dix','d','s']
var crn = ''

browser = new Browser()
browser.
  visit("https://eas.admin.uillinois.edu/eas/servlet/EasLogin?redirect=https://webprod.admin.uillinois.edu/ssa/servlet/SelfServiceLogin?appName=edu.uillinois.aits.SelfServiceLogin&dad=BANPROD1").
  then(function(){return browser.fill("#ENT_ID", config.netid).fill("#PASSWORD", config.pass).pressButton("BTN_LOGIN")}).
  then(function() {return browser.clickLink("Registration & Records")}).
  then(function() {return browser.clickLink("Registration")}).
  then(function() {return browser.clickLink("Add/Drop Classes")}).
  then(function() {return browser.clickLink("I Agree to the Above Statement")}).
  then(function() {return browser.pressButton("Submit")}).
  then(function() {
    async.whilst(
      function() {return toAdd.length != 0},
      function(callback){
        var $ = cheerio.load(browser.html());
        $("tr","table.datadisplaytable").each(function(){
          $(this).find(".dddefault").each(function(){
            $(this).find("input").each(function() {
              if($(this).attr("name") == "CRN_IN"){
                crn = $(this).attr("value");
                courses[crn] = {}
              }
              if($(this).attr("name") == "SUBJ"){
                courses[crn].subject = $(this).attr("value");
              }
              if($(this).attr("name") == "CRSE"){
                courses[crn].course = $(this).attr("value");
              }
              if($(this).attr("name") == "TITLE"){
                courses[crn].title = $(this).attr("value");
              }
            });
          })
        });
        console.log(courses)
        toAdd.pop();
        browser.pressButton("Submit Changes").then(callback);
     },
     function(err){
       console.log("done");
     });

  }).
  then(function(){
    //console.log(courses)
  });
