import React, { useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { GrAttachment } from "react-icons/gr";
import { useSelector, useDispatch } from "react-redux";
import { chatSelector, sentMessage } from "../redux/chatSlice";
import { useAuthContext } from "../config/AuthContext";
import { useStorage } from "../config/Build/storage";

const Input2 = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const { chatId } = useSelector(chatSelector);
  const user = useAuthContext();
  const dispatch = useDispatch();
  const storage = useStorage();

  function convertToAMPM() {
    let currentTime = new Date();
    let hour = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return hour + ":" + minutes + " " + ampm;
  }
  const handleSubmit = async (e) => {
    let url = "";
    if (image) {
      url = await storage.uploadFile(`users/${user.uid}/${image.name}`, image);
      setImage(url);
    }
    dispatch(
      sentMessage({
        message: {
          userImg: user.photoURL,
          sender: user.uid,
          receiver: chatId.replace(user.uid, ""),
          text: text,
          img: url,
          time: convertToAMPM(),
        },
        chatId,
      })
    );
    setText("");
    setImage(null)
  };
  return (
    <div className="input">
      <div className="inputField">
        <input
          type="text"
          placeholder="Type your messege here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="send">
        <span>
          <GrAttachment />
        </span>
        <input
          type="file"
          style={{ display: "none" }}
          id="addFile1"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="addFile1">
          <span>
            <LuImagePlus />
          </span>
        </label>
        <button onClick={handleSubmit}>send</button>
      </div>
    </div>
  );
};

export default Input2;
