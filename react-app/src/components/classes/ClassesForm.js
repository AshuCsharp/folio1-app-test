import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import * as dataApi from '../../api/dataApi';



class ClassesForm extends React.Component {
    constructor(props) {
        super(props);
        //state fields will always hold one object/record
        this.state = {
            fields: {},
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        //this code will get all the classes from db and then will get the 
        //details of the single class and add the object in Fields.

        let id = parseInt(this.props.id);
        if (!isNaN(id)) {
            try {
                dataApi.getClassList().then((result) => {
                    this.setState({ isLoaded: true, fields: result.item1.find(element => element.id === id) });
                });
            } catch (error) {

                console.log(error);
            }
        }
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    //this is form validaion Block
    handleSubmit(event) {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;


        if (!fields["cname"]) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }

        if (!fields["location"]) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }

        if (!fields["sal"]) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }

        if (!fields["fname"]) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }

        if (!fields["lname"]) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }
        return formIsValid;
    }

    contactSubmit(e) {
        e.preventDefault();
        const formData = this.state.fields;
        if(formData.id === 'undefined'){
            //case of add
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            };
            fetch('https://6079395e460a6600174fb472.mockapi.io/api/v1/folioclasses', requestOptions)
                        .then(response => response.json());
        }else{
            //case of edit
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            };
            fetch('https://6079395e460a6600174fb472.mockapi.io/api/v1/folioclasses/' + formData.id, requestOptions)
                        .then(response => response.json());            
        }                           
    }

    render() {
        return (
            <form onSubmit={this.contactSubmit.bind(this)}>
                <table className="table table-bordered table-sm ">
                    <tr>
                        <td><span className="required-field">Class Name:</span></td>
                        <td><input size="30" type="text" name="cname" onChange={this.handleChange.bind(this, "cname")} value={this.state.fields["cname"]}></input></td>
                    </tr>
                    <tr>
                        <td><span className="required-field">Location:</span></td>
                        <td><input size="30" type="text" name="location" onChange={this.handleChange.bind(this, "location")} value={this.state.fields["location"]}></input></td>
                    </tr>
                    <tr>
                        <td>
                            <span className="required-field">Select</span>
                        </td>
                        <td>
                            <select name="sal" onChange={this.handleChange.bind(this, "sal")} value={this.state.fields["sal"]}>
                                <option value="Select">Select</option>
                                <option value="Mr">Mr</option>
                                <option value="Miss">MIss</option>
                                <option value="Dr">Dr</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><span className="required-field">First Name:</span></td>
                        <td><input size="30" type="text" name="fname" onChange={this.handleChange.bind(this, "fname")} value={this.state.fields["fname"]}></input></td>
                    </tr>
                    <tr>
                        <td><span className="required-field">Last Name:</span></td>
                        <td><input size="30" type="text" name="lname" onChange={this.handleChange.bind(this, "lname")} value={this.state.fields["lname"]}></input></td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <input type="submit" value="Submit" />&nbsp;&nbsp;

                            <Link to="/" className="btn btn-primary">Back to Main</Link>
                        </td>
                    </tr>
                </table>
            </form>
        );
    }
}
export default ClassesForm;





















