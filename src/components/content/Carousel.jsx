import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// React Slick 라이브러리 사용
function Carousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Slider {...settings}>
          <div>
            <h3>Item 1</h3>
          </div>
          <div>
            <h3>Item 2</h3>
          </div>
          <div>
            <h3>Item 3</h3>
          </div>
          <div>
            <h3>Item 4</h3>
          </div>
        </Slider>
      );
}

export default Carousel;