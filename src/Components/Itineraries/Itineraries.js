import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Itineraries.css";

const Itineraries = () => {
  const [itineraries, setItineraries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItineraries();
  }, []);

  const fetchItineraries = async () => {
    try {
      const response = await axios.get("http://localhost:3001/itinerary");
      setItineraries(response.data.itineraries);
    } catch (error) {
      console.error(error);
    }
  };

  const openItinerary = (id) => {
    navigate(`/itinerary/${id}`);
  };

  return (
    <Container className="main">
      <div>
        <h1 className="header">PACKAGES</h1>
        <h5 className="text"> EXPLORE THE BEST TOUR PACKAGE</h5>
      </div>
      <div className="itinerary-container">
        {itineraries.map((itinerary) => (
          <div key={itinerary.id} className="itinerary-card">
            <img
              src={itinerary.image_url}
              alt={itinerary.name}
              className="itinerary-image"
            />
            <div className="itinerary-details">
              <h3 className="itinerary-title">{itinerary.title}</h3>
            </div>
            <Button onClick={() => openItinerary(itinerary.id)}>Visit</Button>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Itineraries;
