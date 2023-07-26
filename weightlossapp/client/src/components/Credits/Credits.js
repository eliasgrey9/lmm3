import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./credits.module.css";
import Navbar from "../Navbar/Navbar";

const Credits = () => {
  const [userSignedIn, setUserSignedIn] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;
  const { userId } = useParams();
  const navigate = useNavigate();
  const navLinks = [
    { to: `/home/${userId}`, label: "Home" },
    { to: `/challenges/${userId}`, label: "Challenges" },
  ];

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("authToken");
      const options = { headers: { Authorization: `Bearer ${token}` } };
      if (userId) {
        try {
          const response = await axios.get(
            `${API_URL}/api/users/checkUser/${userId}`,
            options
          );

          if (response) {
            // User is signed in and the ID matches
            setUserSignedIn(true);
          } else {
            // User is not signed in or the ID doesn't match
            navigate("/home/guest"); // Redirect the user to the guest page
          }
        } catch (error) {
          if (error.response && error.response.status === 401) {
            navigate("/home/guest"); // Redirect the user to the guest page
          } else {
            console.error(error);
          }
        }
      }
    };

    checkUser();
  }, [userId, navigate]);

  return (
    <>
      <Navbar
        navLinks={navLinks}
        userSignedIn={userSignedIn}
        setUserSignedIn={setUserSignedIn}
      />
      <div className={style.body}>
        <div>Buy credits. Sabotage. Defend.</div>
        <div className={style.creditBoxes}>
          <div className={style.threeCreditBox}>
            <div className={style.boxTitle}>3 Credits</div>
            <div className={style.boxPrice}>$4.99</div>
            <div className={style.boxBuyBtn}>
              <button>Buy</button>
            </div>
          </div>
          <div className={style.tenCreditBox}>
            <div className={style.boxTitle}>10 Credits</div>
            <div className={style.boxPrice}>$9.99</div>
            <div className={style.boxBuyBtn}>
              <button>Buy</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Credits;
