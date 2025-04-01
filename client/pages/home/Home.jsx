import { Link } from "react-router-dom";
import "./home.css"


const Home = () => {
  return (
    <div className="home">
      <h1>Welcome back, [[--]]</h1>
      <div className="file-box">
        <table>
          <tr>
            <th>File name</th>
            <th>Private</th>
            <th>Expiration date</th>
            <th>Size</th>
          </tr>
          <tr>
            <td>File 1</td>
            <td className="td-center">Yes</td>
            <td className="td-center">Oct. 20, 2025</td>
            <td className="td-center">2.5MB</td>
          </tr>
          <tr>
            <td>file2</td>
            <td className="td-center">No</td>
            <td className="td-center">Oct. 20, 2025</td>
            <td className="td-center">2.5MB</td>
          </tr>
        </ table>
      </div>
    </div>
  );
};

export default Home
