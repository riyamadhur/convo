import React from "react";
import { FaUserPlus, FaVideo } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import Messages from "./Messages";
import Input2 from "./Input2";
import { chatSelector } from "../redux/chatSlice";
import { useSelector } from "react-redux";
import NoConservation from "./NoConservation";

const Chat = () => {
  const { selectedUser, chatId } = useSelector(chatSelector);
  return (
    <div className={`chat ${chatId ? "active" : ""}`}>
      <div className="chatInfo"> {/* Added className attribute */}
        {chatId ? (
          <>
            <img src={selectedUser.photoURL} alt="" />
            <span>{selectedUser.displayName}</span>
            <div className="chatIcons">
              <span>
                <FaVideo />
              </span>
              <span>
                <FaUserPlus />
              </span>
              <span>
                <IoMdMore />
              </span>
            </div>
          </>
        ) : (
          <h2 style={{textAlign: "center", width: "100%"}}>No Conversation selected</h2>
        )}
      </div>
      {chatId ? (
        <>
          <Messages />
          <Input2 />
        </>
      ): <NoConservation/>}
    </div>
  );
};

export default Chat;
