import React from 'react';
import { Link } from 'react-router-dom';
import * as dataApi from '../../api/dataApi';

class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, isLoaded: false, items: [] };
  }


  deleteStudent(id) {
    let array = [...this.state.items]; // make a separate copy of the array
    let index = array.findIndex(x => x.id === id);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ items: array });
    }
  }

  componentDidMount() {
    try {
      dataApi.getStudentList().then((result) => {
        this.setState({ items: result }); //item1
      });
    } catch (error) {
      this.setState({ error: true });
    }
  }

  render() {
    const { items } = this.state;

    if (this.state.items.length === 0) {
      return (
        <div>
          <Link to="/StudentAdd" className="btn btn-light">Add Student</Link>
        </div>
      )
    }
    else {
      return (
        <table id="gpamax" className="table table-bordered table-sm">
          <thead className="thead-light">
            <tr>
              <td colSpan="5">Student Data</td>
            </tr>
            <tr>
              <th> Student Name</th>
              <th>Age</th>
              <th>GPA</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>


            {
              items.length === 0 ? <p> Blank</p> :

                items.filter((student) => { return student.folioClassId === parseInt(this.props.rowId) }).map(el => (

                  <tr key={el.id}>
                    <td>{el.fname} {el.lname}</td>
                    <td>{el.age}</td>
                    <td id="tdgpa">{el.gpa}</td>
                    <td>  <Link to={`studentadd/${el.id}`} params={{ id: el.id }}>Edit</Link></td>
                    <td>
                      <button onClick={() => this.deleteStudent(el.id)} className="btn btn-light">Delete</button>
                    </td>
                  </tr>
                ))
            }
            <tr>
              <td colSpan="5">
                <Link to="/StudentAdd" className="btn btn-light">Add</Link>
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
  }
}
export default StudentList;