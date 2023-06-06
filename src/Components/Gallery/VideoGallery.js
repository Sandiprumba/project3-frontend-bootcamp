import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VideoGallery.css";

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:3001/video");
        const data = await response.json();
        if (data.videos) {
          setVideos(data.videos);
        } else if (data.error) {
          console.log("Error fetching videos: ", data.error);
        }
      } catch (error) {
        console.log("Error fetching videos: ", error);
      }
    };

    fetchVideos();
  }, []);

  const handleUploadVideo = () => {
    navigate("/videouploader");
  };

  return (
    <div className="travel-videos-Container text-center">
      <h2 className="title">Travel Videos</h2>
      <h5 className="paragraph">
        Uncover the magic of mountains through captivating video journeys!
      </h5>
      <div className="videoGallery">
        {videos.map((video) => (
          <div key={video.id}>
            <h3>{video.title}</h3>
            <video controls src={video.video_url} alt={video.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
