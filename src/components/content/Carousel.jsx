import React from "react";

import { Box } from '@mui/material';

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
        lazyLoad: true,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false
    };

    return (
        <div className="slider-container">

          <Slider {...settings}>
            <Box
              component="img"
              sx={{ width: '100vw', height: 300 }}
              src="/test/test1.png" />
            <Box
              component="img"
              sx={{ width: '100vw', height: 300 }}
              src="/test/test2.png" />
            <Box
              component="img"
              sx={{ width: '100vw', height: 300 }}
              src="/test/test3.png" />
         </Slider>
        </div>
      );
}

export default Carousel;