import React, { useState, useEffect } from "react";
import Home from "./home/Home";
import Navbar from "./sidebar/NavBar";
import Grid from "@mui/material/Grid/Grid";
import LiveScoreBar from './scores/LiveScoreBar';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#34312D",
    },
  },
});

const App = () => {

  const navbarProps = {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  };

  const liveScoreBarProps = {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item {...navbarProps}>
          <Navbar />
        </Grid>
        <Grid item {...liveScoreBarProps}>
          <LiveScoreBar />
        </Grid>

        {/* <Grid item style={{ border: "1px solid green" }}>
          <Home />
        </Grid> */}
      </Grid>
    </ThemeProvider>
  );
};

export default App;
