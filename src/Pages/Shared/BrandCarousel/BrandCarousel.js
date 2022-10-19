import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Brand1 from "../../../assets/brands/running.jpg";
import Brand2 from "../../../assets/brands/swimming.jpg";

const BrandCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={Brand1} alt="First slide" />
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={Brand2} alt="Second slide" />
      </Carousel.Item>
    </Carousel>
  );
};

export default BrandCarousel;
