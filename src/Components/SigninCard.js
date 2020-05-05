import React, { Component } from 'react'
import { Typography, Link } from '@material-ui/core';
import Signin from './Signin';
import '../Styles/Signin.css'

class SiginCard extends Component {
  render() {
    return (
      <div className = "signin text-center">
      <div className="upper-heading">
        <Typography className="heading-text" >Propagate</Typography> <br/>
        <Typography className="sub-heading-text1" >Uniting Thoughts...</Typography>
      </div>
      <div className = "middle-text">
      <Typography variant="h5" className="sub-heading-text2" gutterBottom>Welcome to Blogsters</Typography>
      <Signin updateViewState={this.props.updateViewState}/>
      <Typography variant="caption" display="block" className = "separater" gutterBottom>--------------------- or ----------------------</Typography>
        <div className="google-signIn">
          <img src="https://img.icons8.com/clouds/100/000000/google-logo.png" alt="First slide" className="google-img"/>
          <Typography variant="caption" gutterBottom className = "sign-in">
            Sign in with Google
          </Typography>
        </div>
      </div>
      <div className="bottom-text">
      <Typography gutterBottom>
        New Blogster? <Link href="#" onClick={() => {this.props.updateViewState("SignUp")}} className = "create-account" color="inherit">Create Account</Link>
      </Typography>
      </div>
      </div>
    )
  }
}

export default SiginCard;
