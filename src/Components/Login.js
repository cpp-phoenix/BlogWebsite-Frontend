import React, { Component } from 'react';
import '../Login.css';

class Login extends Component {
  render() {
    return(
      <form className="login" action="#">
        <div class="field">
          <label class="label">Email</label>
          <div class="control has-icons-left">
            <input class="input" type="email"/>
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </div>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left">
            <input class="input" type="password"/>
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox" />
              Save Password
            </label>
          </div>
        </div>

      <div class="control">
        <button type="submit" class="button is-link">Login</button>
      </div>
      </form>
    )
  }
}

export default Login;
