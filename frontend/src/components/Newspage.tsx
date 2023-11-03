import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../common/Dropdown";
import { IDropdown } from "../interface/user";
import VNavbar from "./VNavbar";

const Newspage = () => {
  const [selectedState, setSelectedState] = useState<IDropdown | null>(null);
  return (
    <>

      <div className="flex bg-keppel-400">
        <VNavbar />

        <div className="w-screen justify-center ">
          <div className="bg-white flex justify-between mx-auto ml-5 mr-5 mt-5   h-40 rounded shadow-md ">
            <div>
              <h1 className="font-semibold p-4 text-2xl">Health News</h1>

              <p className="font-normal pl-4 text-xl">Get latest health related news in your particular region.</p>

            </div>
            <img className="p-4 pr-10" src="./news.png" alt="" />
          </div>
          <div className=" bg-white  w-3/4 mx-auto mt-10 h-72 p-10 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <Dropdown title={"News"} setVal={setSelectedState} />
            <Link to={`/news/${selectedState?.label}`}>
              <button className="bg-sea-green-500 text-white p-2 font-semibold rounded-full mt-3">
                View News
              </button>
            </Link>
          </div>
        </div>
      </div> </>
  );
};

export default Newspage;
