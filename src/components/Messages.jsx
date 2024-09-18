import React, { useEffect, useState, useRef } from "react";
import Message from "./Message";
import { useSelector } from "react-redux";
import { chatSelector } from "../redux/chatSlice";
import { firestoreDB } from "../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const Messages = () => {
  const { chatId } = useSelector(chatSelector);
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    const fetchMessages = onSnapshot(
      doc(firestoreDB, "chats", chatId),
      (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      }
    );
    return () => {
      fetchMessages();
    };
  }, [chatId]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="messages">
      {messages.map((m, i) => (
        <div key={i} ref={i === messages.length - 1 ? lastMessageRef : null}>
          <Message message={m} />
        </div>
      ))}
    </div>
  );
};

export default Messages;
