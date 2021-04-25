import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import * as dataApi from '../../api/dataApi';


class StudentAdd extends React.Component {
    constructor(props) {
        super(props);
        let id = null,
            fname = "",
            lname = "",
            age = "",
            gpa = "",
            folioClassId = ""


        this.state = {
            fields: {},
            errors: {},
            lastnamematch: {}

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {

        let id = parseInt(this.props.match.params.id);
        if (!isNaN(id)) {
            try {
                dataApi.getStudentList().then((result) => {
                    console.log(result);
                    this.setState({ fields: result.item1.find(element => element.id === id) });
                });
            } catch (error) {

                console.log(error);
            }
        } else {
            try {

                dataApi.getStudentList().then((result) => {
                    this.setState({ lastnamematch: result.item1 });
                });
            } catch {
                this.setStudentData({ error: true });
            }

        }

    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    handleSubmit(event) {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;


        if (!fields["fname"]) {
            formIsValid = false;
            errors["fname"] = "Cannot be empty";
        }

        if (!fields["lname"]) {
            formIsValid = false;
            errors["lname"] = "Cannot be empty";
        }

        if (lastnamematch.item1.map(el => (el.lname).toUpperCase()).indexOf(fields["lname"].toUpperCase()) !== -1) {
            formIsValid = false;
            errors["lname"] = "Cannot be empty";
        }

        if (!fields["age"]) {
            formIsValid = false;
            errors["age"] = "Cannot be empty";
        }

        if (!fields["gpa"]) {
            formIsValid = false;
            errors["gpa"] = "Cannot be empty";
        }

        if (!fields["folioClassId"]) {
            formIsValid = false;
            errors["folioClassId"] = "Cannot be empty";
        }


        return formIsValid;

    }

    contactSubmit(e) {
        e.preventDefault();

        if (this.state.fields.id > 0) {
            //edit code
        }
        else {

            if (this.handleSubmit()) {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 'folioStudent': this.state.fields })
                };
                console.log(JSON.stringify({ 'folioStudent': this.state.fields }));

                fetch('http://localhost:55217/api/Students', requestOptions)
                    .then(response => response.json());
            } else {
                alert("Form has errors.")
            }
        }
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    render() {

        return (
            <form onSubmit={this.contactSubmit.bind(this)}>

                <table className="table table-bordered table-sm ">
                    <tr>
                        <td>
                            <span className="required-field">First Name</span>
                        </td>
                        <td>
                            <input size="30" type="text" name="fname" onChange={this.handleChange.bind(this, "fname")} value={this.state.fields["fname"]} />

                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className="required-field">Last Name</span>
                        </td>
                        <td>
                            <input size="30" type="text" name="lname" onChange={this.handleChange.bind(this, "lname")} value={this.state.fields["lname"]} />
                        </td>
                    </tr>
                    <tr>
                        <td> <span className="required-field">Age</span></td>
                        <td><input type="number" pattern="[0-9]*" inputmode="numeric" name="age" onChange={this.handleChange.bind(this, "age")} value={this.state.fields["age"]} /></td>
                    </tr>
                    <tr>
                        <td className="required-field"><span>GPA</span></td>
                        <td><input type="number" pattern="[0-9]*" inputmode="numeric" name="gpa" onChange={this.handleChange.bind(this, "gpa")} value={this.state.fields["gpa"]} /></td>
                    </tr>
                    <tr>
                        <td>
                            <span className="required-field">Class Name</span>
                        </td>
                        <td>
                            <select onChange={this.handleChange.bind(this, "folioClassId")} value={this.state.fields["folioClassId"]}  value="1"  >
                                <option value="1">Select</option>
                                <option value="2">React</option>
                                <option value="3">Angular</option>
                                <option value="4">MVC</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button>Add Student</button>&nbsp;&nbsp; <Link to="/" className="btn btn-primary">Back to Main</Link>
                        </td>
                    </tr>
                </table>
            </form >
        );
    }
}

export default StudentAdd;
