import { Box } from "@mui/material";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import { useValue } from "../../../context/ContextProvider";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import Geocoder from "./Geocoder";

const AddLocation = () => {
  const {
    state: {
      location: { lng, lat },
      currentUser,
    },
    dispatch,
  } = useValue();
  const mapRef = useRef();

  useEffect(() => {
    const storedLocation = JSON.parse(
      localStorage.getItem(currentUser.id)
    )?.location;

    if (
      !lng &&
      !lat &&
      (!storedLocation || isLocationDataExpired(storedLocation))
    ) {
      // Replace 'YOUR_MAPBOX_ACCESS_TOKEN' with your actual Mapbox access token
      const mapboxAccessToken = process.env.REACT_APP_MAP_TOKEN;
      const geocodingApiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places.json?proximity=-74.0060,40.7128&access_token=${mapboxAccessToken}`;

      fetch(geocodingApiUrl)
        .then((response) => response.json())
        .then((data) => {
          const [longitude, latitude] = data.features[0].center;
          const newLocation = { lng: longitude, lat: latitude };
          dispatch({ type: "UPDATE_LOCATION", payload: newLocation });
          localStorage.setItem(
            currentUser.id,
            JSON.stringify({ location: newLocation, timestamp: Date.now() })
          );
        })
        .catch((error) => {
          console.error("Error fetching geolocation data:", error);
        });
    }
  }, []);

  useEffect(() => {
    if ((lng || lat) && mapRef.current) {
      mapRef.current.flyTo({
        center: [lng, lat],
      });
    }
  }, [lng, lat]);
  return (
    <Box className="addroom-map-container">
      <ReactMapGL
        ref={mapRef}
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 5,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker
          latitude={lat}
          longitude={lng}
          draggable
          onDragEnd={(e) =>
            dispatch({
              type: "UPDATE_LOCATION",
              payload: { lng: e.lngLat.lng, lat: e.lngLat.lat },
            })
          }
        />
        <NavigationControl position="bottom-right" />
        <GeolocateControl
          position="top-left"
          trackUserLocation
          onGeolocate={(e) =>
            dispatch({
              type: "UPDATE_LOCATION",
              payload: { lng: e.coords.longitude, lat: e.coords.latitude },
            })
          }
        />
        <Geocoder />
      </ReactMapGL>
    </Box>
  );
};

// Check if the stored location data is expired (e.g., older than 24 hours)
const isLocationDataExpired = (storedLocation) => {
  const expirationTime = 5 * 60 * 60 * 1000; // 24 hours in milliseconds
  return Date.now() - storedLocation.timestamp > expirationTime;
};

export default AddLocation;
