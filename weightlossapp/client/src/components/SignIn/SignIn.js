import React, { useState } from "react";
import style from "./signIn.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const signInUser = { email: email, password: password };

    try {
      const response = await axios.post(
        `${API_URL}/api/users/signIn`,
        signInUser
      );

      if (response.status === 200) {
        // Stores the authentication token in localStorage
        localStorage.setItem("authToken", response.data.token);
        window.location.href = `/home/${response.data.userId}`;
      } else if (response.status === 401) {
        setWrongCredentials(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setWrongCredentials(true);
      } else {
        console.error(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={style.body}>
      <div className={style.logo}>Sign In</div>
      <div className={style.subHeading}>Weight Loss App</div>

      <form className={style.form} onSubmit={handleSubmit}>
        {wrongCredentials ? (
          <div className={style.wrongCredentialsMessage}>
            *Invalid email or password*
          </div>
        ) : null}
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

        <div className={style.textInputFields}>
          <div className={style.inputAndLabel}>
            <label className={style.label}>Password</label>
            <input
              className={style.input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            ></input>
          </div>
        </div>

        <input
          className={style.submitBtn}
          type="submit"
          value={isSubmitting ? "Signing In..." : "Sign In"}
          disabled={isSubmitting}
        ></input>

        <div className={style.needAnAccount}>
          <div>
            <Link className={style.signUp} to={"/signUp"}>
              Sign Up
            </Link>
          </div>
          <div>
            <Link className={style.signUp} to={"/home/guest"}>
              Go back
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
