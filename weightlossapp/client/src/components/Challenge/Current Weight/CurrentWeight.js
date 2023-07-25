import React from "react";
import style from "./currentWeight.module.css";

const CurrentWeight = () => {
  return (
    <div className={style.container}>
      <div className={style.containerTitle}>CURRENT WEIGHT</div>
      <div className={style.weight}>154 lbs</div>
      <div className={style.inputContainer}>
        <input placeholder="Enter new weight" className={style.input}></input>
      </div>
      <div className={style.buttonContainer}>
        <button className={style.updateBtn}>Update Weight</button>
      </div>
    </div>
  );
};

export default CurrentWeight;
