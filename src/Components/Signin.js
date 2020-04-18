import React from 'react'
import { Form } from 'react-bootstrap';
import { Button, TextField, Typography, Link } from '@material-ui/core';

var Signin = () => {
  return(
    <Form id="form">
      <div className = "userEmail">
        <TextField label="Users name or Email" id="outlined-size-normal" color="inherit"/>
      </div>
      <div>
        <TextField label="Password" id="outlined-size-normal" />
      </div>  
      <div className = "forgot-password">  
        <Typography className = "forgot-password-typo" gutterBottom>
          <Link href="#" className = "forgot-password-typo1" color="inherit">Forgot Password?</Link>
        </Typography>
      </div>

      <div className="button">
        <Button className = "button-internal" color="inherit" size="normal">
          Sign in
        </Button>
      </div>
    </Form>
  )
}

export default Signin;
