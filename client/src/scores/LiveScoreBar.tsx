import React, { useState, useEffect } from "react";
import GameCard from "./components/GameCard";
import Carousel from "react-material-ui-carousel";
import "./style.scss";
import { useGetScoresQuery } from "../features/api/apiSlice";
import { GameInterface } from "../../../server/src/types";

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

  // render a GameCard for each game
  const renderGameCards2 = () => {
    let cardsArray: JSX.Element[] = [];
    scoresData &&
      scoresData[0].games.forEach((game: GameInterface, index: number) => {
        cardsArray.push(<GameCard key={index} game={game} />);
      });
    setGameCardsArray(cardsArray);
  };

  useEffect(() => {
    renderGameCards2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scoresData]);

  useEffect(() => {
    if (window.innerWidth > 1200) setMaxGameCards(6);
    else if (window.innerWidth > 990) setMaxGameCards(5);
    else if (window.innerWidth > 800) setMaxGameCards(4);
    else if (window.innerWidth > 600) setMaxGameCards(3);
    else if (window.innerWidth > 450) setMaxGameCards(2);
    else setMaxGameCards(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);

  return (
    <Carousel className="live-game-carousel">
      {gameCardsArray.splice(0, maxGameCards)}
      {/* {gameCardsArray[0]} */}
    </Carousel>
  );
};

export default LiveScoreBar;
