import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      hello this is home
      <Link to="/health-data">
        <button className="bg-black text-white p-4 rounded-lg">Enter Health Data</button>
      </Link>
    </div>
  );
}

export default Home;
