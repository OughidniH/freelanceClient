import { Box, Divider, Drawer, IconButton, styled } from "@mui/material";
import { FcAdvertising } from "react-icons/fc";

import { ChevronLeft } from "@mui/icons-material";

import { FaCartArrowDown } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import { Link } from "react-router-dom";

import { FaInfoCircle } from "react-icons/fa";
import { IoIosHelpCircle, IoMdHome } from "react-icons/io";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: "#fff",
  justifyContent: "space-between",
  backgroundColor: "#040030f2",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  zIndex: 3,
}));

const BlurredBackground = styled("div")({
  backdropFilter: "blur(5px)",
  backgroundColor: "#5519fa1a", // Adjust the color and opacity as needed
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

const TransparentDrawer = styled(Drawer)({
  "& .MuiDrawer-paper": {
    backgroundColor: "transparent",
  },
});

const Sidebar = ({ isOpen, setIsOpen }) => {
  const styles = {
    box: {
      alignItems: "center",
      backgroundColor: "#dac4ffbb",
      zIndex: 4,
      margin: "1px 0",
      cursor: "pointer",
    },
    iconButton: {
      marginRight: "5px",
    },
    text: {
      color: "rgba(4,0,48,0.95)",
      marginRight: "5px",
      fontSize: "18px",
    },
    icon: {
      color: "rgba(4,0,48,0.95)",
      fontSize: "20px",
      marginRight: "5px",
    },
    logo: {
      height: "30px",
      marginRight: "auto",
      marginLeft: 0,
    },
    divider: {
      paddingTop: "20px",
    },
  };

  return (
    <TransparentDrawer variant="persistent" hideBackdrop={true} open={isOpen}>
      <BlurredBackground />
      <DrawerHeader>
        <img src="/images/logo.png" alt="Logo" style={styles.logo} />
        <IconButton sx={{ color: "#fff" }} onClick={() => setIsOpen(false)}>
          <ChevronLeft fontSize="large" />
        </IconButton>
      </DrawerHeader>
      <Divider sx={styles.divider} />
      <Box sx={styles.box}>
        <Link to="/">
          <IconButton size="large" color="inherit" sx={styles.iconButton}>
            <IoMdHome style={styles.icon} />
            <span style={styles.text}>Accueil</span>
          </IconButton>
        </Link>
      </Box>
      <Box sx={styles.box}>
        <Link to="/marketplace">
          <IconButton size="large" color="inherit" sx={styles.iconButton}>
            <FaCartArrowDown style={styles.icon} />
            <span style={styles.text}>Marketplace</span>
          </IconButton>
        </Link>
      </Box>

      <Box sx={styles.box}>
        <Link to="/works">
          <IconButton size="large" color="inherit" sx={styles.iconButton}>
            <MdWorkHistory style={styles.icon} />
            <span style={styles.text}>Freelance</span>
          </IconButton>
        </Link>
      </Box>
      <Box sx={styles.box}>
        <Link to={"/dashboard"}>
          <IconButton size="large" color="inherit" sx={styles.iconButton}>
            <FcAdvertising style={styles.icon} />
            <span style={styles.text}>Advertise</span>
          </IconButton>
        </Link>
      </Box>
      <Box sx={styles.box}>
        <IconButton size="large" color="inherit" sx={styles.iconButton}>
          <FaInfoCircle style={styles.icon} />
          <span style={styles.text}>Aprendre</span>
        </IconButton>
      </Box>
      <Box sx={styles.box}>
        <IconButton size="large" color="inherit" sx={styles.iconButton}>
          <IoIosHelpCircle style={styles.icon} />
          <span style={styles.text}>Aide</span>
        </IconButton>
      </Box>
    </TransparentDrawer>
  );
};

export default Sidebar;

/*
import { Box, Drawer, IconButton, styled, Typography } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import PriceSlider from "./PriceSlider";
import { useValue } from "../../context/ContextProvider";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { containerRef } = useValue();
  return (
    <Drawer variant="persistent" hideBackdrop={true} open={isOpen}>
      <DrawerHeader>
        <Typography>Apply Search or Filter:</Typography>
        <IconButton onClick={() => setIsOpen(false)}>
          <ChevronLeft fontSize="large" />
        </IconButton>
      </DrawerHeader>
      <Box sx={{ width: 240, p: 3 }}>
        <Box ref={containerRef}></Box>
        <PriceSlider />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
*/
