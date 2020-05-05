import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { Button, TextField } from '@material-ui/core';
import { RestConstants } from '../Constants/application.constants';

class Signup extends Component {

  constructor(){
    super();
    this.state = {
      nameValue: "",
      username: "",
      usernameValue: "",
      email: "",
      emailValue: "",
      password: "",
      passwordValue: "",
      redirect: false,
      avatar: 1,
    }
  }

  handleChange = (event) => {
    if(event.target.name === "Users_name_helper") {
      this.setState({nameValue: event.target.value})
    } 

    if(event.target.name === "name_helper") {
      if(event.target.value === "") {
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
    if(event.target.name === "email_helper") {
      if(event.target.value ==="") {
        this.setState({email: "Email is Mandatory", emailValue: ""});
      }
      else {
        this.setState({
          email: "",
          emailValue: event.target.value
        });
      }
    }
    if(event.target.name === "password_helper") {
      if(event.target.value ==="") {
        this.setState({password: "Password is Mandatory", passwordValue: ""});
      }
      else {
        this.setState({
          password: "",
          passwordValue: btoa(event.target.value)
        });
      }
    }
    if(this.state.usernameValue=== "" || this.state.emailValue === "" || this.state.passwordValue === "" || this.state.nameValue === "") {
      return false;
    }
    return true;
  }

  saveUser = async () => {
    let avatar = (Math.floor(Math.random() * 7) + 1);
    this.setState({avatar: avatar})
    const data = {
      UserName: "",
      Email: "",
      Password: "",
      Name: this.state.nameValue,
      Avatar: avatar
    }
    data.UserName=this.state.usernameValue;
    data.Email = this.state.emailValue;
    data.Password = this.state.passwordValue;
    let response = await fetch(RestConstants.SAVE_USER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accpet': 'application/json'
      },
      body: JSON.stringify(data)
    }).catch(error => {});
    return await response.json();
  }

  submitData = async (event) => {
    if(this.handleChange(event) === true) {
      const data = await this.saveUser();
      if (data.Status === 3002) {
        alert("Username not available");
      }
      else if(data.Status === 3004) {
        alert("Email already present kindly sign in");
      }
      else {
        localStorage.setItem('username', this.state.usernameValue);
        localStorage.setItem('password', this.state.password);
        localStorage.setItem('name', this.state.nameValue);
        localStorage.setItem('avatar', this.state.avatar)
        this.setState({redirect: true});
      }
    }
    else {
      alert("Mandatory Fields are Empty or Invalid Data!");
    }
  }

  render() {
    if(this.state.redirect) {
      return <Redirect action="REPLACE" to={{
        pathname: '/mainPage',
        state: { 
          auth: true,
          activeTab: "Home"
         }
    }} />;
    }
    return(
      <Form id="form-signup">
        <div className = "userName">
          <TextField label="Name" placeholder="Name" name="Users_name_helper" id="outlined-size-normal" color="primary" onChange={this.handleChange}/>
        </div>
        <div className = "userEmail">
          <TextField helperText={this.state.username} name="name_helper" label="UserName" id="outlined-size-normal" color="primary" onChange={this.handleChange}/>
        </div>
        <div className = "userEmailSignUp">
          <TextField helperText={this.state.email} name="email_helper" label="Email" id="outlined-size-normal" onChange={this.handleChange}/>
        </div>  
        <div className = "userPasswordSignUp"> 
          <div>
              <TextField helperText={this.state.password} type="password" name="password_helper" label="Password" id="outlined-size-normal" onChange={this.handleChange}/>
          </div> 
        </div>
        <div className="button-singUp">
          <Button onClick={this.submitData} className = "button-internal-singUp" color="primary">
            Sign up
          </Button>
        </div>
      </Form>
    )
  }
}

export default Signup;
