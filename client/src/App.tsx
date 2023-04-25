import React, { useState, useEffect } from "react";
//import Home from "./views/home/Home";
import Navbar from "./sidebar/NavBar";
import Grid from "@mui/material/Grid/Grid";
import LiveScoreBar from "./scores/LiveScoreBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//import PlayerStats from "./playerStats/PlayerStats";
//import PlayerCard from "./shared/components/PlayerCard";
import Top10Chart from "./features/top10Chart/Top10Chart";
import { colors } from "@mui/material";
//import { statTypeMapping, statTypes } from "./shared/constants";

// black: '#090A0B',
// Eerie Black: '#141414'
// Smoky Black: '#12100E'
// Powder Blue: '#ACDDE7'
// Middle Blue Green: '#9AD5CA'
// Cerulean Crayola: '#06AED5'
// Powder Blue: #92AFD7
const theme = createTheme({
  custom: {
    blue: colors.blue[800],
    lightBlue: colors.blue[400],
    red: colors.red[800],
    lightRed: colors.red[400],
  },
  palette: {
    primary: {
      main: "#090A0B",
      // light: '#',
      // dark: '#',
      // contrastText: '#',
    },
    secondary: {
      main: "#fff",
      // light: '',
      // dark: '',
      // contrastText: '',
    },
  },
});

const App = () => {
  // device screen breakpoints for navbar and liveScoreBar
  const largeBreakPointsProps = {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item {...largeBreakPointsProps}>
          <Navbar />
        </Grid>
        <Grid item {...largeBreakPointsProps} style={{ marginBottom: "2rem" }}>
          <LiveScoreBar />
        </Grid>

        <Grid
          item
          {...largeBreakPointsProps}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid blue",
            padding: "1rem",
          }}
        >
          <Top10Chart />
        </Grid>

        {/* <Grid item style={{ border: "1px solid green", margin:'0 auto' }}>
          <Home />
        </Grid>

        <Grid item style={{ border: "1px solid red", margin:'0 auto' }}>
          <PlayerStats/>
        </Grid> */}
      </Grid>
    </ThemeProvider>
  );
};

export default App;
