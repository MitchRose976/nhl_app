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
import { Divider, Modal } from "@mui/material";
import GameModal from "../../features/gameModal/GameModal";
import "../../shared/style.scss";

interface GameCardProps {
  game: GameInterface;
}

const GameCard = ({ game }: GameCardProps) => {
  const [gameStatus, setGameStatus] = useState({
    status: "PREVIEW",
    component: "PREVIEW",
  });
  const [openModal, setOpenModal] = useState<boolean>(false);

  const getStartTime = () => {
    const date = new Date(game.startTime);
    const hour = formatHour(date.getHours());
    const amOrPm = date.getHours() >= 12 ? "pm" : "am";
    const minute = formatMinutes(date.getMinutes());
    const timeZone = getTimeZoneOffset().timezone;
    return `${hour}:${minute}${amOrPm} ${timeZone}`;
  };

  useEffect(() => {
    const currentGameStatus = game.status.state;
    const isOT = game.scores.overtime;
    const isShootout = game.scores.shootout;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTeamLogo = (svgString: string, width: number, height: number) => {
    return svgString !== "" ? (
      <svg width={width} height={height}>
        <image href={`${svgString}`} width={width} height={height} />
      </svg>
    ) : null;
  };

  const renderScoreLine = () => {
    return (
      <>
        {renderTeamLogo(formGetTeamLogoUrl(game.teams.home.id), 40, 40)}
        <strong>
          {game.scores[game.teams.home.abbreviation]} :{" "}
          {game.scores[game.teams.away.abbreviation]}
        </strong>{" "}
        {renderTeamLogo(formGetTeamLogoUrl(game.teams.away.id), 40, 40)}
      </>
    );
  };

  const renderMatchupInfo = () => {
    const headToHeadStats = game.currentStats;
    if (headToHeadStats.playoffSeries) {
      return (
        <Typography sx={{ fontSize: "0.7rem", fontWeight: "500" }}>
          {`Rd ${game.currentStats.playoffSeries.round} - ${
            game.teams.home.abbreviation
          }:${
            game.currentStats.playoffSeries.wins[game.teams.home.abbreviation]
          }   ${game.teams.away.abbreviation}:${
            game.currentStats.playoffSeries.wins[game.teams.away.abbreviation]
          }`}
        </Typography>
      );
    } else {
      return (
        <div className="flex-box-center">
          <Typography
            sx={{
              fontSize: "0.65rem",
              fontWeight: "500",
              paddingRight: "0.5rem",
            }}
          >
            {`(${headToHeadStats.records[game.teams.home.abbreviation].wins}-${
              headToHeadStats.records[game.teams.home.abbreviation].losses
            }-${headToHeadStats.records[game.teams.home.abbreviation].ot})`}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.65rem",
              fontWeight: "500",
              paddingLeft: "0.5rem",
            }}
          >
            {`(${headToHeadStats.records[game.teams.away.abbreviation].wins}-${
              headToHeadStats.records[game.teams.away.abbreviation].losses
            }-${headToHeadStats.records[game.teams.away.abbreviation].ot})`}
          </Typography>
        </div>
      );
    }
  };

  const handleClick = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  console.log(game);
  return game ? (
    <Card raised sx={gameCardSXProps}>
      <Typography
        sx={{ paddingTop: "10px", paddingBottom: "0" }}
        style={{ fontWeight: "bold" }}
      >
        {gameStatus.component}
      </Typography>
      {/* Need a redux variable to read if it is intermission or not */}
      {gameStatus.status === "LIVE" ? (
        <LoadingBar />
      ) : (
        <Divider sx={{ width: "100%", margin: "0.5rem 0" }} />
      )}
      <CardContent sx={gameCardContentSXProps} style={{ padding: 0 }}>
        {renderScoreLine()}
      </CardContent>
      <CardContent style={{ padding: 0 }}>{renderMatchupInfo()}</CardContent>
      <CardActions>
        <Button
          onClick={handleClick}
          variant="contained"
          color="primary"
          size="small"
          sx={{ padding: "2px 5px" }}
        >
          More
        </Button>
        <Modal open={openModal} onClose={handleClose} sx={{overflow: 'scroll'}}>
          <GameModal game={game} status={gameStatus} />
        </Modal>
      </CardActions>
    </Card>
  ) : null;
};

export default GameCard;
