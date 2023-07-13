import React, { useState } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import style from "./goalCarousel.module.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Slide1 from "./Slide1/Slide1";
import Slide2 from "./Slide2/Slide2";
import Slide3 from "./Slide3/Slide3";
import Slide4 from "./Slide4/Slide4";
import Slide5 from "./Slide5/Slide5";
const API_URL = process.env.REACT_APP_API_URL;

const MyCarousel = ({ userId, user }) => {
  const [poundsToLose, setPoundsToLose] = useState(150);
  const [validatorEmail, setValidatorEmail] = useState("");
  const [giftCardValue, setGiftCardValue] = useState(25);
  const [deadlineDate, setDeadlineDate] = useState(new Date());
  const [stripeTotal, setStripeTotal] = useState(giftCardValue + 5);

  const createGoal = async () => {
    const goalData = {
      pounds: poundsToLose,
      validatorEmail: validatorEmail,
      deadline: deadlineDate,
      userId: userId,
    };

    try {
      const response = await axios.post(`${API_URL}/createGoal`, goalData);
      console.log("RESPONSE", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePaymentSuccess = (token) => {
    // Perform actions after successful payment
    console.log("Payment successful!");
    console.log(token);
  };

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
            <Slide1
              poundsToLose={poundsToLose}
              setPoundsToLose={setPoundsToLose}
            />
          </div>

          <div className={style.slide}>
            <Slide2
              deadlineDate={deadlineDate}
              setDeadlineDate={setDeadlineDate}
              poundsToLose={poundsToLose}
              createGoal={createGoal}
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
              setStripeTotal={setStripeTotal}
              giftCardValue={giftCardValue}
              setGiftCardValue={setGiftCardValue}
            />
          </div>

          <div className={style.slide}>
            <Slide5
              stripeTotal={stripeTotal}
              user={user}
              poundsToLose={poundsToLose}
              validatorEmail={validatorEmail}
              amount={giftCardValue}
              deadlineDate={deadlineDate}
              giftCardValue={giftCardValue}
              currency="USD"
              publishableKey="YOUR_PUBLISHABLE_KEY"
              onPaymentSuccess={handlePaymentSuccess}
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
