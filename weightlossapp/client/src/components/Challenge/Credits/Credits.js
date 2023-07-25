import React from "react";
import style from "./credits.module.css";

const Credits = () => {
  return (
    <div className={style.container}>
      <div className={style.creditsTitle}>CREDITS</div>
      <div className={style.creditsHeading}>Current Balance: 0</div>
      <div className={style.descriptionContainer}>
        <div className={style.creditsDescription}>
          Use credits to sabotage your opponents, avoid getting sabotaged with a
          shield!
        </div>
        <button className={style.getCreditsBtn}>Get Credits</button>
      </div>
    </div>
  );
};

export default Credits;
