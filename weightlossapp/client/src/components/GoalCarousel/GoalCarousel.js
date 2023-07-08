import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import style from "./goalCarousel.module.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Slide1 from "./Slide1/Slide1";

const MyCarousel = () => {
  return (
    <Carousel
      showThumbs={false}
      renderArrowPrev={(onClickHandler, hasPrev) =>
        hasPrev && (
          <AiOutlineArrowLeft
            className={`${style.arrow} ${style.prev}`}
            onClick={onClickHandler}
          />
        )
      }
      renderArrowNext={(onClickHandler, hasNext) =>
        hasNext && (
          <AiOutlineArrowRight
            className={`${style.arrow} ${style.next}`}
            onClick={onClickHandler}
          />
        )
      }
      className={style.carousel}
    >
      <div className={style.slide}>
        <Slide1 />
      </div>
      <div>
        <h3>Slide 2</h3>
      </div>
      <div>
        <h3>Slide 3</h3>
      </div>
      <div>
        <h3>Slide 4</h3>
      </div>
    </Carousel>
  );
};

export default MyCarousel;
