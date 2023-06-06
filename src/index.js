import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Profile from "./Components/User/Profile";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Auth0Provider } from "@auth0/auth0-react";
import UserProvider from "./Components/Usercontext/UserContext";
import Home from "./Components/Home";
import ProtectedRoute from "./Components/ProtectedRoute";
import SearchPage from "./Components/SearchPage";
import PhotoGallery from "./Components/Gallery/PhotoGallery";
import VideoGallery from "./Components/Gallery/VideoGallery";
import VideoUploader from "./Components/Gallery/VideoUploader";
import ItineraryDetails from "./Components/Itineraries/ItineraryDetails";
import Itineraries from "./Components/Itineraries/Itineraries";
import UploadItinerary from "./Components/Itineraries/UploadItinerary";
import PhotoUploader from "./Components/Gallery/PhotoUploader";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Auth0Provider
      domain="dev-yjwo0kgqimt8b5hc.us.auth0.com"
      clientId="cnOd50ihsyXHPAzsZDv9E0bUoyXy1EzC"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://hikemate/api",
        scope:
          "openid profile email name read:current_user update:current_user_metadata",
      }}
    >
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/profile" element={<Profile />} />

          <Route exact path="/home" element={<Home />} />

          <Route
            path="/searchpage"
            element={<ProtectedRoute element={SearchPage} />}
          />
          <Route
            path="/photo"
            element={<ProtectedRoute element={PhotoGallery} />}
          />
          <Route
            path="/uploadphoto"
            element={<ProtectedRoute element={PhotoUploader} />}
          />
          <Route
            path="/video"
            element={<ProtectedRoute element={VideoGallery} />}
          />
          <Route
            path="/videouploader"
            element={<ProtectedRoute element={VideoUploader} />}
          />
          <Route
            path="/itinerary"
            element={<ProtectedRoute element={Itineraries} />}
          />
          <Route
            path="/itinerary/:id"
            element={<ProtectedRoute element={ItineraryDetails} />}
          />
          <Route
            path="/uploaditinerary"
            element={<ProtectedRoute element={UploadItinerary} />}
          />
        </Routes>
      </UserProvider>
    </Auth0Provider>
  </BrowserRouter>
);
