import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { UPDATE_USER_PROFILE } from "../redux/query/user";
import { useMutation } from "@apollo/client";
import { setUserData } from "../redux/reducer/user";
const Profile = () => {
  const dispatch = useAppDispatch();
  const { user, diseases } = useAppSelector((state) => state.user);
  const [updateUser] = useMutation(UPDATE_USER_PROFILE);
  const [name, setName] = useState<string>(user?.name || "");
  const [email, setEmail] = useState<string>(user?.email || "");
  const handleSubmit = async () => {
    const { data } = await updateUser({
      variables: {
        userDetails: {
          _id: user?._id,
          name,
          email,
        },
      },
    });
    dispatch(setUserData(data.updateUserProfile));
  };
  return (
    <div className="w-screen m-0 p-0">
      <div className="backpanel flex w-1/2 h-[40rem] ml-auto mr-auto mt-20  bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl ">
        <div className="bg-sea-green-400 rounded-tl-xl rounded-bl-xl w-1/3 p-10">
          <img className="mt-6" src="./profile.png" alt="" />
          <h1 className="text-white font-bold text-2xl text-center mt-2">{user?.name}</h1>
        </div>
        <div className="p-6">
          <h1 className="font-bold text-3xl">PROFILE</h1>
          <div className="font-semibold mt-5 text-xl">
            <div className="mt-2">Name: <span className="font-normal">{user?.name}</span></div>
            <div  className="mt-2">Username: <span className="font-normal">{user?.username}</span></div>
            <div  className="mt-2">Email: <span className="font-normal">{user?.email}</span></div>
            <div  className="mt-2">
              List of medical History:{" "}
              <span className="font-normal list-none">{diseases?.map((disease, i) => {
                return <li key={i}>{disease}</li>;
              })}</span>
              
            </div>
          </div>
          <h1 className="font-bold text-xl mt-10">Edit Profile</h1>
          <div>
            <h1 className="font-semibold mt-5 text-xl">Name: <span><input className="border-2 rounded-lg ml-2" type="text" onChange={(e) => setName(e.target.value)} /></span></h1>
            
            <h1 className="font-semibold mt-5 text-xl" >Email :   <span><input className="border-2 rounded-lg ml-2"  type="text" onChange={(e) => setEmail(e.target.value)} /></span></h1>
            
            <button className="bg-sea-green-500 text-white p-2 font-semibold rounded-lg shadow-lg mt-6  mb-0" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;