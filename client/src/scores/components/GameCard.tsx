import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LoadingBar from "../../shared/components/LoadingBar";
import { gameCardSXProps, gameCardContentSXProps } from "../styles";
import { GameInterface } from "../../../../server/src/types";
import {
  formatHour,
  formatMinutes,
  formGetTeamLogoUrl,
  getTimeZoneOffset,
} from "../../shared/utils";
import { Divider } from "@mui/material";

interface GameCardProps {
  game: GameInterface;
}

const GameCard = ({ game }: GameCardProps) => {
  const [gameStatus, setGameStatus] = useState({
    status: "PREVIEW",
    component: "PREVIEW",
  });

  const getStartTime = () => {
    const date = new Date(game.startTime);
    const hour = formatHour(date.getHours());
    const amOrPm = date.getHours() >= 12 ? 'pm' : 'am';
    const minute = formatMinutes(date.getMinutes());
    const timeZone = getTimeZoneOffset().timezone;
    return `${hour}:${minute}${amOrPm} ${timeZone}`;
  };

  // const getGameStatus = () => {
  //   const currentGameStatus = game.status.state;
  //   if (currentGameStatus === "PREVIEW") {
  //     // setGameStatus('PREVIEW');
  //     // return getStartTime();
  //     setGameStatus({ status: "PREVIEW", component: getStartTime() });
  //   } else if (currentGameStatus === "LIVE") {
  //     // setGameStatus('LIVE');
  //     // return `${game.status.progress?.currentPeriodOrdinal} - ${game.status.progress?.currentPeriodTimeRemaining.pretty}`;
  //     setGameStatus({
  //       status: "LIVE",
  //       component: `${game.status.progress?.currentPeriodOrdinal} - ${game.status.progress?.currentPeriodTimeRemaining.pretty}`,
  //     });
  //   } else if (currentGameStatus === "FINAL") {
  //     // setGameStatus('FINAL');
  //     // return `FINAL`;
  //     setGameStatus({ status: "FINAL", component: "FINAL" });
  //   } else {
  //     setGameStatus({ status: "POSTPONED", component: "POSTPONED" });
  //     //return "POSTPONED";
  //   }
  // };

  useEffect(() => {
    const currentGameStatus = game.status.state;
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
        setGameStatus({ status: "FINAL", component: "FINAL" });
        break;
      default:
        setGameStatus({ status: "POSTPONED", component: "POSTPONED" });
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTeamLogo = (svgString: string) => {
    return svgString !== "" ? (
      <svg width="40" height="40">
        <image
          href={`${svgString}`}
          width="40"
          height="40"
        />
      </svg>
    ) : null;
  };

  const renderScoreLine = () => {
    return (
      <>
        {renderTeamLogo(formGetTeamLogoUrl(game.teams.home.id))}
        <strong>
          {game.scores[game.teams.home.abbreviation]} :{" "}
          {game.scores[game.teams.away.abbreviation]}
        </strong>{" "}
        {renderTeamLogo(formGetTeamLogoUrl(game.teams.away.id))}
      </>
    );
  };

  return game ? (
    <Card raised sx={gameCardSXProps}>
      <Typography
        sx={{ paddingTop: "10px", paddingBottom: "0" }}
        style={{ fontWeight: "bold" }}
      >
        {gameStatus.component}
      </Typography>
      {/* Need a redux variable to read if it is intermission or not */}
      {gameStatus.status === "LIVE" ? <LoadingBar /> : <Divider sx={{ width:'100%', margin: '0.5rem 0' }}/>}
      <CardContent sx={gameCardContentSXProps} style={{ padding: 0 }}>
        {renderScoreLine()}
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{ padding: "2px 5px" }}
        >
          More
        </Button>
      </CardActions>
    </Card>
  ) : null;
};

export default GameCard;
