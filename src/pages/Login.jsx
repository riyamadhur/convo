import React, { useState } from "react";
import Input from "../components/form/Input";
import logo from "../assets/logo.png";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../config/Build/authentication";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
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
  //firebase hooks
  const auth = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!userData.email || !userData.password){
      toast.error("please fill all required fields")
      return;
    }
    let user;
    auth
      .loginUserWithEmailAndPassword(userData.email, userData.password)
      .then((data) => {
        user = data.user;
      })
      .then(() => {
        clearInputdata();
        toast.success("your are now logged in")
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message && error.message.includes("invalid-")) {
          toast.error("Incorrect email/password");
          return;
        }
      });
  };
  return (
    <Layout title={"Convo - login"}>
      <div className="formContainer">
        <div className="formWrapper scale-up-center">
          <h1>
            <img src={logo} width={35} height={35} /> Convo <span>live</span>
          </h1>
          <h4 className="title">Login</h4>
          <div className="inputForm">
            <form onSubmit={handleSubmit}>
              <Input
                type="email"
                label="Email address"
                id="email"
                name="email"
                value={userData.email}
                onChange={data}
              />
              <Input
                type="password"
                label="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={data}
              />
              <button>Login</button>
            </form>
            <p>
              New user? please{" "}
              <Link to={"/register"} style={{ color: "#0f1035" }}>
                Register
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
