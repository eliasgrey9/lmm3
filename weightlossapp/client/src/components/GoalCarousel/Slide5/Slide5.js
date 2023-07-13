import React from "react";
import style from "./slide5.module.css";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const Slide5 = ({
  amount,
  poundsToLose,
  validatorEmail,
  deadlineDate,
  user,
}) => {
  const createCheckoutSession = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/stripe/create-checkout-session/${amount}/${user.id}`
      );
      if (response) {
        window.location.href = response.data;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.goalText}>
        <div className={style.heading}>Your goal is ready!</div>I pledge to
        weigh <span className={style.purpleColor}>{poundsToLose} pounds</span>{" "}
        before the end of{" "}
        <span className={style.purpleColor}>
          {deadlineDate.toLocaleDateString()}
        </span>{" "}
        or else <span className={style.purpleColor}>{validatorEmail}</span> will
        receive a prepaid digital{" "}
        <span className={style.purpleColor}>${amount} Amazon gift card</span> .
        <div>-{user.username}</div>
      </div>
      <div className={style.checkoutText}>
        <div className={style.howItWorksHeading}>How it works</div>
        <div className={style.howItWorks}>
          Buy the gift card now to set the goal. In your profile, we will ask if
          you met your goal. Choosing "Yes" will grant you the gift card code.
          If you answer "No," the code will be shared with {validatorEmail}.
        </div>
      </div>
      {validatorEmail.length ? (
        <button onClick={createCheckoutSession} className={style.stripeBtn}>
          Set Goal
        </button>
      ) : (
        <>
          <button
            onClick={createCheckoutSession}
            disabled={true}
            className={style.disabledStripeBtn}
          >
            Oops!
          </button>
          <div className={style.invalidEmailMessage}>
            You entered an invalid email on the previous slide
          </div>
        </>
      )}
    </div>
  );
};

export default Slide5;
