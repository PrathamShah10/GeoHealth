import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landpage w-screen h-screen font-custom text-xl font-semibold  ">
      <div className="navb bg-white p-6 w-screen h-20 shadow-sm flex justify-between">
        <img className="logo h-10 ml-4" src="./logos.png" alt="" />
        <div className="links flex w-1/2 justify-evenly text-sea-green-600" >
          <button className="Home px-10 hover:shadow-md py-0 rounded-full text-sea-green-600 hover:text-white hover:bg-gradient-to-r from-sea-green-600 to-olive-700 ..." >
            <Link to="/">
              Home
            </Link>
          </button>
          <button className="SignIn px-10 hover:shadow-md py-0 rounded-full    hover:text-white hover:bg-gradient-to-r from-sea-green-600 to-olive-700 ... ">
            <Link to="/signin">
              SignIn
            </Link></button>
          <button className="About px-10 hover:shadow-md py-0 rounded-full text-sea-green-600 hover:text-white hover:bg-gradient-to-r from-sea-green-600 to-olive-700 ...">About</button>
        </div>
      </div>
      <div className="landpagecont flex">
        <div className="cont-left w-1/2">
          <div className="group">
            <img className="logo3 h-40 mt-24 ml-24" src="./logo3.png" alt="" />
            <div className="extrainfo ml-32 text-4xl text-gray-600">
              <p >Personalized</p>
              <p >location based </p>
              <p >Insights</p>
            </div>
            <img className="transition-colors duration-300 ease-in-out group-hover:width-full h-7 ml-32 mt-10" src="./line.png" alt="" />
            <button className="group-hover:text-2xl text-xl mt-10 ml-32 w-48  shadow-lg text-white p-4 rounded-full bg-gradient-to-r from-sea-green-600 to-olive-700 ...">
            <Link to="/signin">
              Join Now
            </Link>
            </button>
          </div>
        </div>
        <div className="cont-right w-1/2 flex">
          <div className="images w-2/3">
          <div>
              <img className="h-96" src="./food.png" alt="" />
            </div>
           
            <div className="note flex">
              
              <img className="imgc -mt-20 ml-auto h-72 -mr-32 shadow-lg relative z-10 rounded-full" src="./cartoon.jpg " alt="" />
            </div>
            <div>
              <img className="h-72 -mt-20"  src="./protocols.png" alt="" />
            </div>
           
          </div>
          <div className="sidebar ml-auto mr-0 w-1/3 h-screen bg-gradient-to-r from-olive-600 to-sea-green-600 ..."></div>

        </div>
      </div>
    </div>
  );
}

export default Landing;
