var React = require('react');
var Login = require('./login.jsx')
var Courses = require('./courses.jsx')
var Animations = require('./animations.jsx')

React.render(<Login />,document.body);
React.render(<Animations.circle />,document.body);
React.render(<Courses/>,document.body);
