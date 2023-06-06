import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
import axios from "axios";
import "./PhotoUpload.css";
import { useNavigate } from "react-router-dom";

const VideoUploader = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    let filename = file.name;
    const fileRef = ref(storage, `Videos/${filename}`);

    try {
      const snapshot = await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("photo url", downloadURL);

      const response = await axios.post("http://localhost:3001/video", {
        video_url: downloadURL,
        title: "",
        description: "",
      });

      console.log(response.data);
      navigate("/video");
    } catch (error) {
      console.log("error uploading video", error);
    }
  };

  return (
    <div className="VideoUploader">
      <input type="file" onChange={handleFileChange} accept="video/*" />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default VideoUploader;
