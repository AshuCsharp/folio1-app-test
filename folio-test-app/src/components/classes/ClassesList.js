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
            this.setState({ isLoaded: true, items: result }); //item1
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

    handleEdit(id) {
        alert(id);
    }

    handleSortClick(fldName) {

        this.setState({
            items: this.state.items.sort(function (a, b) {
                if (a > b)
                    return ('' + a.cname).localeCompare(b.cname)
                if (a < b)
                    return ('' + b.cname).localeCompare(a.cname)
            })
        });
    }


    render() {

        let { error, isLoaded, items } = this.state;
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
                                <th onClick={() => this.handleSortClick("cname")} style={{ cursor: 'pointer' }}> Class Name</th>
                                <th onClick={() => this.handleSortClick("location")} style={{ cursor: 'pointer' }}>Location</th>
                                <th>Teacher Name</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map(el => (
                                    <tr scope="row" key={el.id}>
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
                            <tr scope="row">
                                <td colSpan="5">
                                    {this.state.redirectToAddClassPage && <Redirect to="/classmanagement" />}
                                    <button className="btn btn-light" type="button" onClick={() => this.setState({ redirectToAddClassPage: true })} >Add Class</button>

                                </td>
                            </tr>
                            <tr scope="row">
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