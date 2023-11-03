import React, { useState } from "react";
import { indianStates } from "../common/constants";
import { Link } from "react-router-dom";
import Select from "react-select";

interface State {
  label: string;
  value: string;
}
const Home = () => {
  const [selectedState, setSelectedState] = useState<State | null>(null);

  const stateOptions: State[] = indianStates.map((state) => ({
    label: state,
    value: state,
  }));

  const handleStateChange = (selectedOption: State | null) => {
    setSelectedState(selectedOption);
  };
  return (
    <div className="masd w-screen flex items-center justify-between">
      <div className="w-48 h-screen bg-sea-green-300"></div>
      <div className="w-2/3 flex bg-white m-12 mt-0 h-[45rem] shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl">
        <div className="bg-sea-green-500 rounded-tl-xl rounded-bl-xl w-1/4">
          <h1 className="text-white text-4xl font-bold text-center mt-4">Services</h1>
          <img className="h-32 ml-auto mr-auto mt-10 bg-white rounded-full p-4 shadow-lg" src="./protocols.png" alt="" />
          <img className="h-32 ml-auto mr-auto mt-16 bg-white rounded-full p-4 shadow-lg" src="./news.png" alt="" />
          <img className="h-32 ml-auto mr-auto mt-16 bg-white rounded-full p-4 shadow-lg" src="./food.png" alt="" />
        </div>
        <div className="w-full ">
          <div className="hdata bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md ml-5 mt-20 mr-5 h-40 pl-4">
            <Link to="/health-data">
              <h1 className="font-bold pt-2 text-2xl text-gray-600">Personal Health Records</h1>
              <p className="font-semibold mt-2">Provide us with your health history so we can improve the personalized insights for you..</p>
              <button className="bg-sea-green-500 text-white p-2 font-semibold rounded-lg shadow-lg mt-6  mb-0">
                Enter Data
              </button>
            </Link>
          </div>
          <div className="hdata bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md ml-5 mt-10 mr-5 h-40 pl-4">
            <Link to="/newspage">
              <h1 className="font-bold pt-2 mt-2 text-2xl text-gray-600">Latest News</h1>
              <p className="font-semibold mt-2">Get latest and up-to-date health news in your particular state  ..</p>
              <button className="bg-sea-green-500 text-white p-2 font-semibold rounded-lg shadow-lg mt-6  mb-0">
                Search Now
              </button>
            </Link>
          </div>
          <div className="hdata bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md ml-5 mt-10 mr-5 h-40 pl-4">
            <Link to="/food">
              <h1 className="font-bold pt-2 mt-2 text-2xl text-gray-600">Cuisine</h1>
              <p className="font-semibold mt-2">Get additional information on the dishes and cusines of particular states  ..</p>
              <button className="bg-sea-green-500 text-white p-2 font-semibold rounded-lg shadow-lg mt-6  mb-0">
                Search Now
              </button>
            </Link>
          </div>
          
        </div>
      </div>
      <div className="w-48 h-screen bg-sea-green-300"></div>
    </div>
  );
};

export default Home;
