import React from 'react';
import { Button } from '@material-ui/core';
import '../Styles/ContinueToLogin.css'

export default function ContinueToLogin(props) {

  return (
    <div className="button">
      <Button onClick={() => { props.updateViewState("SignIn") }} 
        className="button-internal" color="inherit" size="normal">
        Continue
        </Button>
    </div>
  )
}