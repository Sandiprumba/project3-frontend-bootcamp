import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PhotoUpload.css";

const PhotoUploader = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    let filename = file.name;
    const fileRef = ref(storage, `photos/${filename}`);

    try {
      const snapshot = await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("photo url", downloadURL);

      const response = await axios.post("http://localhost:3001/photo", {
        image_url: downloadURL,
        title: "",
        description: "",
      });

      console.log(response.data);

      navigate("/photo"); // Navigate back to PhotoGallery page
    } catch (error) {
      console.log("error uploading photo", error);
    }
  };

  return (
    <div className="PhotoUploader">
      <h4>Upload Photo</h4>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default PhotoUploader;
