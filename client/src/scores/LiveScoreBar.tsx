import React, { useState, useEffect } from "react";
import GameCard from "./components/GameCard";
import Carousel from "react-material-ui-carousel";
import "./style.scss";
import { useGetScoresQuery } from "../features/api/apiSlice";
import { GameInterface } from "../../../server/src/types";
import { Alert, AlertTitle, CircularProgress } from "@mui/material";
import { splitArrayIntoEqualParts } from "../shared/utils";

const LiveScoreBar = () => {
  const {
    data: scoresData,
    isLoading,
    isSuccess,
    isError,
  } = useGetScoresQuery();
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  };
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [maxGameCards, setMaxGameCards] = useState(1);
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

  useEffect(() => {
    if (window.innerWidth > 1200) setMaxGameCards(1);
    else if (window.innerWidth > 990) setMaxGameCards(2);
    else if (window.innerWidth > 800) setMaxGameCards(3);
    else if (window.innerWidth > 600) setMaxGameCards(4);
    else if (window.innerWidth > 450) setMaxGameCards(5);
    else setMaxGameCards(6);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);

  const getGameCardSlides = () => {
    // make a game card for each game of the day
    let cardsArray: JSX.Element[] = [];
    scoresData &&
      scoresData[0].games.forEach((game: GameInterface, index: number) => {
        cardsArray.push(<GameCard key={index} game={game} />);
      });
    // split array into equal parts based on maxGameCards and form a slide
    const arrayOfGameCardSlides = splitArrayIntoEqualParts(
      cardsArray,
      maxGameCards
    ).map((arrayOfGames, index) => (
      <div className="game-card-slide-div" key={index}>
        {arrayOfGames}
      </div>
    ));
    setGameCardsArray(arrayOfGameCardSlides);
  };

  useEffect(() => {
    getGameCardSlides();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scoresData, maxGameCards]);

  return (
    <>
      {isLoading ? (
        <div className="game-card-slide-div">
          <CircularProgress />
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
