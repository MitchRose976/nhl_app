import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const LoadingBar = () => {
  return (
    <Box sx={{ width: "65%", margin: "0.4rem 0" }}>
      <LinearProgress
        color='success'
      />
    </Box>
  );
};

export default LoadingBar;
