import React, { useState } from "react";
import style from "./slide1.module.css";

const Slide1 = ({ poundsToLose, setPoundsToLose }) => {
  const handleChange = (event) => {
    setPoundsToLose(event.target.value);
  };

  return (
    <>
      <div className={style.sliderContainer}>
        <div className={style.heading}>
          I pledge to weigh <span className={style.value}>{poundsToLose} </span>
          pounds before...
        </div>

        <input
          type="range"
          min="100"
          max="600"
          value={poundsToLose}
          className={style.slider}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default Slide1;
