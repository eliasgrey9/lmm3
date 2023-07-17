import React, { useState, useEffect } from "react";
import style from "./home.module.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Hero from "../Hero/Hero";
import GoalCarousel from "../GoalCarousel/GoalCarousel";
import { FaFlagCheckered } from "react-icons/fa";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const Home = () => {
  const [userSignedIn, setUserSignedIn] = useState(false);
  const [user, setUser] = useState();
  const [doesUserHaveAGoal, setDoesUserHaveAGoal] = useState(false);
  const [userGoal, setUserGoal] = useState("");

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const { userId } = useParams();

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("authToken");
      const options = { headers: { Authorization: `Bearer ${token}` } };

      try {
        const response = await axios.get(
          `${API_URL}/api/users/checkUser/${userId}`,
          options
        );
        if (response) {
          // User is signed in and the ID matches
          setUser(response.data);
          setUserSignedIn(true);
          checkForGoal();
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
    };

    checkUser();
  }, [userId, navigate]);

  const checkForGoal = async () => {
    const response = await axios.get(
      `${API_URL}/api/users/check-for-user-goal/${userId}`
    );

    if (response) {
      setDoesUserHaveAGoal(true);
      setUserGoal(response.data);
    } else {
      setDoesUserHaveAGoal(false);
    }
  };
  console.log(userGoal);
  return (
    <>
      {!doesUserHaveAGoal ? (
        <>
          <Navbar
            userSignedIn={userSignedIn}
            setUserSignedIn={setUserSignedIn}
          />
          <div className={style.body}>
            <Hero />
            <div className={style.getStartedSection}>
              <div>
                <span>Set a Goal </span>
                <FaFlagCheckered />
              </div>
            </div>
            <GoalCarousel
              userId={userId}
              user={user}
              userSignedIn={userSignedIn}
            />
          </div>
        </>
      ) : (
        <>
          <Navbar
            userSignedIn={userSignedIn}
            setUserSignedIn={setUserSignedIn}
            setDoesUserHaveAGoal={setDoesUserHaveAGoal}
          />
          <div className={style.profileContainer}>
            <div className={style.profileHeading}>
              {user.username}, you've got this.
            </div>
            <div className={style.goalAndProgressContainers}>
              <div className={style.goalContainer}>
                <div className={style.goalContainerHeading}>Goal</div>
                <div className={style.goalContainerContent}>
                  I pledge to weigh {userGoal.weightGoal} pounds before{" "}
                  {new Date(userGoal.deadline).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                  , or else I will give {userGoal.validatorEmail} a prepaid
                  digital ${userGoal.giftCardValue} Amazon gift card.
                </div>
                <div className={style.goalContainerShare}>Share</div>
              </div>
            </div>
            <div className={style.decisionBtns}>
              <div className={style.decisionBtnYes}>
                I completed my goal before August 24th 2023
              </div>
              <div className={style.decisionBtnNo}>
                I did not complete my goal in time
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
