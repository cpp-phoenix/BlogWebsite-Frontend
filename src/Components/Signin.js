import React from 'react'
import { Form } from 'react-bootstrap';
import { Button, TextField, Typography, Link } from '@material-ui/core';
import { RestConstants } from '../Constants/application.constants';

class Signin extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      usernameHelperText: "",
      password: "",
      passwordHelperText: ""
    }
  }

  onChangeTextField = (event) => {
    if (event.target.name === "username") {
      if(event.target.value !== "") {
        this.setState({usernameHelperText: ""});
      }
      else {
        this.setState({usernameHelperText: "This field is mandatory"});
      }
      this.setState({username: event.target.value});
    }
    else {
      if(event.target.value !== "") {
        this.setState({passwordHelperText: ""});
      }
      else {
        this.setState({passwordHelperText: "Password is mandatory"});
      }
      this.setState({password: event.target.value});
    }
  }

  authenticateUser = async () => {
    const data = {
      userName: "",
      email: "",
      password: ""
    }
    if (this.state.username.indexOf(".com") === -1) {
      data.userName = this.state.username;
    }
    else {
      data.email = this.state.username;
    }
    data.password = btoa(this.state.password);
    let response = await fetch(RestConstants.AUTHENTICATE_USER, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    }).catch(error => {});

    return await response.json();
  }

  submitData = async (event) => {
    if(this.state.username === "") {
      this.setState({usernameHelperText: "This field is mandatory"});
    }
    if(this.state.password === "") {
      this.setState({passwordHelperText: "Password is mandatory"});
    }
    if(this.state.username !== "" && this.state.password !== "") {
      const data = await this.authenticateUser();
      if(data.Status === 3000) {
        alert("User Authorised Sucessfully!");
      }
      else {
        alert(data.Status);
      }
    }
  }

  render() {
    return(
      <Form id="form">
        <div className = "userEmail">
          <TextField name="username" label="Users name or Email" id="outlined-size-normal" color="inherit" helperText={this.state.usernameHelperText} onChange={this.onChangeTextField}/>
        </div>
        <div className = "passwordDiv">
          <TextField name="password" type="password" label="Password" id="outlined-size-normal" helperText={this.state.passwordHelperText} onChange={this.onChangeTextField} />
        </div>  
        <div className = "forgot-password">  
          <Typography className = "forgot-password-typo" gutterBottom>
            <Link onClick={() => {this.props.updateViewState("ForgotPassword")}} href="#" className = "forgot-password-typo1" color="inherit">Forgot Password?</Link>
          </Typography>
        </div>

        <div className="button">
          <Button className = "button-internal" color="inherit" size="normal" onClick={this.submitData}>
            Sign in
          </Button>
        </div>
      </Form>
    )
  }
}

export default Signin;
