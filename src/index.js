var React = require('react');
var router = require('./router.jsx');
var Login = require('./login.jsx')

router.run(function(Handler) {
  React.render(<Handler/>,document.body);
})
