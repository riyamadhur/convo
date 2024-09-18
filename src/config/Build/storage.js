import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
export const useStorage = () => {
  const uploadFile = (path, file) => {
    return new Promise((resolve, reject) => {
      const uploadTask = uploadBytesResumable(ref(storage, path), file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
          console.log("Something went wrong!");
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log("Upload is 100% done");
              resolve(downloadURL);
            })
            .catch((error) => {
              console.log(error);
              reject(error);
            });
        }
      );
    });
  };
  
  const deletefile = (path) => {
    const desertRef = ref(storage, path);
    deleteObject(desertRef)
      .then(() => {
        console.log("File deleted successfully");
      })
      .catch((error) => {
        console.log("Uh-oh, an error occurred!", error);
      });
  };
  return {
    uploadFile,
    deletefile,
  };
};
