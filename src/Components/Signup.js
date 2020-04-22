import React from 'react'
import { Form } from 'react-bootstrap';
import { Button, TextField } from '@material-ui/core';

var Signup = () => {
  return(
    <Form id="form-signup">
      <div className = "userEmail">
        <TextField helperText="12324" label="UserName" id="outlined-size-normal" color="inherit" required error="true" />
      </div>
      <div>
        <TextField label="Email" id="outlined-size-normal" required/>
      </div>  
      <div className = "userPasswordSignUp"> 
        <div>
            <TextField label="Password" id="outlined-size-normal" required/>
        </div> 
      </div>
      <div className="button-singUp">
        <Button className = "button-internal-singUp" color="inherit" size="normal">
          Sign up
        </Button>
      </div>
    </Form>
  )
}

export default Signup;
