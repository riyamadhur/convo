import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Helmet from "react-helmet";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
    {/* META portion */}
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      {/* header portion */}
      <Header />
      {/* main portion */}
      <div style={{ height: "calc(100vh - 80px)", overflowY: "auto" }}>
        {children}
      </div>
      {/* footer portion */}
      <Footer />
    </>
  );
};
Layout.defaultProps = {
  title: "Convo live",
  description:
    "convo live is a chat application giving end to end user information chats and messages",
  keywords: "Chat, reactjs, Firebase, realtime, end to end",
  author: "Abhijeet kumar",
};

export default Layout;
