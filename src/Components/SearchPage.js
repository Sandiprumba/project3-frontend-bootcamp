import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:3001/itinerary/search/${searchTerm}`
      );
      console.log(response);

      if (response.data.message === "no itineraries found") {
        setSearchResults([]);
        setError("No itineraries found.");
      } else if (response.data.message === "success") {
        setSearchResults(response.data.itineraries);
        setError("");
      } else {
        setError("Internal server error.");
      }
    } catch (error) {
      console.error(error);
      setError("Internal server error.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <input
            type="text"
            className="form-control form-control-lg me-1"
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>

      {error && <p>{error}</p>}

      {searchResults.length > 0 ? (
        searchResults.map((item) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <NavLink
              to={`/itinerary/${item.id}`}
              className="btn btn-secondary"
              activeClassName="active"
            >
              View Itinerary
            </NavLink>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchPage;
