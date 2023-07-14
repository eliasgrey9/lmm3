import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import style from "./goalCarousel.module.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Slide1 from "./Slide1/Slide1";
import Slide2 from "./Slide2/Slide2";
import Slide3 from "./Slide3/Slide3";
import Slide4 from "./Slide4/Slide4";
import Slide5 from "./Slide5/Slide5";

const MyCarousel = ({ userId, user }) => {
  const [weightGoal, setWeightGoal] = useState(150);
  const [validatorEmail, setValidatorEmail] = useState("");
  const [giftCardValue, setGiftCardValue] = useState(25);
  const [deadlineDate, setDeadlineDate] = useState(new Date());

  return (
    <>
      {user ? (
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
            <Slide1 weightGoal={weightGoal} setWeightGoal={setWeightGoal} />
          </div>

          <div className={style.slide}>
            <Slide2
              deadlineDate={deadlineDate}
              setDeadlineDate={setDeadlineDate}
              weightGoal={weightGoal}
            />
          </div>
          <div className={style.slide}>
            <Slide3
              validatorEmail={validatorEmail}
              setValidatorEmail={setValidatorEmail}
            />
          </div>
          <div className={style.slide}>
            <Slide4
              giftCardValue={giftCardValue}
              setGiftCardValue={setGiftCardValue}
            />
          </div>

          <div className={style.slide}>
            <Slide5
              user={user}
              weightGoal={weightGoal}
              validatorEmail={validatorEmail}
              deadlineDate={deadlineDate}
              giftCardValue={giftCardValue}
            />
          </div>
        </Carousel>
      ) : (
        <>
          <div className={style.container}>
            To make a goal, please{" "}
            <span>
              <a className={style.anchor} href="/signIn">
                sign in
              </a>{" "}
              or{" "}
              <a className={style.anchor} href="/signUp">
                sign up
              </a>
              !
            </span>
          </div>
        </>
      )}
    </>
  );
};

export default MyCarousel;
