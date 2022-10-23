import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid/Grid";
import GameCard from "./components/GameCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { scoreBarArrowSXProps } from "./styles";

const LiveScoreBar = () => {

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  };
  // states
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [maxGameCards, setMaxGameCards] = useState(0);
  const [gameCardsArray, setGameCardsArray] = useState<JSX.Element[]>([])

  const arrowProps = {
    xs: 1,
    sm: 1,
    md: 1,
    lg: 1,
    xl: 1,
    sx: scoreBarArrowSXProps,
  };

  const gameBarProps = {
    xs: 10,
    sm: 10,
    md: 10,
    lg: 10,
    xl: 10,
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const renderGameCards = () => {
    // should grab array of GameCards based on how many games are being played, split them to an even amount of rows based on max amount that can be displayed in available space
    let gameCardsArray = [];
    for (let i = 0; i < maxGameCards; i++) {
      gameCardsArray.push(
        <Grid item>
          <GameCard />
        </Grid>
      );
    }
    setGameCardsArray(gameCardsArray);
  };

  useEffect(() => {
    if (window.innerWidth > 1200) setMaxGameCards(6);
    else if (window.innerWidth > 990) setMaxGameCards(5);
    else if (window.innerWidth > 800) setMaxGameCards(4);
    else if (window.innerWidth > 600) setMaxGameCards(3);
    else if (window.innerWidth > 450) setMaxGameCards(2);
    else setMaxGameCards(1);
    renderGameCards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);

  return (
    <Grid container wrap='nowrap' sx={{backgroundColor: '#141414'}}>
      <Grid item {...arrowProps}>
        <KeyboardArrowLeftIcon sx={{color: 'white'}}/>
      </Grid>

      <Grid item {...gameBarProps}>
        <Grid
          container
          item
          spacing={2}
          wrap="nowrap"
          sx={{ padding: "0.5rem", justifyContent: "center" }}
        >
          {gameCardsArray.map((gameCard) => gameCard)}
        </Grid>
      </Grid>

      <Grid item {...arrowProps}>
        <KeyboardArrowRightIcon sx={{color: 'white'}}/>
      </Grid>
    </Grid>
  );
};

export default LiveScoreBar;
