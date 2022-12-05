import React, { useState, useEffect } from "react";
import Home from "./home/Home";
import Navbar from "./sidebar/NavBar";
import Grid from "@mui/material/Grid/Grid";
import LiveScoreBar from "./scores/LiveScoreBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import PlayerStats from "./playerStats/PlayerStats";
import PlayerCard from "./shared/components/PlayerCard";
import axios, { Axios } from "axios";

// black: '#090A0B',
// Eerie Black: '#141414'
// Smoky Black: '#12100E'
// Powder Blue: '#ACDDE7'
// Middle Blue Green: '#9AD5CA'
// Cerulean Crayola: '#06AED5'
const theme = createTheme({
  palette: {
    primary: {
      main: "#090A0B",
    },
    secondary: green,
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

  // useEffect(() => {
  //   const fetchTeams = async () => {
  //     const res = await axios.get(`http://localhost:7000/api/nhl-app`) 
  //   }
  // }, [])

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
            padding: '1rem'
          }}
        >
          <PlayerCard />
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
