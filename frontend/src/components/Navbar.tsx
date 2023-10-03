import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { resetUserData } from "../redux/reducer/user";
function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  return (
    <div className="flex bg-blue-500 flex-row-reverse">
      {user && (
        <div className="flex">
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
      )}
    </div>
  );
}

export default Navbar;
