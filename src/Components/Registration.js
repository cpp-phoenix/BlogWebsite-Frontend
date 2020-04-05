import React, { Component } from 'react';
import '../Login.css';

class Registration extends Component {
  render() {
    return(
      <form className="login" action="#">
        <div class="field">
          <label class="label">Full Name</label>
          <div class="control has-icons-left">
            <input class="input" type="text"/>
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
          </div>
        </div>

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
          <label class="label">Mobile</label>
          <div class="control has-icons-left">
            <input class="input" type="number"/>
            <span class="icon is-small is-left">
              <i class="fas fa-mobile"></i>
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
              I hereby certify that I am atleast 18 years of age
            </label>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox" />
              I have read and accept the <a href="#"><u>Terms of Use</u></a> and <a href="#"><u>Privacy Policy</u></a>
          </label>
        </div>
      </div>

      <div class="control">
        <button type="submit" class="button is-link">Register Now</button>
      </div>
      </form>
    )
  }
}

export default Registration;
