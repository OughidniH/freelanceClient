import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { AddLocationAlt, Bed, LocationOn } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import ClusterMap from "./map/ClusterMap";
import Rooms from "./rooms/Rooms";
import AddRoom from "./addRoom/AddRoom";
import Protected from "./protected/Protected";
import { useValue } from "../context/ContextProvider";

const HeroPage = () => {
  const {
    state: { section },
    dispatch,
  } = useValue();

  return (
    <div className="home-page">
      <div className="home-map">
        <ClusterMap />
      </div>
      <div className="home-rooms-container">
        <Rooms />
      </div>
    </div>
  );
};

export default HeroPage;
