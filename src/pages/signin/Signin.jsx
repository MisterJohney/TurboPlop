import { Link } from "react-router-dom";
import "./signin.css"


const Signin = () => {
  return (
    <div className="signin">
      <div className="signin-box">
        <h1>Sign in to TurboPlop</h1>
        <label for="username">Username</label>
        <input type="text" className="signin-input" id="username" name="username" />
        <label for="password">Password</label>
        <input type="password" className="signin-input" id="password" name="password" />
        <input type="submit" className="signinbutton" value="Sign in" />
      </div>
    </div>
  );
};

export default Signin
