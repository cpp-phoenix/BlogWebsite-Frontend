import React from 'react'
import { Typography, Link } from '@material-ui/core';
import Signin from './Signin';

const SiginCard = () => {
  return (
    <div className = "signin text-center">
    <div className="upper-heading">
      <Typography className="heading-text" >Blogsters</Typography> <br/>
      <Typography className="sub-heading-text1" >Uniting Thoughts...</Typography>
    </div>
    <div className = "middle-text">
    <Typography variant="h5" className="sub-heading-text2" gutterBottom>Welcome to Blogster</Typography>
    <Signin />
    <Typography variant="caption" display="block" className = "separater" gutterBottom>--------------------- or ----------------------</Typography>
      <div className="google-signIn">
        <img src="https://img.icons8.com/clouds/100/000000/google-logo.png" alt="First slide" className="google-img"/>
        <Typography variant="caption" display="inherit" gutterBottom className = "sign-in">
          Sign in with Google
        </Typography>
      </div>
    </div>
    <div className="bottom-text">
    <Typography gutterBottom>
      New Blogsters? <Link href="#" className = "create-account" color="inherit">Create Account</Link>
    </Typography>
    </div>
    </div>
  )
}

export default SiginCard;
