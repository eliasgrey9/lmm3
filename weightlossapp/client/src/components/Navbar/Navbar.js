import React from "react";
import style from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ userSignedIn, setUserSignedIn }) => {
  const navigate = useNavigate();

  const signOut = () => {
    // Clear the user token from local storage
    localStorage.removeItem("authToken");
    setUserSignedIn(false);
    // Navigate to the guest page
    navigate("/home/guest");
  };

  return (
    <div className={style.body}>
      <div className={style.logo}>Weight Loss App</div>
      <div className={style.rightSideLinks}>
        {userSignedIn ? (
          <>
            <div onClick={signOut}>Sign Out</div>
            <div>Profile</div>
          </>
        ) : (
          <>
            <Link to="/signIn">
              <div>Sign In</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
