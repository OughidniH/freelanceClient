import { Backdrop, CircularProgress, Box, Typography } from "@mui/material";
import React from "react";
import { useValue } from "../context/ContextProvider";

const Loading = () => {
  const {
    state: { loading },
  } = useValue();

  return (
    <Backdrop open={loading} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
      <Box textAlign="center">
        <img src="/images/ox-lg.png" alt="Logo" style={{ height: "100px" }} />

        <Typography variant="h6" color="#080154">
          Loading...
        </Typography>

        <CircularProgress sx={{ color: "#080154" }} />
      </Box>
    </Backdrop>
  );
};

export default Loading;
