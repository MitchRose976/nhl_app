import { useState, useEffect } from "react";
import { GameInterface } from "../../../shared/types";
import {
  formatHour,
  formatMinutes,
  getTimeZoneOffset,
} from "../../../shared/utils";

export interface GameStatus {
  status: "PREVIEW" | "LIVE" | "FINAL" | "POSTPONED";
  component: string;
}

export const useGameStatus = (game: GameInterface) => {
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    status: "PREVIEW",
    component: "PREVIEW",
  });

  useEffect(() => {
    const currentGameStatus = game.status.state;
    const isOT = game.scores.overtime;
    const isShootout = game.scores.shootout;

    const getStartTime = () => {
      const date = new Date(game.startTime);
      const hour = formatHour(date.getHours());
      const amOrPm = date.getHours() >= 12 ? "pm" : "am";
      const minute = formatMinutes(date.getMinutes());
      const timeZone = getTimeZoneOffset().timezone;
      return `${hour}:${minute}${amOrPm} ${timeZone}`;
    };

    switch (currentGameStatus) {
      case "PREVIEW":
        setGameStatus({ status: "PREVIEW", component: getStartTime() });
        break;
      case "LIVE":
        setGameStatus({
          status: "LIVE",
          component: `${game.status.progress?.currentPeriodOrdinal} - ${game.status.progress?.currentPeriodTimeRemaining.pretty}`,
        });
        break;
      case "FINAL":
        setGameStatus({
          status: "FINAL",
          component: `${isOT ? "FINAL (OT)" : isShootout ? "FINAL (SO)" : "FINAL"}`,
        });
        break;
      default:
        setGameStatus({ status: "POSTPONED", component: "POSTPONED" });
        break;
    }
  }, [game]);

  return gameStatus;
}; 