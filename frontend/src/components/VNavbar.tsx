import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { resetUserData } from "../redux/reducer/user";

const VNavbar = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const [showVNavbar, setShowVNavbar] = useState(false);
  const handleShowVNavbar = () => {
    setShowVNavbar(!showVNavbar);
  };
  return (
    <>
      {" "}
      {user && (
        <div className={`mainnavss ${props.showvNavbar && "active"} `}>
          <div className="vnavbarr pt-16 min-w-[18rem] h-screen bg-white shadow-lg ">
            <div className="flex m-3 p-3 rounded shadow-md">
              <img src="./lines2.png" className="liness h-7" alt="" />
              <h1 className="ml-4 text-lg font-medium">GeoHealth</h1>
            </div>

            <NavLink
              to="/newspage"
              className="w-11/12 ml-3 flex hover:pl-2 hover:mr-2 rounded hover:bg-gray-100 mt-1.5 "
            >
              <img className="h-6 m-3" src="./locality.png" alt="" />
              <h1 className="text-base text-gray-700  pt-3 pb-3 tracking-tight font-medium ">
                Local Health
              </h1>
            </NavLink>

            {/* <NavLink to="/health-data" className="w-11/12 ml-3 flex hover:pl-2 hover:mr-2 rounded hover:bg-gray-100 mt-1.5 " >
                    <img className="h-6 m-3" src="./diseases.png" alt="" />
                    <h1 className="text-base text-gray-700  pt-3 pb-3 tracking-tight font-medium ">Disease History</h1>
                </NavLink> */}

            {/* <NavLink to="/food"  className="w-11/12 ml-3 flex hover:bg-gray-100 rounded mt-1.5">
                    <img className="h-6 m-3" src="./restaurant.png" alt="" />
                    <h1 className="pt-3 pb-3  font-medium text-base tracking-tight">Dishes</h1>
                </NavLink> */}

            <NavLink
              to="/community-chat"
              className="w-11/12 ml-3 flex rounded hover:bg-gray-100 mt-1.5"
            >
              <img className="h-6 m-3" src="./chat.png" alt="" />
              <h1 className=" pt-3 pb-3 font-medium text-base tracking-tight">
                Community Chat
              </h1>
            </NavLink>

            <NavLink
              to="/hospital"
              className="w-11/12 ml-3 flex rounded hover:bg-gray-100  mt-1.5 "
            >
              <img className="h-6 m-3" src="./hospital.png" alt="" />
              <h1 className="pl-1 pt-3 pb-3 font-medium text-base tracking-tight">
                Nearby Hospital
              </h1>
            </NavLink>
            <NavLink
              to="/search-volunteer"
              className="w-11/12 ml-3 flex rounded hover:bg-gray-100  mt-1.5 "
            >
              <img className="h-6 m-3" src="./volunteer.png" alt="" />
              <h1 className="pl-1 pt-3 pb-3 font-medium text-base tracking-tight">
                Search Volunteer
              </h1>
            </NavLink>

            <NavLink
              to="/mlmodel"
              className="w-11/12 ml-3 flex rounded hover:bg-gray-100  mt-1.5 "
            >
              <img className="h-6 m-3" src="./nutrition.png" alt="" />
              <h1 className="pl-1 pt-3 pb-3 font-medium text-base tracking-tight">
                Personalized Diet
              </h1>
            </NavLink>

            {/* <NavLink to="/add- file"  className="w-11/12 ml-3 flex rounded hover:bg-gray-100  mt-1.5 ">
                    <img className="h-6 m-3" src="./records.png" alt="" />
                    <h1 className="pl-1 pt-3 pb-3 font-medium text-base tracking-tight">Medical Documents</h1>
                </NavLink> */}

            <NavLink
              to="/get-files"
              className="w-11/12 ml-3 flex rounded hover:bg-gray-100  mt-1.5 "
            >
              <img className="h-6 m-3" src="./records.png" alt="" />
              <h1 className="pl-1 pt-3 pb-3 font-medium text-base tracking-tight">
                Records
              </h1>
            </NavLink>

            <div
              className="cursor-pointer w-11/12 ml-3 flex rounded hover:bg-gray-100 bottom-3 absolute "
              onClick={() => {
                localStorage.clear();
                dispatch(resetUserData());
                navigate("/");
              }}
            >
              <img className="h-6 m-3" src="./logout2.png" alt="" />
              <h1 className="pl-1 pt-3 pb-3 font-medium text-red-500 text-base tracking-tight">
                Logout
              </h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VNavbar;
