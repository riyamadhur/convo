import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Settings from "../pages/Settings";
import Contactus from "../pages/Contactus";
import Aboutus from "../pages/Aboutus";
import { AuthContextProvider } from "../config/AuthContext";
import ProtectedRoute from "./Protected.route";

const Rout = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/">
            <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="contact-us" element={<ProtectedRoute><Contactus /></ProtectedRoute>} />
            <Route path="about-us" element={<Aboutus />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default Rout;
