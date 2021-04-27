import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import * as dataApi from '../../api/dataApi';


class StudentAdd extends React.Component {
    constructor(props) {
        super(props);

        // state will hold the student data for add and edit, lnamedata is used to 
        //match the unique last name.

        this.state = {
            fields: {},
            errors: {},
            lnamedata: {},
            classList: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameCondition = this.handleSubmit.bind(this);
    }


    componentDidMount() {

        let id = parseInt(this.props.match.params.id);
        //lnamedata will hold the student data 
        dataApi.getStudentList().then((result) => {
            this.setState({ lnamedata: result }); //.item1
        });
        dataApi.getClassList().then((result) => {
            this.setState(() => {
                return { classList: result }
            }); //.item1
        });
        if (!isNaN(id)) {
            //this is the case of edit
            try {


                this.setState({ fields: this.state.lnamedata.find(element => element.id === id) }); //item1 need to me removed. result wil hold the object that user is modifying 

            } catch (error) {

            }
        }
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }


    //this is where form validation checks
    handleSubmit(event) {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;


        if (!fields["fname"]) {
            formIsValid = false;
            errors["fname"] = "Cannot be empty";
        }

       




        const handleNameCondition = () => {
            if (fields["lname"]) {
                // this.state.lnamedata.map(a => console.log(a.lname.toUpperCase()))

                let id = parseInt(this.props.match.params.id);
                if (!isNaN(id)) {
                    let oldlname = this.state.lnamedata.find(element => parseInt(element.id) === id)
                    if (oldlname.lname.toUpperCase() !== fields["lname"].toUpperCase()) {
                        if (this.state.lnamedata.find(e => { (e.lname.toUpperCase()) === fields["lname"].toUpperCase() })) {


                            formIsValid = false;
                            //errors["lname"] = "Last name can't be similar";
                        }
                    }
                } else {
                    if (typeof (state.lnamedata) !== 'undefined') {
                        if (this.state.lnamedata.find(e => { (e.lname.toUpperCase()) === fields["lname"].toUpperCase() })) {
                            formIsValid = false;
                            errors["lname"] = "Last name can't be similar";
                        }
                    }
                }
            }

        }


        if (!fields["lname"]) {
            formIsValid = false;
            errors["lname"] = "Cannot be empty";
        } else {
            //handleNameCondition();
        }


        if (!fields["age"]) {
            formIsValid = false;
            errors["age"] = "Cannot be empty";
        }

        if (!fields["gpa"]) {
            formIsValid = false;
            errors["gpa"] = "Cannot be empty";
        }

        if (fields["folioClassId"] === 0) {
            formIsValid = false;
            errors["folioClassId"] = "Cannot be empty";
        }

        this.setState({ errors: errors });
        return formIsValid;

    }

    contactSubmit(e) {
        e.preventDefault();
        const formData = this.state.fields;
        if (typeof (formData.id) === 'undefined') {
            if (this.handleSubmit()) {
                //case of add
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ formData })
                };
               

                fetch('https://6079395e460a6600174fb472.mockapi.io/api/v1/Students', requestOptions)
                    .then(response => response.json());
            } else {
                alert(JSON.stringify(this.state.errors));
            }
        }
        else {
            //case of edit
            if (this.handleSubmit()) {
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ formData })
                };
       

                fetch('https://6079395e460a6600174fb472.mockapi.io/api/v1/Students/' + id, requestOptions)
                    .then(response => response.json());
            } else {
                alert(JSON.stringify(this.state.errors));
            }
        }
    }



    render() {
        let _state = this.state;
        const classOptions = this.state.classList.map(function (element) {
            return <option value={element.id} selected={element.id == _state.fields["folioClassId"]} >{element.cname}</option>;
        });
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
                        <td><span>GPA</span></td>
                        <td><input type="number" step="0.01" inputmode="numeric" name="gpa" onChange={this.handleChange.bind(this, "gpa")} value={this.state.fields["gpa"]} /></td>
                    </tr>
                    <tr>
                        <td>
                            <span className="required-field">Class Name</span>
                        </td>
                        <td>
                            <select name="folioClassId" onChange={this.handleChange.bind(this, "classList")}   >
                                <option value="0">Select</option>
                                {classOptions}

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
