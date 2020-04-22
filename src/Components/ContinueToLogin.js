import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import '../Styles/ContinueToLogin.css'

class ContinueToLogin extends Component {
    render() {
      return(
        <div className="button">
        <Button onClick={() => {this.props.updateViewState("SignIn")}} className = "button-internal" color="inherit" size="normal">
          Continue
        </Button>
      </div>
      )
    }
  }
  
  export default ContinueToLogin;