global.document= window.document
global.navigator= window.navigator

var React = require('react')

var App = React.createClass({
  render:function(){
    return (
    <div>
        <div class="title">
    <h1>Argus</h1>
    <h2>Because course registration shouldn't be difficult</h2>
  </div>

  <div class="login">
    <form class="pure-form">
      <fieldset>
        <input id="enterprise" type="text" placeholder="EnterpriseID" required></input>
        <input id="password" type="password" placeholder="Password"></input>
        <button type="submit" class="pure-button submit">Login</button>
      </fieldset>
    </form>
  </div>
  </div>
    )
  }
});

React.renderComponent(<App />,document.body)
