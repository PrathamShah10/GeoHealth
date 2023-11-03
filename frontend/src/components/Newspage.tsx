import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../common/Dropdown";
import { IDropdown } from "../interface/user";

const Newspage = () => {
  const [selectedState, setSelectedState] = useState<IDropdown | null>(null);
  return (
    <>
      <div className="w-screen flex justify-center ">
        <div className="w-3/4 mt-20 p-10 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <Dropdown title={"News"} setVal={setSelectedState} />
          <Link to={`/news/${selectedState?.label}`}>
            <button className="bg-sea-green-500 text-white p-2 font-semibold rounded-full mt-3">
              View News
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Newspage;
