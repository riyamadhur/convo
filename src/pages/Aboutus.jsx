import React from "react";
import Layout from "../components/Layout";
import logo from '../assets/logo.png'

const Aboutus = () => {
  return (
    <Layout title={"Convo - About"}>
      <div className="about">
      <h1>
          <img src={logo} width={35} height={35}/> Convo <span>live</span>
        </h1>
        <p>
          Convo is a user-friendly chat application designed to facilitate
          seamless communication between individuals or groups. It provides a
          simple yet powerful platform for sending messages, images, and various
          media files to your contacts.
        </p>
        <div className="feature">
          <h2>Messaging</h2>
          <p>
            Convo allows users to send text messages to individuals or groups.
            Conversations are displayed in a threaded format, making it easy to
            follow the flow of discussions.
          </p>
        </div>
        <div className="feature">
          <h2>File Sharing</h2>
          <p>
            One of the standout features of Convo is its ability to share
            files effortlessly. Users can send images, videos, audio files,
            documents, and other media types directly within the chat interface.
          </p>
        </div>
        <div className="feature">
          <h2>Media Preview</h2>
          <p>
            Before sending a file, users can preview it within the app to ensure
            they are sharing the correct content. This feature helps prevent
            sending the wrong file by mistake.
          </p>
        </div>
        <div className="feature">
          <h2>Security</h2>
          <p>
            Convo prioritizes the security and privacy of its users.
            End-to-end encryption ensures that messages and files remain private
            and inaccessible to unauthorized parties.
          </p>
        </div>
        <div className="feature">
          <h2>Customization</h2>
          <p>
            Users can personalize their chat experience by customizing themes,
            chat backgrounds, and notification settings according to their
            preferences.
          </p>
        </div>
        <div className="feature">
          <h2>Cross-Platform Compatibility</h2>
          <p>
            Convo is available on multiple platforms, including iOS, Android,
            and desktop. This allows users to stay connected regardless of the
            device they are using.
          </p>
        </div>
        <div className="feature">
          <h2>Offline Messaging</h2>
          <p>
            Even when users are offline, they can still receive messages and
            files. Convo stores incoming messages locally and delivers them
            once the user comes back online.
          </p>
        </div>
        <div className="feature">
          <h2>Search Functionality</h2>
          <p>
            Finding past conversations or files is easy with Convo's search
            functionality. Users can quickly locate specific messages or media
            by searching keywords or file names.
          </p>
        </div>
        <div className="feature">
          <h2>Group Chat Management</h2>
          <p>
            For group chats, administrators have the ability to manage members,
            set permissions, and customize group settings to ensure smooth
            collaboration.
          </p>
        </div>
        <div className="feature">
          <h2>Real-Time Notifications</h2>
          <p>
            Users receive instant notifications for new messages and file
            uploads, ensuring they stay updated and never miss important
            conversations.
          </p>
        </div>
        <div className="feature">
          <h2>Intuitive User Interface</h2>
          <p>
            Convo boasts a clean and intuitive user interface, making it easy
            for users of all ages to navigate the app and access its features
            seamlessly.
          </p>
        </div>
        <div className="feature">
          <h2>Feedback and Support</h2>
          <p>
            The app provides a dedicated channel for users to submit feedback,
            report issues, or seek assistance from the support team. Regular
            updates based on user feedback ensure a continuously improving user
            experience.
          </p>
        </div>
        <p>
          Convo aims to redefine the way people communicate by offering a
          feature-rich yet user-friendly platform for messaging and file
          sharing. Whether it's exchanging casual messages with friends or
          collaborating on projects with colleagues, convo provides the tools needed to stay connected and productive.
        </p>
      </div>
    </Layout>
  );
};

export default Aboutus;
