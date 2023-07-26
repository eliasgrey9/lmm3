import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import style from "./challenges.module.css";
import Navbar from "../Navbar/Navbar";

const Challenges = () => {
  const [userSignedIn, setUserSignedIn] = useState(false);
  const [allUserChallenges, setAllUserChallenges] = useState([]);
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

  useEffect(() => {
    const fetchChallengesByUser = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/challenge/find-active-challenges-by-user/${userId}`
        );

        setAllUserChallenges(response.data.challengesByUser);

        // Handle the response data as needed, e.g., store it in a state variable
      } catch (error) {
        console.error("Error fetching challenges by user:", error);
        // Handle any errors that occurred during the API request
      }
    };

    fetchChallengesByUser();
  }, [userId]);

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
          {allUserChallenges.map((userChallenge) => (
            <Link
              className={style.challengeBox}
              to={`/challenge/${userId}/${userChallenge.id}`}
            >
              <div>{userChallenge.title}</div>
              <div>({userChallenge.status})</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Challenges;
