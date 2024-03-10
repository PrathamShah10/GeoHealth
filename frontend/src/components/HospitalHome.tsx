import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_HOSPITAL_FILES } from "../redux/query/user";
import Navbar from "./Navbar";
import VNavbar from "./VNavbar";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { resetUserData } from "../redux/reducer/user";
import { Link } from "react-router-dom";
const HospitalHome = () => {
  const { _id } = JSON.parse(localStorage.getItem("hospital"));
  const hospitalId = _id;
  const [files, setFiles] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userFiles, setUserFiles] = useState([]);
  const [getAllHospitalFiles, { data }] = useLazyQuery(GET_ALL_HOSPITAL_FILES);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFiles = async () => {
      if (hospitalId) {
        getAllHospitalFiles({
          variables: {
            hospitalId,
          },
        });
      }
    };

    fetchFiles();
  }, [hospitalId]);

  useEffect(() => {
    if (data) {
      setFiles(data.getHospitalFiles);
    }
  }, [data]);

  const users = Array.from(new Set(files.map((file) => file.userId)));
  const dispatch = useAppDispatch();

  const user = localStorage.getItem("user");
  const [showVNavbar, setShowVNavbar] = useState(false);
  const handleShowVNavbar = () => {
    setShowVNavbar(!showVNavbar);
  };
  const handleUserClick = async (userId) => {
    setSelectedUserId(userId);
    try {
      const response = files.filter((item) => item.userId === userId);
      setUserFiles(response);
    } catch (error) {
      console.error(error);
    }
  };
  const openFile = (path: string) => {
    // Create a new window to open the file
    window.open(`https://gateway.pinata.cloud/ipfs/${path}`, "_blank");
  };
  return (
    <>
      <div className="p-[0.1rem]">
        <div className="sda w-screen bg-white h-16 shadow-md flex justify-between">
          <div className="sda w-screen flex justify-between">
            <img className="logo mt-2 h-12 ml-5" src="./logos.png" alt="" />

            <div className="mini flex">
              <div>
                <Link to="/profile">
                  <img className="img h-10 m-3" src="./profile.png" alt="" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`mainnavss `}>
        <div className="vnavbarr pt-16 min-w-[18rem] h-screen bg-white shadow-lg ">
          <div className="flex m-3 p-3 rounded shadow-md">
            <img src="./lines2.png" className="liness h-7" alt="" />
            <h1 className="ml-4 text-lg font-medium">GeoHealth</h1>
          </div>

          <NavLink
            to="/hospital-home"
            className="w-11/12 ml-3 flex hover:pl-2 hover:mr-2 rounded hover:bg-gray-100 mt-1.5 "
          >
            <img className="h-6 m-3" src="./records.png" alt="" />
            <h1 className="text-base text-gray-700  pt-3 pb-3 tracking-tight font-medium ">
              User Data
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

      <div>
        <div className="mmpage ">
          <div className="backdrop-blur-md p-1 h-screen">
            <div className="ml-[24rem] mt-20">
              <h1 className="text-3xl font-Rubik font-semibold text-gray-600">
                Received Files
              </h1>
              <div className="flex w-11/12 justify-evenly">
                <ul className=" mt-5 bg-white w-[45%] h-[40rem] rounded-lg p-4">
                  {users.map((userId) => (
                    <li key={userId} className="bg-gray-100 mt-4 p-3 rounded-lg">
                      <button onClick={() => handleUserClick(userId)}>
                        User ID: {userId}
                      </button>
                    </li>
                  ))}
                </ul>

                {selectedUserId && (
                  <div className="bg-white w-[45%] mt-5 rounded-lg p-5">
                    <h2 className="text-2xl ">Files of selected user</h2>
                    <ul>
                      {userFiles.map((file) => (
                        <li className="bg-gray-100 rounded-lg mt-4 p-3 cursor-pointer"
                          onClick={() => openFile(file.fileHash)}
                          key={file.fileHash}
                        >
                          {file.fileName}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HospitalHome;
