import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./createChallenge.module.css";
import Navbar from "../Navbar/Navbar";

const CreateChallenge = () => {
  const [userSignedIn, setUserSignedIn] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;
  const { userId } = useParams();
  const navigate = useNavigate();

  const [weight, setWeight] = useState(0);
  const [units, setUnits] = useState("");
  const [prizeDescription, setPrizeDescription] = useState(
    "one monnth gym membership."
  );
  const [title, setTitle] = useState("");

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
        <form className={style.form}>
          <div className={style.heading}>Create new challenge</div>
          <div className={style.topInputs}>
            <div className={style.titleAndInput}>
              <label>Title</label>
              <input
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></input>
            </div>
            <div className={style.loseAndInput}>
              <label>Lose</label>
              <input
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
              ></input>
            </div>
          </div>
          <div className={style.descriptionSection}>
            <div className={style.descriptionLabelAndInput}>
              <label>What does the winner get from each loser?</label>
              <textarea
                onChange={(e) => {
                  setPrizeDescription(e.target.value);
                }}
                className={style.description}
              ></textarea>
            </div>
          </div>
          <div className={style.reviewSection}>
            <div className={style.heading}>Review your challenge</div>
            <div className={style.heading}>{title}</div>
            <div className={style.challengeReview}>
              Be the first to lose {weight} {units}lbs, each loser will gift the
              winner {prizeDescription}
            </div>
          </div>
          <div className={style.buttonArea}>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateChallenge;
