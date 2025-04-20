import { useState, useEffect, useMemo, useCallback } from "react";
import GameCard from "./components/GameCard";
import Carousel from "react-material-ui-carousel";
import "./style.scss";
import { useGetScoresQuery } from "../features/api/apiSlice";
import { GameInterface } from "../shared/types";
import { Alert, AlertTitle, CircularProgress, Typography } from "@mui/material";

// Each GameCard has a fixed width of 8.5rem (136px at default 16px root font size)
const GAME_CARD_WIDTH = 8.5; // in rem
const MIN_CARD_SPACING = 1; // in rem, minimum space between cards
const CAROUSEL_PADDING = 2; // in rem, total padding on both sides

const getMaxGameCards = (windowWidth: number): number => {
  // Convert window width from pixels to rem (assuming 16px root font size)
  const windowWidthInRem = windowWidth / 16;
  
  // Calculate available width for cards (accounting for padding)
  const availableWidth = windowWidthInRem - CAROUSEL_PADDING;
  
  // Calculate how many cards can fit with minimum spacing
  const maxCards = Math.floor(availableWidth / (GAME_CARD_WIDTH + MIN_CARD_SPACING)) - 1;
  
  // Ensure we have at least 1 card and at most 7 cards
  return Math.max(1, Math.min(7, maxCards));
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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Debounce the resize handler to improve performance
  const debouncedHandleResize = useCallback(() => {
    let timeoutId: NodeJS.Timeout;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 150); // 150ms debounce delay
    };
  }, []);

  useEffect(() => {
    const handleResize = debouncedHandleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [debouncedHandleResize]);

  // Memoize the maxGameCards calculation
  const maxGameCards = useMemo(() => getMaxGameCards(windowWidth), [windowWidth]);

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

    // Create slides with maxGameCards number of cards per slide
    const gameCardSlides = [];
    for (let i = 0; i < cardsArray.length; i += maxGameCards) {
      gameCardSlides.push(
        <div className="game-card-slide-div" key={i}>
          {cardsArray.slice(i, i + maxGameCards)}
        </div>
      );
    }

    return <Carousel className="live-game-carousel">{gameCardSlides}</Carousel>;
  };

  return (
    <div
      style={{
        height: "15rem",
        backgroundColor: '#141414',
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
