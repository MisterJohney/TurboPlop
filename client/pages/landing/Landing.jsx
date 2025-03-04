import { Link } from "react-router-dom";
import "./landing.css"


const Landing = () => {
  return (
    <div className="landing">
      <div className="landing-left">
        <a href="/" className="uploadButton">Upload</a>
      </div>
      <div className="landing-right">
        <h1>Blazingly fast way to upload your files</h1>
      </div>
    </div>
  );
};

export default Landing
