import React, { useState } from "react";
import style from "./slide3.module.css";
const validator = require("validator");

const Slide3 = ({ validatorEmail, setValidatorEmail }) => {
  const [emailInput, setEmailInput] = useState("");

  const checkEmail = () => {
    const email = emailInput;
    const isValidEmail = validator.isEmail(email);

    if (isValidEmail) {
      setValidatorEmail(email);
    } else {
      setValidatorEmail("");
    }
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.heading}>
          ...
          <span className={style.validatorEmail}> {validatorEmail}</span> will
          receive...
        </div>
        <div className={style.inputAndBtn}>
          <div className={style.inputAndInvalidEmail}>
            <input
              type="email"
              className={style.input}
              placeholder="Enter a valid email to continue"
              onChange={(e) => setEmailInput(e.target.value)}
            />
          </div>
          <button className={style.verifyBtn} onClick={checkEmail}>
            Verify Email
          </button>
        </div>
        {!validatorEmail.length ? (
          <div className={style.invalidEmail}>*Please enter a valid email*</div>
        ) : (
          <div className={style.validEmail}>You email is valid!</div>
        )}
      </div>
    </>
  );
};

export default Slide3;
