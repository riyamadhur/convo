import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Input from "../components/form/Input";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../config/AuthContext";
import { useRealtimeDatabase } from "../config/Build/realtimedatabase";
import { useFirestore } from "../config/Build/firestore";

const Contactus = () => {
  const user = useAuthContext();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState({
    subject: "",
    message: "",
  });
  const database = useRealtimeDatabase();
  const store = useFirestore();
  const navigate = useNavigate();
  const data = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };
  const clearInputdata = () => {
    setUserData({
      email: "",
      password: "",
    });
  };
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
      setEmail(user.email);
    }
  }, [user]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.subject || !userData.message) {
      toast.error("please fill all required fields.");
      return;
    }
    store
      .setDataToFirestoreRef("contact-us", user.uid, {
        email: user.email,
        displayName: user.displayName,
        subject: userData.subject,
        message: userData.message,
      })
      .then(() => {
        return database
          .putData(`contact-us/${user.uid}`, {
            email: user.email,
            displayName: user.displayName,
            subject: userData.subject,
            message: userData.message,
          })
          .then(() => {
            toast.success("your message have been sent successfully");
            clearInputdata();
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };
  return (
    <Layout title={"Convo - Contact"}>
      <div className="formContainer">
        <div className="formWrapper scale-up-center">
          <h1>
            <img src={logo} width={35} height={35} /> Convo <span>live</span>
          </h1>
          <h4 className="title">Contact us</h4>
          <div className="inputForm">
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                label="full name"
                id="displayName"
                name="displayName"
                value={displayName}
                disabled={true}
              />
              <Input
                type="email"
                label="Email address"
                id="email"
                name="email"
                value={email}
                disabled={true}
              />
              <Input
                type="text"
                label="subject"
                id="subject"
                name="subject"
                value={userData.subject}
                onChange={data}
              />
              <Input
                Varient="textarea"
                type="text"
                label="message"
                id="message"
                name="message"
                value={userData.message}
                onChange={data}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contactus;
