import React from "react";
import { IoHome } from "react-icons/io5";
import { FaUser, FaUserLock, FaUserPlus } from "react-icons/fa";
import { FaGear, FaCircleQuestion } from "react-icons/fa6";
import { MdSupportAgent } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../config/AuthContext";
import { useDispatch } from 'react-redux'
import { clearChatId } from "../redux/chatSlice";

const Footer = () => {
  const user = useAuthContext();
  const dispatch = useDispatch()
  return (
    <div className="footerContainer">
      <div className="footerWrapper">
        <NavLink className={"btn"} style={navStyle} to={"/"} onClick={dispatch(clearChatId())}>
          <IoHome /> <span>Home</span>
        </NavLink>
        {!user && (
          <>
          <NavLink className={"btn"} style={navStyle} to={"/login"}>
            <FaUserLock /> <span>Login</span>
          </NavLink>
          <NavLink className={"btn"} style={navStyle} to={"/register"}>
          <FaUserPlus /> <span>Register</span>
        </NavLink>
        </>
        )}
        <NavLink className={"btn"} style={navStyle} to={"/settings"}>
          <FaGear /> <span>Settings</span>
        </NavLink>
        <NavLink className={"btn"} style={navStyle} to={"/contact-us"}>
          <MdSupportAgent /> <span>Contact us</span>
        </NavLink>
        <NavLink className={"btn"} style={navStyle} to={"/about-us"}>
          <FaCircleQuestion /> <span>About us</span>
        </NavLink>
      </div>
    </div>
  );
};

const navStyle = ({ isActive }) =>
  isActive ? { backgroundColor: "#7fc7d9", color: "#0f1035" } : undefined;

export default Footer;
