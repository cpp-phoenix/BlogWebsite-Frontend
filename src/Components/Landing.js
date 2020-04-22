import React, { Component } from 'react';
import SigninCard from './SigninCard'
import CarouselCard from './CarouselCard'
import SignupCard from './SignupCard'
import ContinueToLogin from './ContinueToLogin';
import '../Styles/Landing.css'

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      whichPage: "ContinueToLogin"
    };
  }

  changeViewState(stateName){
    this.setState({whichPage: stateName});
  }

  render() {
    const { whichPage } = this.state;
    return(
      <div class="Landing">
        <div class="CarouselCard" active-view={whichPage}><CarouselCard/></div>
        {whichPage === "ContinueToLogin" && <div class="ContinueToLogin" active-view={whichPage}><ContinueToLogin updateViewState={(stateName) => {this.changeViewState(stateName)}}/></div>}
        {whichPage === "SignIn" && <div class="SignInCard"><SigninCard updateViewState={(stateName) => {this.changeViewState(stateName)}}/></div>}
        {whichPage === "SignUp" && <div class="SignUpCard"><SignupCard updateViewState={(stateName) => {this.changeViewState(stateName)}}/></div> }
      </div>
    )
  }
}

export default Landing;
