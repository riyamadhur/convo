import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Layout from "../components/Layout";

const Home = () => {
  return (
      <Layout title="Convo - Home">
        <div className="container">
          <Sidebar />
          <Chat />
        </div>
      </Layout>
  );
};

export default Home;
