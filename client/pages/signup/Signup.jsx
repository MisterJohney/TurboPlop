import { Link } from "react-router-dom";
import "./signup.css"


const Signup = () => {
  return (
    <div className="signup">
      <div className="signup-box">
        <div className="signup-left">
          <label for="username">Username</label>
          <input type="text" className="signup-input" id="username" name="username" />
          <label for="email">email</label>
          <input type="text" className="signup-input" id="email" name="email" />
          <label for="password">Password</label>
          <input type="password" className="signup-input" id="password" name="password" />
          <label for="retype-password">Retype Password</label>
          <input type="password" className="signup-input" id="retype-password" name="retype-password" />
          <input type="submit" className="signupbutton" value="Sign up" />
        </div>
        <div className="signup-right">
          <h1>TurboPlop</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint  occaecat cupidatat non proident, sunt in culpa qui officia deserunt  mollit anim id est laborum.</p>
        </div>
      </div>
    </div>
  );
};

export default Signup
