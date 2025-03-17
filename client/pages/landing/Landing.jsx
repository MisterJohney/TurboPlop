import { Link } from "react-router-dom";
import "./landing.css"


const Landing = () => {
  return (
    <div className="landing">
      <div className="landing-left">

        <form action="http://localhost:5000/api/upload" method="post" encType="multipart/form-data">
            <input type="file" name="upload-files" multiple />
            <input type="submit" className="uploadButton" value="Upload" />
        </form>
        
      </div>
      <div className="landing-right">
        <h1>Blazingly fast way to upload your files</h1>
      </div>
    </div>
  );
};

export default Landing
