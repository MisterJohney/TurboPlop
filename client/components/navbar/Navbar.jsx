import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
//import { DarkModeContext } from "../../context/darkModeContext";
//import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="left">
        <a href="/" className="logo">TurboPlop</a>
      </div>
      <div className="right">
        <a href="/about" className="aboutLink">About</a>
        <a href="/signin" className="signInLink">Sign in</a>
        <a href="/signup" className="signUpLink">Sign up</a>
      </div>
    </div>
  );
};

export default Navbar;
