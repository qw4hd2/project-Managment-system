import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import axios from "axios";

class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = async(event)=> {
    event.preventDefault();
    var data = JSON.stringify({
      "email": this.state.email,
      "password": this.state.password,
    })
    var config = {
      method: "POST",
      url:'http://localhost:5000/api/auth/signin',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    await axios(config)
      .then(function (response) {
        console.log(response.data);
        if('token' in response.data){
          swal({
            title: "Success",
            text: "Login Succefully", 
            icon: "success",
            buttons: false,
            timer:3000,
          }).then((value)=>{
            sessionStorage.setItem('token',response.data['token']);
            sessionStorage.setItem('user',response.data['user']);
            window.location.href="/home";
          })
        }
      }).catch(error => {
        //  display the error message to the user
        swal({
          title: "Error",
          text: error.response.data.message, 
          icon: "error",
          buttons: false,
          dangerMode: true,
          timer:3000,
        });
      });
  }


  render() {
    return (
      <div className="formCenter">
        <form className="formFields" onSubmit={this.handleSubmit}>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="email">
              E-Mail Address
            </label>
            <input
              type="email"
              id="email"
              className="formFieldInput"
              placeholder="Enter your email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="formFieldInput"
              placeholder="Enter your password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          <div className="formField">
            <button className="formFieldButton" onClick={this.handleSubmit}>Sign In</button>
            <Link to="/" className="formFieldLink">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SignInForm;
