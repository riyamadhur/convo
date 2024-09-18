import React from "react";
import { useAuthContext } from "../config/AuthContext";

const Message = ({ message }) => {
  const user = useAuthContext();
  return (
    <div className={`message ${message.sender === user.uid ? "owner" : ""}`}>
      <div className="messageInfo">
        {message.userImg && <img src={message.userImg} alt="userImage" />}
        <span>{message?.time}</span>
      </div>
      <div className="messageContent">
        {message?.text!=="" && <p>{message.text}</p>}
        {message.img !=="" && <img src={message.img} alt="messageImage" />}
      </div>
    </div>
  );
};

export default Message;
