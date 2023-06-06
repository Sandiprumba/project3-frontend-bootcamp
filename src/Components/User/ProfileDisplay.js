import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../Usercontext/UserContext";
import "./ProfileDisplay.css";

const ProfileDisplay = ({ onEdit }) => {
  const { isLoading, logout } = useAuth0();
  const { userData } = useContext(UserContext);

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  if (isLoading || !userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h3>User Profile</h3>
      <img
        className="profile-picture"
        src={userData.profile_picture}
        alt={userData.username}
      />
      <h5>Email: {userData.email}</h5>
      <h5>Name:{userData.username}</h5>
      <h5>Bio:{userData.bio}</h5>
      <div>
        <button className="button" onClick={handleLogout}>
          Log Out
        </button>

        <button className="button" onClick={onEdit}>
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileDisplay;
