import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import * as dataApi from '../../api/dataApi';

class StudentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, isLoaded: false, items: [], gpaArray: [], highestGPA: 0.0 };
    }

    componentDidMount() {
        try {
            dataApi.getStudentList().then((result) => {
                this.setState({ isLoaded: true, items: result.item1 });
            });
        } catch {
            this.setState({ error: true });
        }
    }

    deleteStudent(id) {
        let array = [...this.state.items]; // make a separate copy of the array
        let index = array.findIndex(x => x.id === id);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ items: array });
        }
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return (
                <div>
                    <p>
                        Error: {error}
                    </p>
                </div>
            )
        }
        else {
            return (
                <div>
                    <p>Student Data </p>
                    <table className="table table-bordered table-sm">
                        <thead className="thead-light">
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
                                items.filter((student) => { return student.folioClassId === parseInt(this.props.rowId) }).map(el => (
                                    <tr key={el.id}>
                                        <td>{el.fname} {el.lname}</td>
                                        <td>{el.age}</td>
                                        <td>{el.gpa}</td>

                                        <td>  <Link to={`studentadd/${el.id}`} params={{ id: el.id }}>Edit</Link>
 </td>
                                        <td>
                                            <button onClick={() => this.deleteStudent(el.id)} className="btn btn-light">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                            <tr>
                            <Link to="/StudentAdd" className="btn btn-light">Add</Link>
                                
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default StudentList;

