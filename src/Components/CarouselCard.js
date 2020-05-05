import React from 'react'
import { Carousel } from 'react-bootstrap';
import '../Styles/CarauselCard.css'

var CarouselCard = () => {
  return(
    <Carousel className = "carausel" fade = "true">
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="food.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>Welcome People</h3>
      <p>Where creativity gets wings</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="book-bindings.jpg"
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>Welkom mensen</h3>
      <p>Waar creativiteit vleugels krijgt</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="compass.jpeg"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>लोगों का स्वागत करते हैं</h3>
      <p>जहां रचनात्मकता को पंख लग जाते हैं</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="table.jpg"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Bienvenido gente</h3>
      <p>Donde la creatividad tiene alas</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
  )
}

export default CarouselCard;
