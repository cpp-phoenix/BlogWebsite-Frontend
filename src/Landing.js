import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import Login from './Components/Login';
import Registration from './Components/Registration';
import BlogInfo from './Components/BlogInfo'
import './Landing.css';

class Landing extends Component {
  render() {
    return(
      <BrowserRouter>
        <div className="landing">
          <div class="columns">
            <div class="column">
              <BlogInfo />
            </div>
            <div class="column">
              <div class="buttons login-button">
                <button class="button is-info is-light"><Link to="/">Registration</Link></button>
                <button class="button is-info is-light"><Link to="/login">Login</Link></button>
              </div>
              <Switch>
                <Route exact path="/" component={Registration} />
                <Route path="/login" component={Login} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default Landing;
