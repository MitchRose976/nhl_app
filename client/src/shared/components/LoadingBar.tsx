import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const LoadingBar = () => {
  return (
    <Box sx={{ width: "65%" }}>
      <LinearProgress
        color="secondary"
      />
    </Box>
  );
};

export default LoadingBar;
