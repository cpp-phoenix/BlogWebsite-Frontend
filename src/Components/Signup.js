import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
import { Button, TextField } from '@material-ui/core';

class Signup extends Component {

  constructor(){
    super();
    this.state = {
      username: "",
      usernameValue: "",
      email: "",
      emailValue: "",
      password: "",
      passwordValue: ""
    }
  }

  handleChange = (event) => {
    if(event.target.name === "name_helper") {
      if(event.target.value === "") {
        console.log("ef");
        this.setState({
          username: "UserName Field Is Mandatory",
          usernameValue: ""
        });
      }
      else {
        this.setState({
          username: "",
          usernameValue: event.target.value
        });
      }
    }
    if(event.target.name === "email_helper" && event.target.value ==="") {
      this.setState({email: "Email is Mandatory", emailValue: ""});
    }
    else {
      this.setState({
        email: "",
        emailValue: event.target.value
      });
    }
    if(event.target.name === "password_helper" && event.target.value ==="") {
      this.setState({password: "Password is Mandatory", passwordValue: ""});
    }
    else {
      this.setState({
        password: "",
        passwordValue: event.target.value
      });
    }
    if(this.state.usernameValue=== "" || this.state.emailValue === "" || this.state.passwordValue === "" ) {
      return false;
    }
    return true;
  }

  submitData = (event) => {

    if(this.handleChange(event) === true) {
      alert("Go on with the submissiion");
    }
    else {
      alert("Mandatory Fields are Empty!");
    }

  }

  render() {
    return(
      <Form id="form-signup">
        <div className = "userEmail">
          <TextField helperText={this.state.username} name="name_helper" label="UserName" id="outlined-size-normal" color="inherit" onChange={this.handleChange}/>
        </div>
        <div>
          <TextField helperText={this.state.email} name="email_helper" label="Email" id="outlined-size-normal" onChange={this.handleChange}/>
        </div>  
        <div className = "userPasswordSignUp"> 
          <div>
              <TextField helperText={this.state.password} name="password_helper" label="Password" id="outlined-size-normal" onChange={this.handleChange}/>
          </div> 
        </div>
        <div className="button-singUp">
          <Button onClick={this.submitData} className = "button-internal-singUp" color="inherit" size="normal">
            Sign up
          </Button>
        </div>
      </Form>
    )
  }
}

export default Signup;
