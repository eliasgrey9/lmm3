import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home/Home";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Credits from "./Credits/Credits";
import Challenges from "./Challenges/Challenges";
import CreateChallenge from "./CreateChallenge/CreateChallenge";
import Challenge from "./Challenge/Challenge";

const Main = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/home/guest" element={<Home />}></Route>
        <Route path="/home/:userId" element={<Home />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/credits/:userId" element={<Credits />}></Route>
        <Route path="/challenges/:userId" element={<Challenges />}></Route>
        <Route path="/challenge/:userId" element={<Challenge />}></Route>
        <Route
          path="/createChallenge/:userId"
          element={<CreateChallenge />}
        ></Route>

        <Route path="/*" element={<Navigate to="/home/guest" />} />
      </Routes>
    </div>
  );
};

export default Main;
