import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { resetUserData } from "../redux/reducer/user";
function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div className="flex flex-row-reverse">
      <Link to="/profile">
        <div>Profile</div>
      </Link>
      <div> | </div>
      <div
        className="cursor-pointer"
        onClick={() => {
          localStorage.clear();
          dispatch(resetUserData());
          navigate("/");
        }}
      >
        <div>Logout</div>
      </div>
    </div>
  );
}

export default Navbar;
