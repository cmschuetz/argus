var Browser = require("zombie");
var assert = require("assert");
var cheerio = require("cheerio")
var config = require("./config.json")
var courses = {}
var crn = ''

// Load the page from localhost
var parse = function(){
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
}

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
    return parse();
  }).
  then(function(){
    console.log(courses)
  });
