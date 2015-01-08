var React = require('react')
var Router = require('react-router')
var courseList = require('./courseList')


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

  render:function(){

    var rows = []
    for (var key in courseList.courses){
      var info = courseList.courses[key]
      rows.push(<Entry crn={key} course={info.subject + ' ' + info.course} title={info.title} section={info.section} hours={info.hours} />)
    }

    return (
      <div className="courses">
        <table className="pure-table pure-table-horizontal">
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
    )
  }
});
