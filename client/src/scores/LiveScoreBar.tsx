import { useState, useEffect } from "react";
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

const ErrorState = () => (
  <div className="game-card-slide-div">
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      <strong>Failed to fetch data</strong>
    </Alert>
  </div>
);

const LiveScoreBar = () => {
  const {
    data: scoresData,
    isLoading,
    isError,
    isSuccess,
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

  const renderContent = () => {
    if (isLoading) return <CircularProgress sx={{ color: "secondary.main" }} />;
    if (isError) return <ErrorState />;
    if (!isSuccess || !scoresData || scoresData.length === 0)
      return <Typography sx={{ color: "#fff" }}>No Games Today</Typography>;

    const cardsArray = scoresData[0].games.map(
      (game: GameInterface, index: number) => (
        <GameCard key={index} game={game} />
      )
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

  return (
    <div
      style={{
        height: "15rem",
        backgroundColor: '#141414',
        borderBottom: "1rem solid #c60c30",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {renderContent()}
    </div>
  );
};

export default LiveScoreBar;
