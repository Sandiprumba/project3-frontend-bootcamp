import React, { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated && user) {
        try {
          console.log(isAuthenticated);
          console.log(user);
          const token = await getAccessTokenSilently();
          console.log(token);
          const response = await axios.get(
            `http://localhost:3001/user/${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.user) {
            setUserData(response.data.user);
          } else {
            const newUser = {
              email: user.email,
              username: user.name,
              profile_picture: user.picture,
              bio: "",
            };

            await axios.post(
              `http://localhost:3001/user/${user.email}`,
              newUser,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            setUserData(newUser);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUserData();
  }, [user, isAuthenticated, getAccessTokenSilently]);

  const saveUserData = async (updatedData) => {
    if (isAuthenticated) {
      try {
        const token = await getAccessTokenSilently();
        console.log(`Access Token: ${token}`);
        const { email, ...restData } = updatedData;
        const userId = userData.id;

        await axios.put(
          `http://localhost:3001/user/${userId}`,
          { email, ...restData },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserData((prevUserData) => ({
          ...prevUserData,
          ...updatedData,
        }));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <UserContext.Provider value={{ user, userData, saveUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
