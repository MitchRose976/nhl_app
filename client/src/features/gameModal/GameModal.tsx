import React from "react";
import {
  Box,
  Divider,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { GameInterface } from "../../../../server/src/types";
import { formGetTeamLogoUrl } from "../../shared/utils";
import "../../shared/style.scss";
import { GAME_STATS_TYPES } from "../../shared/constants";

interface GameModalProps {
  game: GameInterface;
  status: { status: string; component: string };
}

const GameModal = ({ game, status }: GameModalProps) => {
  const awayTeam = game.teams.away.abbreviation;
  const homeTeam = game.teams.home.abbreviation;
  
  const renderTeamLogo = (svgString: string, width: number, height: number) => {
    return svgString !== "" ? (
      <svg width={width} height={height}>
        <image href={`${svgString}`} width={width} height={height} />
      </svg>
    ) : null;
  };

  const renderScoreLine = () => {
    return (
      <div className="flex-box-center">
        <div className="flex-box-center" style={{ padding: "0 1rem" }}>
          {renderTeamLogo(formGetTeamLogoUrl(game.teams.home.id), 60, 60)}
          <Typography sx={{ fontSize: "2rem", paddingLeft: "2rem" }}>
            {game.scores[homeTeam]}
          </Typography>
        </div>
        <div>
          <Typography sx={{ fontSize: "2rem" }}>:</Typography>
        </div>
        <div className="flex-box-center" style={{ padding: "0 1rem" }}>
          <Typography sx={{ fontSize: "2rem", paddingRight: "2rem" }}>
            {game.scores[awayTeam]}
          </Typography>
          {renderTeamLogo(formGetTeamLogoUrl(game.teams.away.id), 60, 60)}
        </div>
      </div>
    );
  };

  const renderMatchupInfo = () => {
    const headToHeadStats = game.currentStats;
    if (headToHeadStats.playoffSeries) {
      return (
        <Typography sx={{ fontSize: "0.7rem", fontWeight: "500" }}>
          {`Rd ${game.currentStats.playoffSeries.round} - ${homeTeam}:${game.currentStats.playoffSeries.wins[homeTeam]}   ${awayTeam}:${game.currentStats.playoffSeries.wins[awayTeam]}`}
        </Typography>
      );
    } else {
      return (
        <div className="flex-box-center">
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "500",
              paddingRight: "4rem",
            }}
          >
            {`(${headToHeadStats.records[homeTeam].wins}-${headToHeadStats.records[homeTeam].losses}-${headToHeadStats.records[homeTeam].ot})`}
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "500",
              paddingLeft: "4rem",
            }}
          >
            {`(${headToHeadStats.records[awayTeam].wins}-${headToHeadStats.records[awayTeam].losses}-${headToHeadStats.records[awayTeam].ot})`}
          </Typography>
        </div>
      );
    }
  };

  const renderGameStatsInfo = () => {
    return GAME_STATS_TYPES.map(({ statType, label }, index) => {
      return (
        <TableRow
          key={statType}
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.9rem",
          }}
        >
          <Box>{`${
            statType === "powerPlay"
              ? game.gameStats[statType][homeTeam].goals
              : statType === "faceOffWinPercentage"
              ? Math.round(game.gameStats[statType][homeTeam]) + "%"
              : game.gameStats[statType][homeTeam]
          }`}</Box>
          <Typography sx={{ fontSize: "0.8rem" }}>{label}</Typography>
          <Box>{`${
            statType === "powerPlay"
              ? game.gameStats[statType][awayTeam].goals
              : statType === "faceOffWinPercentage"
              ? Math.round(game.gameStats[statType][awayTeam]) + "%"
              : game.gameStats[statType][awayTeam]
          }`}</Box>
        </TableRow>
      );
    });
  };

  const renderGoalsScored = () => {
    type PlayerInfoType = {
      player: string;
      playerId: number;
      seasonTotal?: number;
    };
    type GoalType = {
      team: string;
      period: string;
      scorer: PlayerInfoType;
      sec: number;
      min: number;
      assists: PlayerInfoType[];
      strength?: string;
      emptyNet?: boolean;
    };

    const renderGoalDetails = (goal: GoalType) => {
      const scoringTeamAbbreviation = goal.team;
      const scoringTeamID =
        game.teams.home.abbreviation === scoringTeamAbbreviation
          ? game.teams.home.id
          : game.teams.away.id;
      return (
        <div
          style={{
            padding: "0.3rem 0",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>{renderTeamLogo(formGetTeamLogoUrl(scoringTeamID), 30, 30)}</div>
          <Typography sx={{ fontSize: "0.75rem", marginLeft: "0.3rem" }}>
            {`${goal.min}:${goal.sec > 9 ? goal.sec : "0" + goal.sec} - ${
              goal.scorer.player
            } (${goal.scorer.seasonTotal}) ${
              goal.assists.length > 0 ? "assisted by: " : ""
            } ${
              goal.assists.length > 0
                ? goal.assists.map(
                    (player: PlayerInfoType) =>
                      ` ${player.player} (${player.seasonTotal})`
                  )
                : "unassisted"
            }`}
          </Typography>
        </div>
      );
    };

    const firstPeriodGoals = game.goals.filter(
      (goal: GoalType) => goal.period === "1"
    );
    const secondPeriodGoals = game.goals.filter(
      (goal: GoalType) => goal.period === "2"
    );
    const thirdPeriodGoals = game.goals.filter(
      (goal: GoalType) => goal.period === "3"
    );
    const overTimeGoals = game.goals.filter(
      (goal: GoalType) => goal.period === "OT"
    );

    const NoGoalsMessage = () => {
      return (
        <Typography
          sx={{ fontSize: "0.9rem", margin: "0.5rem 0 0.5rem 0.5rem" }}
        >
          No Goals
        </Typography>
      );
    };

    return (
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        {/* First Period Goals */}
        <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold" }}>
          1st Period
        </Typography>
        <Divider />
        {firstPeriodGoals && firstPeriodGoals.length > 0
          ? firstPeriodGoals.map((goal: GoalType) => renderGoalDetails(goal))
          : NoGoalsMessage()}
        {/* Second Period Goals */}
        <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold" }}>
          2nd Period
        </Typography>
        <Divider />
        {secondPeriodGoals && secondPeriodGoals.length > 0
          ? secondPeriodGoals.map((goal: GoalType) => renderGoalDetails(goal))
          : NoGoalsMessage()}
        {/* Third Period Goals */}
        <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold" }}>
          3rd Period
        </Typography>
        <Divider />
        {thirdPeriodGoals && thirdPeriodGoals.length > 0
          ? thirdPeriodGoals.map((goal: GoalType) => renderGoalDetails(goal))
          : NoGoalsMessage()}
        {/* Overtime Goals - conditionally rendered */}
        {overTimeGoals && overTimeGoals.length > 0 ? (
          <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold" }}>
            OT
          </Typography>
        ) : (
          ""
        )}
        {overTimeGoals && overTimeGoals.length > 0 ? <Divider /> : null}
        {overTimeGoals && overTimeGoals.length > 0
          ? overTimeGoals.map((goal: GoalType) => renderGoalDetails(goal))
          : null}
      </Box>
    );
  };

  const gameModalBoxStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    //width: 400,
    bgcolor: "secondary.main",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "1rem",
  };

  //Head to head matchups and any relevant stats
  //goal scorers by period

  return (
    <Box sx={gameModalBoxStyle}>
      <Typography
        sx={{ paddingTop: "-10px", paddingBottom: "0" }}
        style={{ fontWeight: "bold" }}
      >
        {status.component}
      </Typography>
      <Divider sx={{ width: "100%", margin: "0.5rem 0" }} />
      <div className="flex-box-center" style={{ flexDirection: "column" }}>
        {renderScoreLine()}
        {renderMatchupInfo()}
      </div>
      <div>
        <TableContainer>
          <Table style={{ minWidth: "16rem", marginTop: "1rem" }}>
            <TableBody>{renderGameStatsInfo()}</TableBody>
          </Table>
        </TableContainer>
      </div>
      <div style={{ marginTop: "0.7rem" }}>{renderGoalsScored()}</div>
    </Box>
  );
};

export default GameModal;
