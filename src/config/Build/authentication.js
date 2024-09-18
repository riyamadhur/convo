import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { firebaseAuth } from "../firebase";

export const useAuth = () => {
  const signupUserWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCredential) => resolve(userCredential))
        .catch((error) => reject(error));
    });
  };

  const loginUserWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCredential) => resolve(userCredential))
        .catch((error) => reject(error));
    });
  };

  const signInWithGoogle = () => {
    return new Promise((resolve, reject) => {
      const googleProvider = new GoogleAuthProvider();
      signInWithRedirect(firebaseAuth, googleProvider)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  };

  const logoutUser = () => {
    return new Promise((resolve, reject) => {
      signOut(firebaseAuth)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  };

  const updateAuthenticatedUserData = (updateData) => {
    return new Promise((resolve, reject) => {
      updateProfile(firebaseAuth.currentUser, updateData)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  };

  const sentUserEmailVerification = () => {
    return new Promise((resolve, reject) => {
      sendEmailVerification(firebaseAuth.currentUser)
        .then(() => {
          alert("Email verification sent. Please check your email.");
          resolve();
        })
        .catch((error) => reject(error));
    });
  };

  return {
    signupUserWithEmailAndPassword,
    loginUserWithEmailAndPassword,
    signInWithGoogle,
    logoutUser,
    updateAuthenticatedUserData,
    sentUserEmailVerification,
  };
};
