import { Link } from "react-router-dom";
import "./landing.css"


const Landing = () => {
  return (
    <div className="landing">
      <div className="landing-left">
        <a href="/" className="uploadButton">Upload</a>
      </div>
      <div className="landing-right">
        <p>Hello</p>
      </div>
    </div>
  );
};

export default Landing
