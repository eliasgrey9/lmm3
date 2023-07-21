import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import style from "./challenges.module.css";
import Navbar from "../Navbar/Navbar";

const Challenges = () => {
  const [userSignedIn, setUserSignedIn] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;
  const { userId } = useParams();
  const navigate = useNavigate();

  const navLinks = [
    { to: `/home/${userId}`, label: "Home" },
    { to: `/credits/${userId}`, label: "Credits" },
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

          console.log("response", response);
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
        <div className={style.heading}>Challenges</div>
        <div className={style.challengeBoxes}>
          <Link
            className={style.createChallengeBox}
            to={`/createChallenge/${userId}`}
          >
            <div>New Challenge +</div>
          </Link>
          <div className={style.challengeBox}>Current Challenge</div>
        </div>
      </div>
    </>
  );
};

export default Challenges;
