import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserContext } from "../Usercontext/UserContext";
import "./ItineraryDetails.css";
import { useAuth0 } from "@auth0/auth0-react";

const ItineraryDetails = () => {
  const { id } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const { userData } = useContext(UserContext);
  const [itinerary, setItinerary] = useState(null);
  const [bookingPrice, setBookingPrice] = useState(0);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchItineraryDetails = async () => {
      try {
        console.log("fetching itinerary details...");
        const response = await axios.get(
          `http://localhost:3001/itinerary/${id}`
        );
        console.log("itinerary details response", response.data.itinerary);
        setItinerary(response.data.itinerary);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/comment?itineraryId=${id}`
        );

        const commentsWithUsername = response.data.comments.map((comment) => ({
          ...comment,
          username: comment?.username,
        }));
        setComments(commentsWithUsername);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItineraryDetails();
    fetchComments();
  }, [id]);

  if (!itinerary) {
    return <div>Loading itinerary details...</div>;
  }

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleBookingSubmit = (event) => {
    event.preventDefault();
    console.log("Booking submitted");
    setBookingPrice();
    setFullName("");
    setPhoneNumber("");
    setEmail("");
    setDate("");
    setMessage("");
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      console.log(token);

      const userResponse = await axios.get(
        `http://localhost:3001/user/${userData.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const username = userResponse.data.user.username;

      const response = await axios.post(
        "http://localhost:3001/comment",
        {
          itinerary_id: id,
          remark: comment,
          user_id: userData.id,
          username: username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(username);
      console.log(response.data);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="itinerary-details-container">
      <div className="itinerary-details">
        <h2>{itinerary.title}</h2>
        <p>{itinerary.description}</p>
        <div className="image-container">
          <img src={itinerary.image_url} alt={itinerary.name} />
        </div>
        <p>Duration: {itinerary.duration}</p>
        <p>Difficulty: {itinerary.difficulty}</p>
        <p>Region: {itinerary.region}</p>
        <p>Altitude: {itinerary.altitude}</p>
        <p>Cost: {itinerary.cost}</p>

        <p className="text">
          {expanded
            ? itinerary.itineraries
            : ` ${itinerary.itineraries.slice(0, 5)}...`}
          <button onClick={handleToggleExpand}>
            {expanded ? "Read Less" : "Read More"}
          </button>{" "}
        </p>
      </div>
      <div className="comment-section">
        <h4>comment</h4>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="leave comment..."
            required
          ></textarea>
          <button type="submit">submit comment</button>
        </form>
        <div className="comment-list">
          {comments.map((comment, index) => {
            if (!comment || !comment.username) {
              return null;
            }
            if (userData && userData.username) {
              console.log(userData.username);
            }
            console.log(userData?.username);
            return (
              <div className="comment" key={index}>
                <p>{comment.remark}</p>
                <p>username: {comment.username}</p>
              </div>
            );
          })}
          <div></div>
        </div>
      </div>
      <div className="book-package-container">
        <h3>Book this Package</h3>
        <form onSubmit={handleBookingSubmit}>
          <div>
            <div>
              <label className="booking-label">Price</label>
              <p className="booking-price">STARTING FROM $2000 PER PERSON</p>
            </div>
            <label className="booking-label">Full Name</label>
            <input
              type="text"
              className="booking-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="booking-label">Phone Number</label>
            <input
              type="tel"
              className="booking-input"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="booking-label">Email</label>
            <input
              type="email"
              className="booking-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="booking-label">Date</label>
            <input
              type="date"
              className="booking-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="booking-label">Message</label>
            <textarea
              className="booking-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="booking-submit-button">
            Book Package
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItineraryDetails;
