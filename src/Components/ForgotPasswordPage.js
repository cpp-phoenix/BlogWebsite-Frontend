import React, { Component } from 'react';
import '../Styles/ForgotPassword.css';
import { TextField, Button, Typography, Link } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

class ForgotPasswordPage extends Component {
    constructor() {
      super();
      this.state = {
        username: "",
        usernameHelperText: "", 
        showOtp: false,
        buttonText: "Send Email"
      }
    } 

    sendEmail = (event) => {
      this.setState({
        showOtp: true,
        buttonText: "Submit"
      });
    }
    
    handleChange = (event) => {
      if(event.target.name === "username") {
        if(event.target.value === "") {
          this.setState({usernameHelperText: "Username is mandatory"});
        }
        else {
          this.setState({usernameHelperText: ""});
        }
        this.setState({username: event.target.value});
      }
    }

    render() {
      return(
        <div>
          <div className="back_button_div" onClick={() => {this.props.updateViewState("SignIn")}}> <Button className="back_button" startIcon={<ArrowBackIcon/>}>Back</Button> </div>
          <div className="upper-heading">
            <Typography className="heading-text" >Propagate</Typography> <br/>
            <Typography className="sub-heading-text1" >Uniting Thoughts...</Typography>
          </div>
          <div className="forgot_password_form">
            <div className="textField"><TextField name="username" helperText={this.state.usernameHelperText} label=" Enter UserName" className="textField" id="outlined-size-normal" color="primary" onChange={this.handleChange}/></div>
            {this.state.showOtp && <div className="textField"> <TextField label="Enter Otp" id="outlined-size-normal" color="primary" /> </div>}  <br/>
            <div className="email_button_div"><Button className="email_button" onClick={this.sendEmail}>{this.state.buttonText}</Button></div>
          </div>
          <div className="bottom-text_inherit">
          <Typography gutterBottom>
            New Blogster? <Link href="#" onClick={() => {this.props.updateViewState("SignUp")}} className = "create-account" color="inherit">Create Account</Link>
          </Typography>
          </div>
        </div>
      )
    }
  }
  
  export default ForgotPasswordPage;