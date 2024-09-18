import {
  onSnapshot,
  query,
  collection,
  where,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { firestoreDB } from "../firebase";
import { useEffect, useState } from "react";

export const useFirestore = () => {
  const addDataToFirestore = (collectionName, data) => {
    return new Promise((resolve, reject) => {
      addDoc(collection(firestoreDB, collectionName), data)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  };

  const setDataToFirestoreRef = (collectionName, reference, data) => {
    return new Promise((resolve, reject) => {
      setDoc(doc(firestoreDB, collectionName, reference), data)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  };

  const setDataToFirestoreNoRef = (collectionName, data) => {
    return new Promise((resolve, reject) => {
      setDoc(doc(collection(firestoreDB, collectionName)), data)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  };

  const updateDataFromFirestore = (collectionName, reference, data) => {
    return new Promise((resolve, reject) => {
      updateDoc(doc(firestoreDB, collectionName, reference), data)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  };

  const deleteDataFromFirestore = (collectionName, reference) => {
    return new Promise((resolve, reject) => {
      deleteDoc(doc(firestoreDB, collectionName, reference))
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  };

  // const getADocsFromFirestore = (collectionName, reference) => {
  //   return new Promise((resolve, reject) => {
  //     getDoc(doc(firestoreDB, collectionName, reference))
  //       .then((docSnap) => {
  //         if (docSnap.exists()) {
  //           resolve(docSnap.data());
  //         } else {
  //           resolve(null);
  //         }
  //       })
  //       .catch((error) => reject(error));
  //   });
  // };
  const getADocsFromFirestore = async (collectionName, reference) => {
    const docSnap = await getDoc(doc(firestoreDB, collectionName, reference));
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // return "Document doesn't exist!";
      return null;
    }
  };

  const getMultipleDocsFromFirestore = async (collectionName, key, value) => {
    let data = [];
    const querySnapshot = await getDocs(
      query(collection(firestoreDB, collectionName), where(key, "==", value))
    );
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  };
  
  const getAllDocsFromFirestore = async (collectionName) => {
    let data = [];
    const querySnapshot = await getDocs(
      query(collection(firestoreDB, collectionName))
    );
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  };

  return {
    addDataToFirestore,
    setDataToFirestoreRef,
    setDataToFirestoreNoRef,
    updateDataFromFirestore,
    deleteDataFromFirestore,
    getADocsFromFirestore,
    getMultipleDocsFromFirestore,
    getAllDocsFromFirestore,
  };
};
