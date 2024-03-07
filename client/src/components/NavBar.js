import React, { useState } from "react";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Hidden,
  IconButton,
  Toolbar,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { TbLogin2 } from "react-icons/tb";

import { useValue } from "../context/ContextProvider";
import UserIcons from "./user/UserIcons";
import Sidebar from "./sidebar/Sidebar";

const NavBar = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  const [isOpen, setIsOpen] = useState(false);
  const { containerRef } = useValue();

  const styles = {
    box: {
      display: "flex",
      alignItems: "center",
    },
    iconButton: {
      marginRight: "5px",
    },
    text: {
      color: "#cfcfcf",
      marginRight: "5px",
      fontSize: "18px",
    },
    icon: {
      color: "#cfcfcf",
      fontSize: "20px",
    },
    nav: {
      alignItems: "spaceBetween",
    },
    searchBar: {
      width: "auto",
      margin: "0 10px",
    },
    searchBarMob: {
      position: "fixed",
      top: "60px",
      right: 0,
      with: "200px",
    },
    logo: {
      height: "30px",
      marginRight: "auto",
      marginLeft: 0,
    },
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(4,0,48,0.9)",
          top: 0,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={styles.nav} disableGutters>
            <Box sx={{ mr: 1 }}>
              <IconButton
                size="large"
                color="inherit"
                onClick={() => setIsOpen(true)}
              >
                <Menu />
                
              </IconButton>
            </Box>
            <Hidden smDown>
              <img src="/images/logo.png" alt="Logo" style={styles.logo} />
            </Hidden>
            <Hidden smUp>
              <img src="/images/hicon.png" alt="Logo" style={styles.logo} />
            </Hidden>
            <Hidden smDown>
              <Box sx={styles.searchBar}>
                <Box ref={containerRef}></Box>
              
              </Box>
            </Hidden>
            <Hidden smUp>
              <div className="searchBarMob">
                <Box ref={containerRef}></Box>
              </div>
            </Hidden>

            {!currentUser ? (
              <Button
                color="inherit"
                startIcon={<TbLogin2 />}
                onClick={() => dispatch({ type: "OPEN_LOGIN" })}
              >
                <Hidden smDown>Se Connecter</Hidden>
              </Button>
            ) : (
              <UserIcons />
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      <Sidebar {...{ isOpen, setIsOpen }} />
    </>
  );
};

export default NavBar;
