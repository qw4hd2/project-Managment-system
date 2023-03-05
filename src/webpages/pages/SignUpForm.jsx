import React, { Component } from "react";
import { Link} from "react-router-dom";
import swal from 'sweetalert';
import axios from "axios";
class SignUpForm extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      name: "",
      hasAgreed: false
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

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.hasAgreed==false){
      swal("Attention", "Please Tick on our Statements !", "info",{buttons:{}});
    }else{
      var data = JSON.stringify({
        "userName": this.state.name,
        "email": this.state.email,
        "password": this.state.password
      })
      var config={
        method: "POST",
        url:'http://localhost:5000/api/auth/signup',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      }
      axios(config)
      .then(function (response) {
        swal({
          title:"Thank You",
          text:"You are being registed successfully.You can login now",
          icon:"success",
          buttons:{},
          timer:3000,
        }).then(()=>{
          window.location.replace('/sign-in')
        })
      })
      .catch(function (error) {
        swal({
          title:"Attention",
          text:"Email or UserName Already Taken",
          icon:"info",
          buttons:{},
          timer:3000,
        })
      });
    }
   
  }
  render() {
    return (
      <div className="formCenter">
        <form onSubmit={this.handleSubmit} className="formFields">
          <div className="formField">
            <label className="formFieldLabel" htmlFor="name">
              Full Name
            </label>
            <input type="text" id="name" className="formFieldInput" placeholder="Enter your full name" name="name" value={this.state.name} onChange={this.handleChange}/>
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Password
            </label>
            <input type="password" id="password" className="formFieldInput" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange}/>
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="email">
              E-Mail Address
            </label>
            <input type="email" id="email" className="formFieldInput" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
          </div>
          <div className="formField">
            <label className="formFieldCheckboxLabel">
              <input className="formFieldCheckbox" type="checkbox" name="hasAgreed" value={this.state.hasAgreed} onChange={this.handleChange} />
              I agree all statements in
              <a href="null" className="formFieldTermsLink">
                terms of service
              </a>
            </label>
          </div>

          <div className="formField">
            <button className="formFieldButton">Sign Up</button>{" "}
            <Link to="/sign-in" className="formFieldLink">
              I'm already member
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
export default SignUpForm;
