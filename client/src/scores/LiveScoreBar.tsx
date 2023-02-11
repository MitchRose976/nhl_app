import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid/Grid";
import GameCard from "./components/GameCard";
import Carousel from "react-material-ui-carousel";
import "./style.scss";

const LiveScoreBar = () => {
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  };
  // states
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [maxGameCards, setMaxGameCards] = useState(0);
  const [gameCardsArray, setGameCardsArray] = useState<JSX.Element[]>([]);

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

    // still need to have total amount of cards
    // parent array
    let gameCardsArray = [];
    let singleSlideOfGameCardsArray = [];
    for (let i = 0; i < maxGameCards; i++) {
      singleSlideOfGameCardsArray.push(
        <Grid item key={i}>
          <GameCard />
        </Grid>
      );
    }
    const slide = (
      // change key to proper unique key. Maybe numOfGames/maxGameCards = key? or some sort of state to provide keys
      <div className="game-card-slide-div" key={1}>
        {singleSlideOfGameCardsArray}
      </div>
    );
    gameCardsArray.push(slide);
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
    <Carousel className="live-game-carousel">
      {gameCardsArray.map((gameCard) => gameCard)}
    </Carousel>
  );
};

export default LiveScoreBar;
