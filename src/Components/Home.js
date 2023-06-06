import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const HomePage = () => {
  const backgroundImageUrl =
    "https://everestbuzz.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmountain3.f79042a1.png&w=3840&q=75";
  return (
    <div className="homepage">
      <div className="hero-banner">
        <h1>EVEREST</h1>
        <h2>IS CALLING YOU</h2>
      </div>
      <div
        className="featured-itineraries"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "170px",
        }}
      >
        <div>
          <div className="button-container">
            <Link to="/itinerary" className="btn btn-primary">
              Explore Destination
            </Link>
          </div>
        </div>
      </div>
      <div className="text-container">
        <div className="welcome-text">
          <p>
            Welcome to Hike Mate, your trustworthy companion for unforgettable
            journeys into the magnificent realm of the Himalayas.
            <br />
            At Hike Mate, we specialize in crafting safe, sustainable, and
            memorable Himalayan adventures. Whether you're an amateur hiker
            looking for a moderately paced journey or a seasoned trekker eager
            to conquer towering peaks, we have an itinerary to suit your needs.
            With Hike Mate, you're not just embarking on a physical trek but a
            journey of self-discovery and personal growth. So, get ready to lace
            up your hiking boots, pack your spirit of adventure, and set forth
            on a journey of a lifetime with Hike Mate, where every trail in the
            Himalayas is a path to an unforgettable story.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
