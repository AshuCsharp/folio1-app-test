import React from 'react';
import StudentList from '../students/StudentList';
import { Redirect, Link } from "react-router-dom";
import * as dataApi from '../../api/dataApi';


class ClassesList extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = { error: null, items: [], rid: 0, redirectToAddClassPage: false };
    }

    getClasslst = () => {
        dataApi.getClassList().then((result) => {
            this.setState({ items: result }); //item1
        });
    }

    componentDidMount() {
        try {   
            this.getClasslst();            
        } catch (error) {

            console.log(error);
        }
    }

    deleteClass(id) {

        let array = [...this.state.items]; // make a separate copy of the array
        let index = array.findIndex(x => x.id === id);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ items: array });
        }
    }



    handleClick(id) {

        this.setState({ rid: id });
    }

    //handleEdit(id) {
      //  alert(id);
    //}

 


    render() {

        let { error, items } = this.state;
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
                    <p>Class Data</p>
                    <table className="table table-bordered table-sm ">
                        <thead className="thead-light">
                            <tr>
                                <th  style={{ cursor: 'pointer' }}> Class Name</th>
                                <th  style={{ cursor: 'pointer' }}>Location</th>
                                <th>Teacher Name</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map(el => (
                                    <tr  key={el.id}>
                                        <td onClick={() => this.handleClick(el.id)} style={{ cursor: 'pointer' }}>
                                            {el.cname}
                                        </td>
                                        <td onClick={() => this.handleClick(el.id)} style={{ cursor: 'pointer' }}>
                                            {el.location}
                                        </td>
                                        <td >
                                            {el.sal} {el.lname}
                                        </td>
                                        <td >

                                            <Link to={`classmanagement/${el.id}`} params={{ id: el.id }}>Edit</Link>


                                        </td>
                                        <td >
                                            <button onClick={() => this.deleteClass(el.id)} className="btn btn-light">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <td colSpan="5">
                                    {this.state.redirectToAddClassPage && <Redirect to="/classmanagement" />}
                                    <button className="btn btn-light" type="button" onClick={() => this.setState({ redirectToAddClassPage: true })} >Add Class</button>

                                </td>
                            </tr>
                            <tr >
                                <td colSpan="5">
                                    {this.state.rid > 0 ? <StudentList rowId={this.state.rid} /> : " "}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}
export default ClassesList;