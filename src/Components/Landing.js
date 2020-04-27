import React, { Component } from 'react';
import SigninCard from './SigninCard'
import CarouselCard from './CarouselCard'
import SignupCard from './SignupCard'
import ContinueToLogin from './ContinueToLogin';
import ForgotPasswordPage from './ForgotPasswordPage';
import '../Styles/Landing.css'

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      whichPage: "ForgotPassword"
    };
  }

  changeViewState(stateName){
    this.setState({whichPage: stateName});
  }

  render() {
    const { whichPage } = this.state;
    return(
      <div className="Landing">
        <div className="CarouselCard" active-view={whichPage}><CarouselCard/></div>
        {whichPage === "ContinueToLogin" && <div className="ContinueToLogin" active-view={whichPage}><ContinueToLogin updateViewState={(stateName) => {this.changeViewState(stateName)}}/></div>}
        {whichPage === "SignIn" && <div className="SignInCard"><SigninCard updateViewState={(stateName) => {this.changeViewState(stateName)}}/></div>}
        {whichPage === "SignUp" && <div className="SignUpCard"><SignupCard updateViewState={(stateName) => {this.changeViewState(stateName)}}/></div> }
        {whichPage === "ForgotPassword" && <div className="ForgotPasswordPage"><ForgotPasswordPage updateViewState={(stateName) => {this.changeViewState(stateName)}}/></div> }
      </div>
    )
  }
}

export default Landing;
