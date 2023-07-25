import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import style from "./challenge.module.css";
import CurrentWeight from "./Current Weight/CurrentWeight";
import ChallengeDescription from "./ChallengeDescription/ChallengeDescription";
import Progress from "./Progress/Progress";
import Participants from "./Participants/Participants";
import Notifications from "./Notifications/Notifications";
import Credits from "./Credits/Credits";

const Challenge = () => {
  const [userSignedIn, setUserSignedIn] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;
  const { userId } = useParams(0);
  const navigate = useNavigate();

  const navLinks = [
    { to: `/credits/${userId}`, label: "Credits" },
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
        userSignedIn={userSignedIn}
        setUserSignedIn={setUserSignedIn}
        navLinks={navLinks}
      />
      <div className={style.body}>
        <div className={style.leftSide}>
          <div className={style.currentWeightAndChallengeContainer}>
            <div className={style.currentWeight}>
              <CurrentWeight />
            </div>
            <div className={style.challengeDescription}>
              <ChallengeDescription />
            </div>
          </div>
          <div className={style.progressAndParticpantsSection}>
            <div className={style.progressSection}>
              <Progress />
            </div>
            <div className={style.participantsSection}>
              <Participants userId={userId} />
            </div>
          </div>
        </div>
        <div className={style.rightSide}>
          <div className={style.credits}>
            <Credits />
          </div>
          <div className={style.notifications}>
            <Notifications />
          </div>
        </div>
      </div>
    </>
  );
};

export default Challenge;
