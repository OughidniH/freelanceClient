import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { AddLocationAlt, Bed, LocationOn } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import ClusterMap from "./map/ClusterMap";
import Rooms from "./rooms/Rooms";
import AddRoom from "./addRoom/AddRoom";
import Protected from "./protected/Protected";
import { useValue } from "../context/ContextProvider";

const BottomNav = () => {
  const {
    state: { section },
    dispatch,
  } = useValue();
  const ref = useRef();
  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [section]);
  return (
    <div className="home-page">
      <div className="home-map">
        <ClusterMap />
      </div>
      <div className="home-rooms-container">
        <div className="home-rooms" ref={ref}>
          {
            {
              0: <Rooms />,
              1: (
                <Protected>
                  <AddRoom />
                </Protected>
              ),
            }[section]
          }
          <Paper
            elevation={3}
            sx={{
              position: "absolute",
              bottom: 0,
              right: "20%",
              zIndex: 2,
            }}
          >
            <BottomNavigation
              showLabels
              value={section}
              onChange={(e, newValue) =>
                dispatch({ type: "UPDATE_SECTION", payload: newValue })
              }
            >
              <BottomNavigationAction label="Propriété" icon={<Bed />} />
              <BottomNavigationAction
                label="Ajouter"
                icon={<AddLocationAlt />}
              />
            </BottomNavigation>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;

/*
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material";
import { AddLocationAlt, Bed, LocationOn } from "@mui/icons-material";
import { useEffect, useRef } from "react";
import ClusterMap from "./map/ClusterMap";
import Rooms from "./rooms/Rooms";
import AddRoom from "./addRoom/AddRoom";
import Protected from "./protected/Protected";
import { useValue } from "../context/ContextProvider";

const BottomNav = () => {
  const {
    state: { section },
    dispatch,
  } = useValue();
  const ref = useRef();
  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [section]);
  const styles = {
    bottomBar: {
      backgroundColor: "#00fbo7",
      borderRadius: "20px",
    },
    icon: {
      color: "rgba(4,0,48,0.95)",
      fontSize: "30px",
      marginRight: "5px",
    },
  };
  return (
    <Box sx={styles.bottomBar} ref={ref}>
      {
        {
          0: <ClusterMap />,
          1: <Rooms />,
          2: (
            <Protected>
              <AddRoom />
            </Protected>
          ),
        }[section]
      }
      <Paper
        elevation={3}
        sx={{
          position: "fixed",
          bottom: "10px",
          width: "300px",
          zIndex: 2,
          backgroundColor: "#00fb07",
          borderRadius: "15px",
        }}
      >
        <BottomNavigation
          showLabels
          value={section}
          onChange={(e, newValue) =>
            dispatch({ type: "UPDATE_SECTION", payload: newValue })
          }
        >
          <BottomNavigationAction
            sx={styles.icon}
            label="Map"
            icon={<LocationOn />}
          />
          <BottomNavigationAction label="Propriété" icon={<Bed />} />
          <BottomNavigationAction label="Ajouter" icon={<AddLocationAlt />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomNav;

*/
