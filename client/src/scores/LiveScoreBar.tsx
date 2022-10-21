import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid/Grid";
import GameCard from "./components/GameCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const LiveScoreBar = () => {
    
  const sxFlexBoxProps = {
    border: "1px solid blue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
  };

  const arrowProps = {
    xs: 1,
    sm: 1,
    md: 1,
    lg: 1,
    xl: 1,
    sx: { ...sxFlexBoxProps },
  };

  const gameBarProps = {
    xs: 10,
    sm: 10,
    md: 10,
    lg: 10,
    xl: 10,
  };

  return (
    <Grid container>
      <Grid item {...arrowProps}>
        <KeyboardArrowLeftIcon />
      </Grid>

      <Grid item {...gameBarProps}>
        <Container
          maxWidth={false}
          sx={{...sxFlexBoxProps}}
        >
          <GameCard />
        </Container>
      </Grid>

      <Grid item {...arrowProps}>
        <KeyboardArrowRightIcon />
      </Grid>
    </Grid>
  );
};

export default LiveScoreBar;
