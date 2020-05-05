import React from 'react'
import { Redirect } from 'react-router';
import { Form } from 'react-bootstrap';
import { Button, TextField, Typography, Link } from '@material-ui/core';
import ReactLoading from "react-loading";
import { RestConstants } from '../Constants/application.constants';

class Signin extends React.Component {
  constructor() {
    let username = localStorage.getItem('username');
    let password = localStorage.getItem('password');
    super();
    this.state = {
      username: username != null ? username : "",
      usernameHelperText: "",
      password: password != null ? password : "",
      passwordHelperText: "",
      auth: false,
      loading: false,
      redirect: false
    }
    
  }

  componentDidMount() {
    if(this.state.username !== "" && this.state.password !== "") {
      this.setState({loading: true})
      this.submitData();
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
      this.setState({password: btoa(event.target.value)});
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
    data.password = this.state.password;
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
        localStorage.setItem('username', this.state.username);
        localStorage.setItem('password', this.state.password);
        this.setState({redirect: true, auth: true});
      }
      else {
        alert(data.Status);
      }
    }
  }

  render() {
    if(this.state.redirect) {
      return <Redirect action="REPLACE" to={{
        pathname: '/mainPage',
        state: { 
          auth: this.state.auth,
          activeTab: "Home"
         }
      }}/>;
    }
    if(this.state.loading) {
        return (
          <div style={{position:`absolute`, zIndex: `999` ,textAlign:`center`, width: `100vw`,height: `100vh`,paddingTop: '45vh',paddingLeft: `45vw`,backgroundColor: `white`, left: '-60vw' ,top: `-12%`}}><ReactLoading type={"bars"} color={"yellowgreen"} /></div>
        )
    }
    return(
      <Form id="form">
        <div className = "userEmail">
          <TextField name="username" label="Users name or Email" id="outlined-size-normal" color="primary" helperText={this.state.usernameHelperText} onChange={this.onChangeTextField}/>
        </div>
        <div className = "passwordDiv">
          <TextField name="password" type="password" label="Password" id="outlined-size-normal" helperText={this.state.passwordHelperText} onChange={this.onChangeTextField} />
        </div>  
        <div className = "forgot-password">  
          <Typography className = "forgot-password-typo" gutterBottom>
            <Link onClick={() => {this.props.updateViewState("ForgotPassword")}} href="#" className = "forgot-password-typo1" color="primary">Forgot Password?</Link>
          </Typography>
        </div>

        <div className="button">
          <Button className = "button-internal" color="inherit" onClick={this.submitData}>
            Sign in
          </Button>
        </div>
      </Form>
    )
  }
}

export default Signin;
