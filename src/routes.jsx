var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Login = require('./login.jsx')
var CourseList = require('./courses.jsx')
var Animations = require('./animations.jsx')

var App = React.createClass({
  displayName : 'Argus',
  render: function () {
    return (
      <RouteHandler/>
    )
  }
})

module.exports = (
  <Route name="app" path="/" handler={App}>
    <Route name="login" path="login/:badCreds/:timeout" handler={Login}/>
    <Route name="loading" handler={Animations.square}/>
    <Route name="courseList" handler={CourseList}/>
    <DefaultRoute handler={Login}/>
  </Route>
);
