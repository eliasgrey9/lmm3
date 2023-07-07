import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import style from "./signUp.module.css";

const API_URL = process.env.REACT_APP_API_URL;

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const createUser = { username: username, email: email, password: password };

    try {
      const response = await axios.post(
        `${API_URL}/api/users/signUp`,
        createUser
      );

      if (response) {
        // Store the authentication token in localStorage
        localStorage.setItem("authToken", response.data.token);

        window.location.href = `/home/${response.data.userId}`;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={style.body}>
      <div className={style.logo}>Sign Up</div>
      <div className={style.subHeading}>Weight Loss App</div>

      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.textInputFields}>
          <div className={style.inputAndLabel}>
            <label className={style.label}>Email</label>
            <input
              className={style.input}
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            ></input>
          </div>

          <div className={style.inputAndLabel}>
            <label className={style.label}>Enter your full name</label>
            <input
              className={style.input}
              type="text"
              placeholder="Jane Smith"
              value={username}
              onChange={(event) => setUserName(event.target.value)}
            ></input>
          </div>

          <div className={style.inputAndLabel}>
            <label className={style.label}>Password</label>
            <input
              className={style.input}
              type="password"
              placeholder="Minimum 8 characters long"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            ></input>
          </div>
        </div>

        <input
          className={style.submitBtn}
          type="submit"
          value={isSubmitting ? "Submitting..." : "Continue"}
          disabled={isSubmitting}
        ></input>
        <div className={style.alreadyHaveAnAccount}>
          <div>Already have an account?</div>
          <div>
            <Link className={style.signIn} to={"/signIn"}>
              Sign In
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
