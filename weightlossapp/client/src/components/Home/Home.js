import React, { useState, useEffect } from "react";
import style from "./home.module.css";
import Navbar from "../Navbar/Navbar";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [userSignedIn, setUserSignedIn] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;
  const { userId } = useParams();
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
        <div className={style.hero}>
          <div className={style.heroLeftBlock}>
            <div>Lose weight with friends</div>
            <div>
              <Link to={`/challenges/${userId}`}>
                <button>Start now!</button>
              </Link>
            </div>
          </div>
          <div className={style.heroRightBlock}>Example Image</div>
        </div>
        <div className={style.mainContent}>
          <div className={style.heading}>Challenge. Sabotage. Lose Weight.</div>
          <div className={style.subHeadingAndParagraph}>
            <div className={style.subHeading}>🏆 Create Your Challenge</div>
            <div className={style.paragraph}>
              The power is in your hands! Dream up a challenge that pushes the
              boundaries of fun and excitement. Invite up to 4 friends, family
              members, or colleagues to join you on this epic adventure.
            </div>
          </div>
          <div className={style.subHeadingAndParagraph}>
            <div className={style.subHeading}>🚀 Race to the Finish</div>
            <div className={style.paragraph}>
              As the challenge kicks off, you'll be pitted against your fellow
              participants in a nail-biting weight race. Stay determined,
              focused, and agile to outpace your competitors. But remember, it's
              not just about speed; it's about strategy too!
            </div>
          </div>
          <div className={style.subHeadingAndParagraph}>
            <div className={style.subHeading}>🧨 Sabotage and Surpass</div>
            <div className={style.paragraph}>
              Watch out! In this fierce competition, you can use cunning tactics
              to sabotage other players and gain an edge. Outwit, outmaneuver,
              and outlast your rivals to rise to the top of the leaderboard.
            </div>
          </div>
          <div className={style.subHeadingAndParagraph}>
            <div className={style.subHeading}>🎁 Victors Reap the Rewards</div>
            <div className={style.paragraph}>
              The power is in your hands! Dream up a challenge that pushes the
              boundaries of fun and excitement. Invite up to 4 friends, family
              members, or colleagues to join you on this epic adventure.
            </div>
          </div>
          <div className={style.createChallengeBtn}>
            <Link to={`/challenges/${userId}`}>
              <button>Create challenge</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
