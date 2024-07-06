import React from "react";

import { Box } from '@mui/material';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// React Slick 라이브러리 사용
function Carousel(props) {
    const settings = {
        dots: true,
        infinite: props.imgs.length > 1,
        speed: 1000,
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
            {
              props.imgs.map((img,index) => (
                
                <Box
                  key={index}
                  component="img"
                  sx={{ 
                    width: props.w, 
                    height: props.h,
                    objectFit: 'cover',
                    display: 'block'
                  }}
                  src={ img.url } 
                  />
              ))
            }
         </Slider>
        </div>
      );
}

export default Carousel;