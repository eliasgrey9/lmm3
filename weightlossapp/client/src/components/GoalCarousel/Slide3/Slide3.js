import React from "react";
import style from "./slide3.module.css";

const Slide3 = ({ validatorEmail, setValidatorEmail }) => {
  const handleChange = (event) => {
    setValidatorEmail(event.target.value);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.heading}>
          ...
          <span className={style.validatorEmail}> {validatorEmail}</span> will
          recieve...
        </div>

        <input
          type="text"
          className={style.input}
          onChange={handleChange}
          placeholder={validatorEmail}
        />
      </div>
    </>
  );
};

export default Slide3;
