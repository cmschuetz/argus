var React = require('react')
var Link = require('react-router').Link
var Navigation = require('react-router').Navigation;

module.exports = React.createClass({

  mixins: [Navigation],

  handleSubmit: function(){
    this.transitionTo('loading');
    var entid = this.refs.entid.getDOMNode().value.trim();
    var pass = this.refs.pass.getDOMNode().value.trim();

  },

  render:function(){
    return (
      <div>
        <div className="title">
          <h1>Argus</h1>
          <h2>Because course registration shouldn't be difficult</h2>
        </div>

        <div className="login">
          <form className="pure-form" onSubmit={this.handleSubmit}>
            <fieldset>
              <input id="enterprise" type="text" placeholder="EnterpriseID" ref="entid" required />&nbsp;
              <input id="password" type="password" placeholder="Password" ref="pass" required />&nbsp;
              <button type="submit" className="pure-button submit">Login</button>
            </fieldset>
          </form>
        </div>
      </div>
    )
  }
});
