import React from "react";
import { TbLogout } from "react-icons/tb";
import { useAuthContext } from "../config/AuthContext";
import { useAuth } from "../config/Build/authentication";

const Navbar = () => {
  const user = useAuthContext();
  const auth = useAuth();
  return (
    <div className="navbar">
      <div className="user">
        <img src={user?.photoURL} alt="user logo" />
        <span>{user?.displayName}</span>
        <h5 onClick={auth.logoutUser}>
          <TbLogout />
        </h5>
      </div>
    </div>
  );
};

export default Navbar;
