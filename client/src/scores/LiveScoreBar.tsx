import React, { useState, useEffect } from "react";
import GameCard from "./components/GameCard";
import Carousel from "react-material-ui-carousel";
import "./style.scss";
import { useGetScoresQuery } from "../features/api/apiSlice";
import { GameInterface } from "../shared/types";
import { Alert, AlertTitle, CircularProgress, Typography } from "@mui/material";
import { splitArrayIntoEqualParts } from "../shared/utils";

const getMaxGameCards = (windowWidth: number): number => {
  if (windowWidth > 1466) return 2;
  if (windowWidth > 990) return 3;
  if (windowWidth > 800) return 4;
  if (windowWidth > 600) return 5;
  if (windowWidth > 450) return 6;
  return 7;
};

const NoGamesMessage = () => (
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

const LoadingState = () => (
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
);

const ErrorState = () => (
  <div className="game-card-slide-div">
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      <strong>Error while fetching data</strong>
    </Alert>
  </div>
);

const LiveScoreBar = () => {
  const {
    data: scoresData,
    isLoading,
    isSuccess,
    isError,
  } = useGetScoresQuery();

  const [maxGameCards, setMaxGameCards] = useState(
    getMaxGameCards(window.innerWidth)
  );

  useEffect(() => {
    const handleWindowResize = () => {
      setMaxGameCards(getMaxGameCards(window.innerWidth));
    };

    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;
  if (!isSuccess || !scoresData || scoresData.length === 0)
    return <NoGamesMessage />;

  const cardsArray = scoresData[0].games.map(
    (game: GameInterface, index: number) => <GameCard key={index} game={game} />
  );

  const gameCardSlides = splitArrayIntoEqualParts(cardsArray, maxGameCards)
    .map((arrayOfGames, index) => (
      <div className="game-card-slide-div" key={index}>
        {arrayOfGames}
      </div>
    ))
    .filter((gameCard) => gameCard.props.children.length > 0);

  return <Carousel className="live-game-carousel">{gameCardSlides}</Carousel>;
};

export default LiveScoreBar;
