import { Mail, Notifications } from "@mui/icons-material";
import { Avatar, Badge, Box, Hidden, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useValue } from "../../context/ContextProvider";
import useCheckToken from "../../hooks/useCheckToken";
import UserMenu from "./UserMenu";

const UserIcons = () => {
  useCheckToken();
  const {
    state: { currentUser },
  } = useValue();

  const [anchorUserMenu, setAnchorUserMenu] = useState(null);

  const styles = {
    icon: {
      color: "#cfcfcf",
      fontSize: "20px",
    },
  };
  return (
    <Box>
      <IconButton size="large" color="inherit">
        <Badge color="error" badgeContent={6}>
          <Mail style={styles.icon} />
        </Badge>
      </IconButton>
      <IconButton size="large" color="inherit">
        <Badge color="error" badgeContent={2}>
          <Notifications style={styles.icon} />
        </Badge>
      </IconButton>

      <Tooltip title="Open User Settings">
        <IconButton onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
          <Avatar src={currentUser?.photoURL} alt={currentUser?.name}>
            {currentUser?.name?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <UserMenu {...{ anchorUserMenu, setAnchorUserMenu }} />
    </Box>
  );
};

export default UserIcons;
