import React from "react";
import style from "./slide4.module.css";

const Slide4 = ({ giftCardValue, setGiftCardValue, setStripeTotal }) => {
  const twentyFiveDollarGiftCard = () => {
    setGiftCardValue(25);
    setStripeTotal(30);
  };

  const fiftyDollarGiftCard = () => {
    setGiftCardValue(50);
    setStripeTotal(55);
  };

  const OneHundredDollarGiftCard = () => {
    setGiftCardValue(100);
    setStripeTotal(105);
  };

  return (
    <div className={style.container}>
      <div className={style.heading}>
        ...a prepaid digital
        <span className={style.giftCardValue}>
          {" "}
          ${giftCardValue} Amazon gift card.{" "}
        </span>
      </div>

      <div className={style.giftCardRow}>
        <div
          onClick={twentyFiveDollarGiftCard}
          className={`${style.card} ${
            giftCardValue === 25 ? style.selected : ""
          }`}
        >
          $25
        </div>
        <div
          onClick={fiftyDollarGiftCard}
          className={`${style.card} ${
            giftCardValue === 50 ? style.selected : ""
          }`}
        >
          $50
        </div>
        <div
          onClick={OneHundredDollarGiftCard}
          className={`${style.card} ${
            giftCardValue === 100 ? style.selected : ""
          }`}
        >
          $100
        </div>
      </div>
    </div>
  );
};

export default Slide4;
