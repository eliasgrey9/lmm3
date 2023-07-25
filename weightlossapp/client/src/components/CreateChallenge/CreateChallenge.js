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

  const [weightToLose, setWeightToLose] = useState(0);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState("lbs");
  const [prizeDescription, setPrizeDescription] = useState(
    "one month gym membership."
  );
  const [title, setTitle] = useState("");

  const [challengeReview, setChallengeReview] = useState(
    `Be the first to lose ${weightToLose} ${selectedUnit}, each loser will gift the winner ${prizeDescription}`
  );

  const navLinks = [
    { to: `/home/${userId}`, label: "Home" },
    { to: `/challenges/${userId}`, label: "Challenges" },
  ];

  useEffect(() => {
    const updatedChallengeReview = `Be the first to lose ${weightToLose} ${selectedUnit}, each loser will gift the winner ${prizeDescription}`;
    setChallengeReview(updatedChallengeReview);
  }, [weightToLose, selectedUnit, prizeDescription]);

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

  const handleUnitChange = (unit) => {
    setSelectedUnit(unit);
  };

  const createNewChallenge = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/challenge/create-challenge`,
        {
          title: title,
          weightToLose: weightToLose,
          creatorId: userId,
          units: selectedUnit,
          currentWeight: currentWeight,
          status: "Active",
          prizeDescription: prizeDescription,
        }
      );

      console.log(response.data);
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("Error creating challenge:", error);
    }
  };

  return (
    <>
      <Navbar
        userSignedIn={userSignedIn}
        setUserSignedIn={setUserSignedIn}
        navLinks={navLinks}
      />
      <div className={style.body}>
        <div className={style.form}>
          <form>
            <div className={style.heading}>Create new challenge</div>
            <div className={style.topInputs}>
              <div className={style.titleAndInput}>
                <label>Title</label>
                <input
                  className={style.titleInput}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                ></input>
              </div>
              <div className={style.loseInputAndDropdown}>
                <label>Lose</label>
                <div className={style.inputAndUnit}>
                  <input
                    className={style.weightInput}
                    onChange={(e) => {
                      setWeightToLose(e.target.value);
                    }}
                  ></input>
                  <select
                    id="unitSelect"
                    value={selectedUnit}
                    onChange={(e) => handleUnitChange(e.target.value)}
                  >
                    <option value="lbs">lbs</option>
                    <option value="kg">kg</option>
                  </select>
                </div>
              </div>
              <div>
                <label>How much do you currently weigh?</label>
                <input
                  onChange={(e) => {
                    setCurrentWeight(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <div className={style.descriptionSection}>
              <div className={style.descriptionLabelAndInput}>
                <label>What does the winner get from each loser?</label>
                <textarea
                  value={prizeDescription}
                  onChange={(e) => {
                    setPrizeDescription(e.target.value);
                  }}
                  className={style.description}
                ></textarea>
              </div>
            </div>
          </form>
        </div>
        <div className={style.reviewSection}>
          <div className={style.heading}>Review your challenge</div>
          <div className={style.heading}>{title}</div>
          <div className={style.challengeReview}>{challengeReview}</div>
          <div className={style.buttonArea}>
            <button onClick={createNewChallenge}>Start Challenge</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateChallenge;
