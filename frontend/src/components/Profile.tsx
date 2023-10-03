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
    <div className="backpanel bg-white">
      <div>name: {user?.name}</div>
      <div>username: {user?.username}</div>
      <div>email: {user?.email}</div>
      <div>
        diseases bhai apko konse hain?:{" "}
        {diseases?.map((disease, i) => {
          return <li key={i}>{disease}</li>;
        })}
      </div>
      <div>
        upya: 
        Name:
        <input type="text" onChange={(e) => setName(e.target.value)} />
        Email:
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Profile;
