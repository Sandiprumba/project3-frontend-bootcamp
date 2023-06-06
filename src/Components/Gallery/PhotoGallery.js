import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Gallary.css";
const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch("http://localhost:3001/photo");
        const data = await response.json();

        if (data.photos) {
          setPhotos(data.photos);
        } else if (data.error) {
          console.error("Error fetching photos: ", data.error);
        }
      } catch (error) {
        console.error("Error fetching photos: ", error);
      }
    };

    fetchPhotos();
  }, []);

  const handleUploadPhoto = () => {
    navigate("/uploadphoto");
  };

  return (
    <div className="travel-photos-container">
      <h2 className="title">Travel Photos</h2>
      <h5 className="paragraph">
        Mountains offer breathtaking vistas and a sense of awe-inspiring beauty!
      </h5>

      <div className="photoGallery">
        {photos.map((photo) => (
          <div key={photo.id}>
            <h2>{photo.title}</h2>
            <p>{photo.description}</p>
            <img src={photo.image_url} alt={photo.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
