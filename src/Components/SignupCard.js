import React, { Component } from 'react';
import { Typography, Link } from '@material-ui/core';
import Signup from './Signup';
import '../Styles/Signup.css'

class SignupCard extends Component {
    render() {
        return (
            <div>
                <div className="upper-heading-signup">
                    <Typography className="heading-text-signup" >Propagate</Typography> <br/>
                    <Typography className="sub-heading-text1-signup" >Uniting Thoughts...</Typography>
                </div>
                <div className = "middle-text-signup">
                <Typography variant="h5" className="sub-heading-text2-singup" gutterBottom>Here To Get Welcomed !</Typography>
                <Signup />
                <div className="bottom-text-signUp">
                    <Link href="#" variant="caption" display="inherit" className = "sign-up" onClick={() => {this.props.updateViewState("SignIn")}} >
                    Already Have An Account? Sign-In
                    </Link>
                </div>
                </div>
            </div>
        )
    }
}

export default SignupCard;