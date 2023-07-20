import React from "react";
import style from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ userSignedIn, setUserSignedIn, navLinks }) => {
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
      <div className={style.logo}>Crunch Time</div>
      <div className={style.rightSideLinks}>
        {userSignedIn ? (
          <>
            {navLinks.map((link) => (
              <div key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </div>
            ))}
            <div onClick={signOut}>Sign Out</div>
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
