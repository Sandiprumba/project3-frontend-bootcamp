import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

const UploadItinerary = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [itineraries, setItineraries] = useState("");
  const [duration, setDuration] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [region, setRegion] = useState("");
  const [altitude, setAltitude] = useState("");
  const [cost, setCost] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/itinerary", {
        title,
        description,
        itineraries,
        duration,
        difficulty,
        region,
        altitude,
        cost,
        image_url: imageUrl,
      });
      console.log(response.data);

      setTitle("");
      setDescription("");
      setItineraries("");
      setDuration("");
      setDifficulty("");
      setRegion("");
      setAltitude("");
      setCost("");
      setImageUrl("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <h2>Upload Itinerary</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formItinerary">
          <Form.Label>Itinerary</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={itineraries}
            onChange={(e) => setItineraries(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDuration">
          <Form.Label>Duration</Form.Label>
          <Form.Control
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDifficulty">
          <Form.Label>Difficulty</Form.Label>
          <Form.Control
            type="text"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formRegion">
          <Form.Label>Region</Form.Label>
          <Form.Control
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formAltitude">
          <Form.Label>Altitude</Form.Label>
          <Form.Control
            type="text"
            value={altitude}
            onChange={(e) => setAltitude(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCost">
          <Form.Label>Cost</Form.Label>
          <Form.Control
            type="text"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formImageUrl">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default UploadItinerary;
