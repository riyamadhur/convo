import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuthContext } from "../config/AuthContext";
import { useDispatch } from "react-redux";
import { setUsers, userSelector } from "../redux/userSlice";
import { createChatSession } from "../redux/chatSlice";
import { firestoreDB } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

const Users = () => {
  const { users, searchedUsers } = useSelector(userSelector);
  const user = useAuthContext();
  const dispatch = useDispatch();
  const handleSelect = (selectedUserId) => {
    dispatch(createChatSession({ userId: user.uid, selectedUserId }));
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(firestoreDB, "users"));
      let newusers = [];
      querySnapshot.forEach((doc) => {
        if (doc.id !== user.uid) {
          newusers.push(doc.data());
        }
      });
      dispatch(setUsers(newusers));
    };
    fetchUsers()
    return () => {
      fetchUsers();
    };
  }, [dispatch, user.uid]);
  return (
    <div className="userChat">
      {searchedUsers.length === 0
        ? users?.map((u) => (
            <div
              className="user"
              key={u.uid}
              onClick={() => handleSelect(u.uid)}
            >
              <img src={u.photoURL} alt="searched user" />
              <div className="userChatInfo">
                <span>{u.displayName}</span>
                <p>{u.lastMessege ? u?.lastMessege : "Not started yet"}</p>
              </div>
            </div>
          ))
        : searchedUsers?.map((u) => (
            <div
              className="user"
              key={u.uid}
              onClick={() => handleSelect(u.uid)}
            >
              <img src={u.photoURL} alt="searched user" />
              <div className="userChatInfo">
                <span>{u.displayName}</span>
                <p>{u?.lastMessege ? u?.lastMessege : "Not started yet"}</p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Users;
