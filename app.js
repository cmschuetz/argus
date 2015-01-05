var React = require('react')

var App = React.createClass({
  render:function(){
    return (
      <div className="courses">
      <table className="pure-table pure-table-bordered">
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
      <tr>
      <td>32667</td>
      <td>ECE 329</td>
      <td>Smartphone computing and Appli</td>
      <td>F</td>
      <td>3</td>
      </tr>
      <tr>
      <td>32667</td>
      <td>ECE 329</td>
      <td>Smartphone computing and Appli</td>
      <td>F</td>
      <td>3</td>
      </tr>
      <tr>
      <td>32667</td>
      <td>ECE 329</td>
      <td>Smartphone computing and Appli</td>
      <td>F</td>
      <td>3</td>
      </tr>
      <tr>
      <td>32667</td>
      <td>ECE 329</td>
      <td>Smartphone computing and Appli</td>
      <td>F</td>
      <td>3</td>
      </tr>
      <tr>
      <td>32667</td>
      <td>ECE 329</td>
      <td>Smartphone computing and Appli</td>
      <td>F</td>
      <td>3</td>
      </tr>
      <tr>
      <td>32667</td>
      <td>ECE 329</td>
      <td>Smartphone computing and Appli</td>
      <td>F</td>
      <td>3</td>
      </tr>
      </tbody>
      </table>
      </div>
    )
  }
});

React.renderComponent(<App />,document.body)
