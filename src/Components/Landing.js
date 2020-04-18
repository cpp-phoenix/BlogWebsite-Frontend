import React from 'react';
import SigninCard from './SigninCard'
import CarouselCard from './CarouselCard'
import '../Styles/Landing.css'
import '../Styles/Signin.css'
import '../Styles/CarauselCard.css'

const Landing = () => {
  return(
    <div class="Landing">
      <div class="CarouselCard"><CarouselCard/></div>
      <div class="SignInCard"><SigninCard/></div>
    </div>
  )
}

export default Landing;
