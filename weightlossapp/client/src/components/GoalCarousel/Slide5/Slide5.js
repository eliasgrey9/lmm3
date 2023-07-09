import React from "react";
import style from "./slide5.module.css";
import StripeCheckout from "react-stripe-checkout";

const Slide5 = ({
  amount,
  currency,
  publishableKey,
  poundsToLose,
  validatorEmail,
  onPaymentSuccess,
  deadlineDate,
  user,
  stripeTotal,
}) => {
  const handleToken = (token) => {
    // Send the token to your server for further processing
    // You can make an API request to your server to process the payment
    console.log(token);
    // You can call the `onPaymentSuccess` callback here if the payment was successful
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
        Prepay now, on {deadlineDate.toLocaleDateString()} we'll ask{" "}
        {validatorEmail} if you lost {poundsToLose} pounds. If so, you will
        recieve the gift card code if you made weight. If not we will share this
        code with {validatorEmail}.
      </div>
      <StripeCheckout
        amount={stripeTotal * 100} // The payment amount in cents
        currency={currency} // The currency code (e.g., "USD")
        token={handleToken} // Callback function to handle the token after payment
        stripeKey={publishableKey} // Your Stripe publishable key
        style={{ display: "none" }} // Hide the default button
        // stripeClassName={style.stripeButton} // Apply custom class to the container
      >
        <div className={style.notice}>
          We charge a $5.00 flat transaction fee for the total amount due.{" "}
        </div>
        <button className={style.stripeBtn}>Pay ${stripeTotal}</button>
      </StripeCheckout>
    </div>
  );
};

export default Slide5;
