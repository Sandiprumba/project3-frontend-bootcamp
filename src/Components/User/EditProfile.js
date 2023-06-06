import React, { useState, useContext } from "react";
import { UserContext } from "../Usercontext/UserContext";
import { useNavigate } from "react-router-dom";

const EditProfileForm = () => {
  const { user, userData, saveUserData } = useContext(UserContext);
  const [email, setEmail] = useState(user.email || "");
  const [username, setUsername] = useState(userData.username || "");
  const [bio, setBio] = useState(userData.bio || "");
  const [profilePicture, setProfilePicture] = useState(
    userData.profile_picture || ""
  );
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      email,
      username,
      bio,
      profile_picture: profilePicture,
    };

    saveUserData(updatedData);
    navigate("/profile");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          disabled
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Bio:
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
      </label>
      <label>
        Profile Picture URL:
        <input
          type="text"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
        />
      </label>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditProfileForm;
