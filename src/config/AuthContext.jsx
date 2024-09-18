import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "./firebase";

const authContext = createContext();

const useAuthContext = () => useContext(authContext);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //please install react-router-dom to use navigate (command: npm install react-router-dom)
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log(currentUser);
      } else {
        setUser(null);
      }
      navigate("/");
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return <authContext.Provider value={user}>{children}</authContext.Provider>;
};

export { useAuthContext, AuthContextProvider };
