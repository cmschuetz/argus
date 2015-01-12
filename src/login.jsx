var React = require('react')
var Router = require('react-router');

module.exports = React.createClass({

  mixins: [Router.Navigation,Router.State],

  getInitialState: function(){
    return {
      badCred: false
    }
  },

  handleSubmit: function(e){
    e.preventDefault();
    var entid = this.refs.entid.getDOMNode().value.trim();
    var pass = this.refs.pass.getDOMNode().value.trim();
    this.transitionTo('loading');
    scrammer.scrape(entid,pass,this.afterScrape,this.loginFail);
  },

  afterScrape: function(){
    console.log(scrammer.courses)
    this.transitionTo('courseList')
  },

  loginFail: function(){
    this.transitionTo('login',{
      badCreds: true,
      timeout: false
    })
  },

  render:function(){

    //TODO: really bad solution.  Should change but struggling to pass props with react router.
    var badCreds = this.getParams().badCreds == 'true' ? 'Incorrect EnterpriseID or Password' : null;
    var timeout = this.getParams().timeout == 'true' ? 'Connection Timeout' : null;
    console.log(this.getParams().timeout)
    return (
      <div>
        <div className="title">
          <h1>Argus</h1>
          <h2>Because course registration shouldn't be a hassle</h2>
        </div>

        <div className="login">
          <form className="pure-form" onSubmit={this.handleSubmit}>
            <fieldset>
              <input id="enterprise" type="text" placeholder="EnterpriseID" ref="entid" required />&nbsp;
              <input id="password" type="password" placeholder="Password" ref="pass" required />&nbsp;
              <button type="submit" className="pure-button submit">Login</button>
            </fieldset>
          </form>
          {badCreds}
          {timeout}
        </div>
      </div>
    )
  }
});
