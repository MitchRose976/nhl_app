import React, { useState, useEffect } from "react";
import GameCard from "./components/GameCard";
import Carousel from "react-material-ui-carousel";
import "./style.scss";
import { useGetScoresQuery } from "../features/api/apiSlice";
import { GameInterface } from "../shared/types";
import { Alert, AlertTitle, CircularProgress, Typography } from "@mui/material";
import { getWindowSize, splitArrayIntoEqualParts } from "../shared/utils";

const LiveScoreBar = () => {
  const {
    data: scoresData,
    isLoading,
    isSuccess,
    isError,
  } = useGetScoresQuery();

  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [maxGameCards, setMaxGameCards] = useState(1);
  const [gameCardsArray, setGameCardsArray] = useState<
    JSX.Element[] | JSX.Element
  >([]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth > 1466) setMaxGameCards(2);
    else if (window.innerWidth > 1466) setMaxGameCards(2);
    else if (window.innerWidth > 990) setMaxGameCards(3);
    else if (window.innerWidth > 800) setMaxGameCards(4);
    else if (window.innerWidth > 600) setMaxGameCards(5);
    else if (window.innerWidth > 450) setMaxGameCards(6);
    else setMaxGameCards(7);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);

  const getGameCardSlides = () => {
    // make a game card for each game of the day
    if (isSuccess && scoresData && scoresData.length > 0) {
      const cardsArray = scoresData[0].games.map(
        (game: GameInterface, index: number) => (
          <GameCard key={index} game={game} />
        )
      );

      // split array into equal parts based on maxGameCards and form a slide
      const arrayOfGameCardSlides = splitArrayIntoEqualParts(
        cardsArray,
        maxGameCards
      ).map((arrayOfGames, index) => (
        <div className="game-card-slide-div" key={index}>
          {arrayOfGames}
        </div>
      ));

      setGameCardsArray(
        arrayOfGameCardSlides.filter(
          (gameCard) => gameCard.props.children.length > 0
        )
      );
    } else {
      setGameCardsArray(
        <div
          className="game-card-slide-div"
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            marginTop: "1rem",
            height: "9rem",
          }}
        >
          <Typography sx={{ color: "#fff" }}>No Games Today</Typography>
        </div>
      );
    }
  };

  useEffect(() => {
    getGameCardSlides();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scoresData, maxGameCards]);

  return (
    <>
      {isLoading ? (
        <div
          className="game-card-slide-div"
          style={{
            borderBottom: "1rem solid #c60c30",
            height: "12.5rem",
            backgroundColor: "#141414",
            padding: "0.5rem, 0.5rem, 0, 0.5rem",
            marginTop: "0",
          }}
        >
          <CircularProgress sx={{ color: "secondary.main" }} />
        </div>
      ) : null}
      {isError ? (
        <div className="game-card-slide-div">
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>Error while fetching data</strong>
          </Alert>
        </div>
      ) : null}
      {isSuccess && scoresData ? (
        <Carousel className="live-game-carousel">{gameCardsArray}</Carousel>
      ) : null}
    </>
  );
};

export default LiveScoreBar;
