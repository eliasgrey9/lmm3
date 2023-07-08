import React, { useState } from "react";
import style from "./slide1.module.css";

const Slide1 = () => {
  const [value, setValue] = useState(50);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <div className={style.sliderContainer}>
        <div className={style.pledgeText}>
          I pledge to lose <span className={style.value}>{value}</span> pounds
        </div>

        <input
          type="range"
          min="5"
          max="100"
          value={value}
          className={style.slider}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default Slide1;
