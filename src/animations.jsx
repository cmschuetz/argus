var React = require('react')

module.exports = {

  'square': React.createClass({
    render:function(){
      return (
        <div className="spinner">
          <div className="rect1"></div>&nbsp;
          <div className="rect2"></div>&nbsp;
          <div className="rect3"></div>&nbsp;
          <div className="rect4"></div>&nbsp;
          <div className="rect5"></div>
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
