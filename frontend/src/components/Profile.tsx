import React from "react";
import { useAppSelector } from "../hooks/redux";

const Profile = () => {
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
