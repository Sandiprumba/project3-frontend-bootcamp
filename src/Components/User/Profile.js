import React, { useState, useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileDisplay from "./ProfileDisplay";
import ProfileEdit from "./EditProfile";
import { UserContext } from "../Usercontext/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { isAuthenticated, loginWithRedirect, user, getAccessTokenSilently } =
    useAuth0();
  const [editing, setEditing] = useState(false);
  const { userData } = useContext(UserContext);
  const [displayProfile, setDisplayProfile] = useState(true);

  const navigate = useNavigate();

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
  };

  const handleLogin = async () => {
    await loginWithRedirect();
  };

  const displayToken = async () => {
    const token = await getAccessTokenSilently();
    console.log(`Access Token, ${token}`);
  };

  useEffect(() => {
    setDisplayProfile(!editing);
  }, [editing]);

  return (
    <div>
      {isAuthenticated ? (
        editing ? (
          <ProfileEdit user={user} onSave={handleSave} />
        ) : (
          <div>
            {displayProfile && userData ? (
              <ProfileDisplay user={user} onEdit={handleEditClick} />
            ) : (
              <p>Loading...</p>
            )}
          </div>
        )
      ) : (
        <div>
          <p>Please log in to view the profile.</p>
          <button onClick={handleLogin}>Log In</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
