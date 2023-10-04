import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { UPDATE_USER_PROFILE } from "../redux/query/user";
import { useMutation } from "@apollo/client";
import { setUserData } from "../redux/reducer/user";
const Profile = () => {
  const dispatch = useAppDispatch();
  const { user, diseases } = useAppSelector((state) => state.user);
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

    </div>
  );
};

export default Profile;
