import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Spinner, Card, Container } from "react-bootstrap";
import Profile from "./Components/Profile";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
    isLoading,
  } = useAuth0();

  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          const sendData = await axios.get("http://localhost:3001/authorized", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(sendData);
          console.log(token);
        } catch (e) {
          console.error(e);
        }
      }
    };

    const fetchUserProfile = () => {
      setUserProfile(user);
    };

    if (isAuthenticated) {
      getToken();
      fetchUserProfile();
    }
  }, [isAuthenticated, getAccessTokenSilently, user]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleCreateUser = async () => {
    const { name, email, picture, bio } = userProfile;
    try {
      const token = await getAccessTokenSilently();
      const createUser = await axios.post(
        "http://localhost:3001/user",
        {
          username: name,
          email,
          profilePicture: picture,
          bio,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(createUser);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    logout({
      returnTo: window.location.origin,
    });
  };

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "350px", height: "350px", marginTop: "10px" }}>
        <Card.Body
          style={{ height: "300px" }}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          {!isAuthenticated && (
            <div>
              <Card.Title className="text-center">
                Login to Hike Mate
              </Card.Title>
              <Button onClick={() => loginWithRedirect()}>Log In</Button>
            </div>
          )}
          {isAuthenticated && userProfile && (
            <Profile
              user={user}
              userProfile={userProfile}
              handleCreateUser={handleCreateUser}
              handleLogout={handleLogout}
            />
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;
