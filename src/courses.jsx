var React = require('react')
var Router = require('react-router')
var Circles = require('./animations.jsx').circle

var Entry = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.crn}</td>
        <td>{this.props.course}</td>
        <td>{this.props.title}</td>
        <td>{this.props.section}</td>
        <td>{this.props.hours}</td>
      </tr>
    )
  }
})

module.exports = React.createClass({

  mixins: [Router.Navigation],

  getInitialState: function() {
    return {
      registering: false,
      buttonText: false
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();
    if(this.state.registering){
      scrammer.stopSpamming();
    }
    this.setState({
      registering: !this.state.registering,
      buttonText: !this.state.buttonText
    });

    toAdd = this.refs.toAdd.getDOMNode().value.trim().split(/[ ,]+/);
    console.log(toAdd.length)
    scrammer.spam(toAdd,this.doneSpam);
  },

  doneSpam: function(){
    console.log('wooooow')
    this.setState({
      registering: false,
      buttonText: false
    })
    this.transitionTo('courseList')
  },

  logout: function(e) {
    e.preventDefault()
    this.transitionTo('login',{
      badCreds: false,
      timeout: false
    })
    scrammer.logout();
  },

  render:function(){

    var rows = []
    var buttonText = this.state.buttonText ? 'Stop' : 'Register';
    var registering = this.state.registering ? <Circles/> : null;
    console.log(scrammer.courses)
    for (var key in scrammer.courses){
      var info = scrammer.courses[key]
      rows.push(<Entry key={key} crn={key} course={info.subject + ' ' + info.course} title={info.title} section={info.section} hours={info.hours} />)
    }

    return (
      <div>
        <div className="courses">
          <table className="pure-table">
            <thead>
              <tr>
                <th>CRN</th>
                <th>Course</th>
                <th>Title</th>
                <th>Section</th>
                <th>Hours</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
        <div className="register">
          <form className="pure-form" onSubmit={this.handleSubmit}>
            <input type="text" className="pure-input-rounded" ref="toAdd" required/>&nbsp;
            <button type="submit" className="pure-button">{buttonText}</button>
          </form>
        </div>
        <div className="registering">
          {registering}
        </div>
        <div className="logout">
          <button className="pure-button" onClick={this.logout}>Logout</button>
        </div>
      </div>
    )
  }
})
