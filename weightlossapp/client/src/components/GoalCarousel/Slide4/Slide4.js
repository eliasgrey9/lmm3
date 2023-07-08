import React from "react";
import style from "./slide4.module.css";

const Slide4 = ({ giftCardValue, setGiftCardValue }) => {
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
          onClick={() => {
            setGiftCardValue(25);
          }}
          className={`${style.card} ${
            giftCardValue === 25 ? style.selected : ""
          }`}
        >
          $25
        </div>
        <div
          onClick={() => {
            setGiftCardValue(50);
          }}
          className={`${style.card} ${
            giftCardValue === 50 ? style.selected : ""
          }`}
        >
          $50
        </div>
        <div
          onClick={() => {
            setGiftCardValue(100);
          }}
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
