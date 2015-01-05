var React = require('react')

module.exports = React.createClass({
  render:function(){
    return (
      <div>
        <div className="title">
          <h1>Argus</h1>
          <h2>Because course registration shouldn't be difficult</h2>
        </div>

        <div className="login">
          <form className="pure-form">
            <fieldset>
              <input id="enterprise" type="text" placeholder="EnterpriseID" required></input>&nbsp;
              <input id="password" type="password" placeholder="Password"></input>&nbsp;
              <button type="submit" className="pure-button submit">Login</button>
            </fieldset>
          </form>
        </div>
      </div>
    )
  }
});
