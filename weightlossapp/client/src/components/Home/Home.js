import React, { useState, useEffect } from "react";
import style from "./home.module.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [userSignedIn, setUserSignedIn] = useState(false);

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
    };

    checkUser();
  }, [userId, navigate]);

  return (
    <>
      <Navbar userSignedIn={userSignedIn} setUserSignedIn={setUserSignedIn} />
      <div className={style.body}>Home</div>;
    </>
  );
};

export default Home;
