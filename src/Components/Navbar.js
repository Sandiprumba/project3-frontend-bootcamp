import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.get(`http://localhost:3001/itinerary/search/${searchTerm}`);
      setSearchTerm("");
      navigate("/searchpage");
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputClick = () => {
    navigate("/searchpage");
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-1 ">
      <div className="container" style={{ color: "red" }}>
        <NavLink
          className="navbar-brand fs-2"
          to="/"
          style={{ color: "green" }}
        >
          Hike Mate
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeclassname="active"
                exact="true"
                to="/home"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeclassname="active"
                to="/itinerary"
              >
                Destination
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeclassname="active"
                to="/photo"
              >
                Photos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeclassname="active"
                to="/video"
              >
                Videos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeclassname="active"
                to="/profile"
              >
                Profile
              </NavLink>
            </li>
          </ul>
        </div>
        <form className="d-flex" onSubmit={handleSubmit}>
          <input
            className="form-control me-1"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchTerm}
            onChange={handleChange}
            onClick={handleInputClick}
          />
          <button className="btn btn-outline-light" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
