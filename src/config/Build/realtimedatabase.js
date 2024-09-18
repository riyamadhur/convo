import { ref, set as setDataToRealtimeDatabase } from "firebase/database";
import { database } from "../firebase";

export const useRealtimeDatabase = () => {
  const putData = (key, data) => {
    return new Promise((resolve, reject) => {
      setDataToRealtimeDatabase(ref(database, key), data)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  };

  return {
    putData,
  };
};
