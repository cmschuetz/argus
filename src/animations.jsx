var React = require('react')
var Link = require('react-router').Link

module.exports = {

  'square': React.createClass({
    render:function(){
      return (
        <div>
          <div className="spinner">
            <div className="rect1"></div>&nbsp;
            <div className="rect2"></div>&nbsp;
            <div className="rect3"></div>&nbsp;
            <div className="rect4"></div>&nbsp;
            <div className="rect5"></div>
          </div>
          <Link to="courses">Courses</Link>
        </div>
      )
    }
  }),

  'circle': React.createClass({
    render:function(){
      return (
        <div className="spinner2">
          <div className="bounce1"></div>&nbsp;
          <div className="bounce2"></div>&nbsp;
          <div className="bounce3"></div>
        </div>
      )
    }
  })

};
