var React = require('react')
var Navigation = require('react-router').Navigation;

module.exports = React.createClass({

  mixins: [Navigation],

  handleSubmit: function(e){
    e.preventDefault();
    var entid = this.refs.entid.getDOMNode().value.trim();
    var pass = this.refs.pass.getDOMNode().value.trim();
    this.transitionTo('loading');
    scrammer.scrape(entid,pass,this.afterScrape);
  },

  afterScrape: function(courses){
    console.log(courses)
    this.transitionTo('courses')
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
