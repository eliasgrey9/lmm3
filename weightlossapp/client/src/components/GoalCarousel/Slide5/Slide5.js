import React from "react";
import style from "./slide5.module.css";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const Slide5 = ({
  weightGoal,
  validatorEmail,
  deadlineDate,
  user,
  giftCardValue,
}) => {
  const goalData = {
    weightGoal: weightGoal,
    validatorEmail: validatorEmail,
    deadline: deadlineDate,
    userId: user.id,
    goalReached: false,
  };

  const createCheckoutSession = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/stripe/create-checkout-session/${giftCardValue}`,
        goalData
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
        weigh <span className={style.purpleColor}>{weightGoal} pounds</span>{" "}
        before the end of{" "}
        <span className={style.purpleColor}>
          {deadlineDate.toLocaleDateString()}
        </span>{" "}
        or else <span className={style.purpleColor}>{validatorEmail}</span> will
        receive a prepaid digital{" "}
        <span className={style.purpleColor}>
          ${giftCardValue} Amazon gift card
        </span>{" "}
        paid for by me.
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
