import React, { Component } from "react";

import PhoneInput from "react-phone-input-2";
import "./AllForms/MyForm.css";
import "react-phone-input-2/lib/bootstrap.css";
import { Button } from "react-bootstrap";

import axios from "axios";
// function Form(){}
// function fetchPatient() {
//     fetch(patientList)
//     .then(resp => resp.json())
//     .then (data =>{
//         console.log(data)

//     })
// }

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patientname: "",
            age: 0,
            address: "",
            comments: "",
            doctor: 0,
            dateofbirth: "", //
            phone: "", //(234) --- ----
            message: "",
            patientList:[]
        } 
       
    }

   
    handlePatientName = (event) => {
        this.setState({
            patientname: event.target.value
        })
    }

    handleAge = (event) => {
        this.setState({
            age: event.target.value
        })
    }

    handleDateofBirth = (event) => {
        this.setState({
            dateofbirth: event.target.value
        })
    }
    handleAddress = (event) => {
        this.setState({
            address: event.target.value
        })
    }

    handleInput = (event) => {
        this.setState({
            phone: event.target.value
        })
    }
    handleComments = (event) => {
        this.setState({
            comments: event.target.value
        })
    }

    handleDoctor = (event) => {
        this.setState({
            doctor: event.target.value
        })
    }

    handlePatientList = (event) => {
        this.setState({
            patientList: event.target.value
        })
    }
    onFormSubmit = (event) => {
        event.preventDefault();
        alert(
            `${this.state.patientname} ${this.state.age} ${this.state.dateofbirth} ${this.state.address} ${this.state.phone} ${this.state.doctor} ${this.state.comments}`);
    }

    componentDidMount = () => {
        axios.get('http://localhost:5000/hello').then((response) => {
            console.log(response)
            this.setState({
                message: response.data
            })
        });
    }
    //http:localhost:3000/
    submitForm = () => {
        axios.post('/api/add-patient-info', {
            patientName: this.state.patientname, age: this.state.age, dateofbirth:this.state.dateofbirth,
            address: this.state.address, phone:this.state.phone,  doctorId: this.state.doctor,
            comments: this.state.comments
        }).then((response) => {
            console.log(response);
            alert(response.data);
        });
    }

    deletePatient = (id) => {
        axios.post('/api/delete-patient',{id:this.state.id}).then((response) =>{
            console.log(response.data);
        });
    };

  

    getAllPatients = () => {
        axios.get('http://localhost:3000/api/get-all-patients').then((response) => {
                console.log(response);           
        });
    }
    render() {
        return (
            <form onSubmit={this.onFormSubmit} className="intake_form">

                <div className="new-form__control">
                    <label>Patient's Name:</label>
                    <input
                        type="text"
                        value={this.state.patientname}
                        onChange={this.handlePatientName}
                    ></input>
                </div>
                <div className="new-form__control">
                    <label>Age:</label>
                    <input
                        type="number"
                        value={this.state.age}
                        onChange={this.handleAge}
                    ></input>
                </div>
                <div className="new-form__control">
                    <label>Date of Date of Birth</label>
                    <input
                        type="date"
                        value={this.state.dateofbirth}
                        onChange={this.handleDateofBirth}
                    ></input>
                </div>
                <div className="new-form__control">
                    <label>Address:</label>
                    <input
                        type="text"
                        value={this.state.address}
                        onChange={this.handleAddress}
                    ></input>
                </div>
                <div className="new-form__control">
                    <label>Phone Number:</label>
                    <PhoneInput
                        country={"ca"}
                        value={this.state.phone}
                        onChange={(phone) => this.setState({ phone })}
                    />
                </div>
                <div className="new-form__control">
                    <label>Select Doctor:</label>
                    <select value={this.state.doctor} onChange={this.handleDoctor}>
                        <option value="1">Dr. Mary</option>
                        <option value="2">Dr. Smith</option>
                        <option value="3">Dr. John</option>
                    </select>
                </div>
                <div className="new-form__control">
                    <label>Doctor Comments:</label>
                    <textarea
                        value={this.state.comments}
                        onChange={this.handleComments}
                    ></textarea>
                </div>
                <div className="btn-spancing">
                    <Button variant="primary" size="lg" block onClick={this.submitForm}> Submit</Button>
                </div>
                <div className="btn-spancing">
                    <Button variant="info" size="lg" block onClick={this.getAllPatients}> Show Patient List</Button>
                </div>

                
               

            </form>
        );
    }
}
export default Form;
