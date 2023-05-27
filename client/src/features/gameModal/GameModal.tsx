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
import {
  GameInterface,
  GoalType,
  PlayerInfoType,
} from "../../../../server/src/types";
import {
  addNumberSuffix,
  formGetTeamLogoUrl,
  formatBarLabelStatsForGameModal,
} from "../../shared/utils";
import "../../shared/style.scss";
import {
  LIVE_GAME_STATS_TYPES,
  PRE_GAME_STATS_TYPES,
} from "../../shared/constants";
import { useGetTeamStatsByIDQuery } from "../api/apiSlice";
import {
  VictoryChart,
  VictoryStack,
  VictoryBar,
  VictoryAxis,
  VictoryLabel,
} from "victory";

interface GameModalProps {
  game: GameInterface;
  status: { status: string; component: string };
}

const GameModal = ({ game, status }: GameModalProps) => {
  const awayTeam = game.teams.away.abbreviation;
  const homeTeam = game.teams.home.abbreviation;
  const awayTeamID = game.teams.away.id;
  const homeTeamID = game.teams.home.id;

  const {
    data: awayTeamStats,
    isLoading: awayIsLoading,
    isSuccess: awayIsSuccess,
    isError: awayIsError,
  } = useGetTeamStatsByIDQuery({ teamID: awayTeamID });

  const {
    data: homeTeamStats,
    isLoading: homeIsLoading,
    isSuccess: homeIsSuccess,
    isError: homeIsError,
  } = useGetTeamStatsByIDQuery({ teamID: homeTeamID });

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
          {status.status === "FINAL" || status.status === "LIVE" ? (
            <Typography sx={{ fontSize: "2rem", paddingLeft: "2rem" }}>
              {game.scores[homeTeam]}
            </Typography>
          ) : null}
        </div>
        <div>
          <Typography sx={{ fontSize: "2rem" }}>:</Typography>
        </div>
        <div className="flex-box-center" style={{ padding: "0 1rem" }}>
          {status.status === "FINAL" || status.status === "LIVE" ? (
            <Typography sx={{ fontSize: "2rem", paddingRight: "2rem" }}>
              {game.scores[awayTeam]}
            </Typography>
          ) : null}
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

  const formatHeadToHeadStatsInfo = () => {
    let formattedData: {
      home: {
        x: string; // statType label
        y: number; // percentage
        z: number; // league rank
      }[];
      away: {
        x: string; // statType label
        y: number; // percentage
        z: number; // league rank
      }[];
    } = { home: [], away: [] };

    // array of statTypes to be formatted
    const statTypesRequiringFormatting = [
      "winScoreFirst",
      "winLeadFirstPer",
      "winLeadSecondPer",
      "winOppScoreFirst",
      "winOutshootOpp",
      "winOutshotByOpp",
    ];

    if (awayTeamStats && homeTeamStats && awayIsSuccess && homeIsSuccess) {
      const awayTeamStatPercentages = awayTeamStats.stats[0].splits[0].stat;
      const awayTeamStatRanks = awayTeamStats.stats[1].splits[0].stat;
      const homeTeamStatPercentages = homeTeamStats.stats[0].splits[0].stat;
      const homeTeamStatRanks = homeTeamStats.stats[1].splits[0].stat;
      PRE_GAME_STATS_TYPES.forEach(({ statType, label }) => {
        formattedData.home.push({
          x: label,
          y: statTypesRequiringFormatting.includes(statType)
            ? homeTeamStatPercentages[statType] * 100
            : parseFloat(homeTeamStatPercentages[statType]),
          z: parseInt(homeTeamStatRanks[statType]),
        });

        formattedData.away.push({
          x: label,
          y: statTypesRequiringFormatting.includes(statType)
            ? awayTeamStatPercentages[statType] * 100
            : parseFloat(awayTeamStatPercentages[statType]),
          z: parseInt(awayTeamStatRanks[statType]),
        });
      });
    }
    return formattedData;
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

  const getTimeOfGoal = (goal: GoalType) => {
    return `${goal.min}:${goal.sec > 9 ? goal.sec : "0" + goal.sec}`;
  };

  const renderGoalsScored = () => {
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

  const headToHeadData = formatHeadToHeadStatsInfo();

  const renderHeadToHeadStatsChart = () => {
    const width = 600;
    const height = 700;
    return (
      <VictoryChart
        horizontal
        height={height}
        width={width}
        padding={{ top: 40, right: 70, left: 70, bottom: 30 }}
      >
        <VictoryStack
          style={{ data: { width: 18 }, labels: { fontSize: 15 } }}
          padding={{ top: 40 }}
        >
          <VictoryBar
            style={{ data: { fill: "#12EAEA" } }}
            data={headToHeadData.home.reverse()}
            y={(data) => -Math.abs(data.y)}
            labels={headToHeadData.home.map(({ x, y, z }) => {
              return `${formatBarLabelStatsForGameModal(
                x,
                y
              )} (${z}${addNumberSuffix(z)})`;
            })}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
          />
          <VictoryBar
            style={{ data: { fill: "#F36868" } }}
            data={headToHeadData.away.reverse()}
            y={(data) => Math.abs(data.y)}
            labels={headToHeadData.away.map(({ x, y, z }) => {
              return `${formatBarLabelStatsForGameModal(
                x,
                y
              )} (${z}${addNumberSuffix(z)})`;
            })}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
          />
        </VictoryStack>
        <VictoryAxis
          style={{
            axis: { stroke: "transparent" },
            ticks: { stroke: "transparent" },
            tickLabels: { fontSize: 18, fill: "black" },
          }}
          tickLabelComponent={
            <VictoryLabel x={width / 2} textAnchor="middle" dy={-22} />
          }
          tickValues={headToHeadData.home.map((point) => point.x).reverse()}
        />
      </VictoryChart>
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
      {awayIsLoading || homeIsLoading ? <CircularProgress /> : null}
      {awayIsError || homeIsError ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <strong>Error while fetching data</strong>
        </Alert>
      ) : null}
      {homeTeamStats && awayTeamStats && headToHeadData ? (
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
            <>
              {/* Head to Head Stats */}
              {renderHeadToHeadStatsChart()}
            </>
          )}
        </Box>
      ) : null}
    </>
  );
};

export default GameModal;