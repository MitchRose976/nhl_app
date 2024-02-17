import React from "react";
import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  Divider,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { GameInterface, GoalType, PlayerInfoType } from "../../shared/types";
import { formGetTeamLogoUrl, formatRechartsData } from "../../shared/utils";
import "../../shared/style.scss";
import { LIVE_GAME_STATS_TYPES, TEAM_IDS } from "../../shared/constants";
import { useGetTeamStatsFormattedQuery } from "../api/apiSlice";
import TeamStatsBarChart from "../../shared/components/TeamStatsBarChart";
import TeamLogo from "../../shared/components/TeamLogo";

interface GameModalProps {
  game: GameInterface;
  status: { status: string; component: string };
}

const GameModal = ({ game, status }: GameModalProps) => {
  const awayTeamAbbrev = game.teams.away.abbreviation;
  const homeTeamAbbrev = game.teams.home.abbreviation;
  const awayTeamName = TEAM_IDS.find(
    (team) => team.abbreviation === awayTeamAbbrev
  )?.name;
  const homeTeamName = TEAM_IDS.find(
    (team) => team.abbreviation === homeTeamAbbrev
  )?.name;
  const currentPeriod = game.status.progress?.currentPeriod;

  const { data, isLoading, isSuccess, isError } =
    useGetTeamStatsFormattedQuery();

  const renderScoreLine = () => {
    return (
      <div className="flex-box-center">
        <div className="flex-box-center" style={{ padding: "0 1rem" }}>
          <TeamLogo
            svgString={formGetTeamLogoUrl(game.teams.home.abbreviation)}
            width={60}
            height={60}
          />
          {status.status === "FINAL" || status.status === "LIVE" ? (
            <Typography sx={{ fontSize: "2rem", paddingLeft: "2rem" }}>
              {game.scores[homeTeamAbbrev]}
            </Typography>
          ) : null}
        </div>
        <div>
          <Typography sx={{ fontSize: "2rem" }}>:</Typography>
        </div>
        <div className="flex-box-center" style={{ padding: "0 1rem" }}>
          {status.status === "FINAL" || status.status === "LIVE" ? (
            <Typography sx={{ fontSize: "2rem", paddingRight: "2rem" }}>
              {game.scores[awayTeamAbbrev]}
            </Typography>
          ) : null}
          <TeamLogo
            svgString={formGetTeamLogoUrl(game.teams.away.abbreviation)}
            width={60}
            height={60}
          />
        </div>
      </div>
    );
  };

  const renderMatchupInfo = () => {
    const headToHeadStats = game.currentStats;
    if (headToHeadStats.playoffSeries) {
      return (
        <Typography sx={{ fontSize: "0.7rem", fontWeight: "500" }}>
          {`Rd ${game.currentStats.playoffSeries.round} - ${homeTeamAbbrev}:${game.currentStats.playoffSeries.wins[homeTeamAbbrev]}   ${awayTeamAbbrev}:${game.currentStats.playoffSeries.wins[awayTeamAbbrev]}`}
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
            {`(${headToHeadStats.records[homeTeamAbbrev].wins}-${headToHeadStats.records[homeTeamAbbrev].losses}-${headToHeadStats.records[homeTeamAbbrev].ot})`}
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "500",
              paddingLeft: "4rem",
            }}
          >
            {`(${headToHeadStats.records[awayTeamAbbrev].wins}-${headToHeadStats.records[awayTeamAbbrev].losses}-${headToHeadStats.records[awayTeamAbbrev].ot})`}
          </Typography>
        </div>
      );
    }
  };

  const renderLiveGameStatsInfo = () => {
    return LIVE_GAME_STATS_TYPES.map(({ statType, label }, index) => {
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
              ? game.gameStats[statType][homeTeamAbbrev].goals
              : statType === "faceOffWinPercentage"
              ? Math.round(game.gameStats[statType][homeTeamAbbrev]) + "%"
              : game.gameStats[statType][homeTeamAbbrev]
          }`}</Box>
          <Typography sx={{ fontSize: "0.8rem" }}>{label}</Typography>
          <Box>{`${
            statType === "powerPlay"
              ? game.gameStats[statType][awayTeamAbbrev].goals
              : statType === "faceOffWinPercentage"
              ? Math.round(game.gameStats[statType][awayTeamAbbrev]) + "%"
              : game.gameStats[statType][awayTeamAbbrev]
          }`}</Box>
        </TableRow>
      );
    });
  };

  const getTimeOfGoal = (goal: GoalType) => {
    return `${goal.min}:${goal.sec > 9 ? goal.sec : "0" + goal.sec}`;
  };

  const renderGoalsScored = () => {
    const renderGoalDetails = (goal: GoalType) => {
      const scoringTeamAbbreviation = goal.team;
      return (
        <div
          style={{
            padding: "0.3rem 0",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>
            <TeamLogo svgString={formGetTeamLogoUrl(scoringTeamAbbreviation)} width={30} height={30} />
          </div>
          <Typography sx={{ fontSize: "0.75rem", marginLeft: "0.3rem" }}>
            {`${getTimeOfGoal(goal)}
             - ${goal.scorer.player} (${goal.scorer.seasonTotal}) ${
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
        {(currentPeriod && currentPeriod > 1) ||
        game.status.state === "FINAL" ? (
          <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold" }}>
            2nd Period
          </Typography>
        ) : null}
        {(currentPeriod && currentPeriod > 1) ||
        game.status.state === "FINAL" ? (
          <Divider />
        ) : null}
        {(currentPeriod && currentPeriod > 1) || game.status.state === "FINAL"
          ? secondPeriodGoals && secondPeriodGoals.length > 0
            ? secondPeriodGoals.map((goal: GoalType) => renderGoalDetails(goal))
            : NoGoalsMessage()
          : null}

        {/* Third Period Goals */}
        {(currentPeriod && currentPeriod > 2) ||
        game.status.state === "FINAL" ? (
          <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold" }}>
            3rd Period
          </Typography>
        ) : null}
        {(currentPeriod && currentPeriod > 2) ||
        game.status.state === "FINAL" ? (
          <Divider />
        ) : null}
        {(currentPeriod && currentPeriod > 2) || game.status.state === "FINAL"
          ? thirdPeriodGoals && thirdPeriodGoals.length > 0
            ? thirdPeriodGoals.map((goal: GoalType) => renderGoalDetails(goal))
            : NoGoalsMessage()
          : null}

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

  return (
    <>
      {isLoading ? <CircularProgress /> : null}
      {isError ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <strong>Error while fetching data</strong>
        </Alert>
      ) : null}
      {awayTeamName && homeTeamName ? (
        <Box sx={gameModalBoxStyle}>
          <Typography
            sx={{ paddingTop: "-10px", paddingBottom: "0" }}
            style={{ fontWeight: "bold" }}
          >
            {status.component}
          </Typography>
          <Divider sx={{ width: "100%", margin: "0.5rem 0" }} />

          {renderScoreLine()}
          {renderMatchupInfo()}
          {status.status === "FINAL" || status.status === "LIVE" ? (
            <>
              {/* Live stats */}
              <div
                className="flex-box-center"
                style={{ flexDirection: "column" }}
              ></div>
              <div>
                <TableContainer>
                  <Table style={{ minWidth: "16rem", marginTop: "1rem" }}>
                    <TableBody>{renderLiveGameStatsInfo()}</TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div style={{ marginTop: "0.7rem" }}>{renderGoalsScored()}</div>
            </>
          ) : (
            <div style={{ marginTop: "0.5rem" }}>
              {/* Head to Head Stats */}
              <TeamStatsBarChart
                data={formatRechartsData(data, isLoading, isError, isSuccess, [
                  homeTeamName,
                  awayTeamName,
                ])}
                numOfTeamsToCompare={2}
                teamNamesInOrder={[homeTeamName, awayTeamName]}
              />
            </div>
          )}
        </Box>
      ) : null}
    </>
  );
};

export default GameModal;
