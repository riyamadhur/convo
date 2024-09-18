import React from "react";
import { MdConnectWithoutContact } from "react-icons/md";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <div className="header">
      <div className="headerWrapper">
        <h1>
          <img src={logo} width={35} height={35}/> Convo <span>live</span>
        </h1>
      </div>
    </div>
  );
};

export default Header;
{
  /* <MdConnectWithoutContact /> */
}
