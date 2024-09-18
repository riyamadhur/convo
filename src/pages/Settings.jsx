import React from "react";
import Layout from "../components/Layout";
import { useAuthContext } from "../config/AuthContext";

const Settings = () => {
  const user = useAuthContext();
  return (
      <Layout title={"Convo - Settings"}>
        <div className="settings-container">
          <h2>Settings</h2>
          <div className="container">
            <div className="left">
              <div className="section">
                <h3>Profile</h3>
                <div className="setting-option">
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="profile-image"
                    />
                    <h4>Profile Image:</h4>
                </div>
                <div className="setting-option">
                  <h4>Full Name:</h4>
                  <p>{user?.displayName}</p>
                </div>
                
                <div className="setting-option">
                  <h4>Email:</h4>
                  <p>{user.email}</p>
                </div>
                <div className="setting-option">
                  <h4>Last Message:</h4>
                  <p>😎😎😎😎😎😎</p>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="section">
                <h3>General</h3>
                <div className="setting-option">
                  <h4>Notification Sounds:</h4>
                  <select>
                    <option value="on">On</option>
                    <option value="off">Off</option>
                  </select>
                </div>
                <div className="setting-option">
                  <h4>Message Preview:</h4>
                  <select>
                    <option value="on">On</option>
                    <option value="off">Off</option>
                  </select>
                </div>
                <div className="setting-option">
                  <h4>Timestamps:</h4>
                  <select>
                    <option value="on">On</option>
                    <option value="off">Off</option>
                  </select>
                </div>
              </div>
              <div className="section">
                <h3>Security & Privacy</h3>
                <div className="setting-option">
                  <label>Password:</label>
                  <p>********</p>
                </div>
                <div className="setting-option">
                  <h4>Two-factor authentication:</h4>
                  <p>Enabled</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
  );
};

export default Settings;
