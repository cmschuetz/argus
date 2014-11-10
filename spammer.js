var Browser = require("zombie");
var assert = require("assert");
var cheerio = require("cheerio")
var config = require("./config.json")
var courses = []
var course = {}

// Load the page from localhost
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
    var $ = cheerio.load(browser.html());
    $("tr","table.datadisplaytable").each(function(){
      var course = {}
      $(this).find(".dddefault").each(function(){
        $(this).find("input").each(function() {
          if($(this).attr("name") == "CRN_IN"){
            course['CRN'] = $(this).attr("value");
          }
          if($(this).attr("name") == "SUBJ"){
            course['Subject'] = $(this).attr("value");
          }
          if($(this).attr("name") == "CRSE"){
            course['Course'] = $(this).attr("value");
          }
        });
      })
      console.log(course)
      courses.push(course)
      console.log(courses)
    });

  });
