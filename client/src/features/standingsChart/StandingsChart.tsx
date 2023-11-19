import React, { useEffect, useState } from "react";
import { useGetStandingsQuery } from "../api/apiSlice";
import {
  Alert,
  AlertTitle,
  Box,
  Container,
  Divider,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import { formGetTeamLogoUrl, getTeamStat } from "../../shared/utils";
import Loader from "../../shared/components/Loader";
import { TeamStandingsDataObject } from "../../../../server/src/types";

const standingsTableHeaders = [
  { label: "Team", type: "Team", stat: "team.name" }, // must render with func
  { label: "GP", type: "Games Played", stat: "gamesPlayed" },
  { label: "W", type: "Wins", stat: "leagueRecord.wins" },
  { label: "L", type: "Losses", stat: "leagueRecord.losses" },
  { label: "OTL", type: "Overtime Losses", stat: "leagueRecord.ot" },
  { label: "Pts", type: "Points", stat: "points" },
  { label: "GF", type: "Goals For", stat: "goalsScored" },
  { label: "GA", type: "Goals Against", stat: "goalsAgainst" },
  { label: "Diff", type: "Goals Differential", stat: "" }, // must render with func
  { label: "L10", type: "Last 10 Games", stat: "" }, // must render with func
  { label: "Strk", type: "Streak", stat: "streak.streakCode" },
  { label: "P%", type: "Points Percentage", stat: "pointsPercentage" }, // need to round to 2
  {
    label: "ConfHomeRank",
    type: "Conference Home Rank",
    stat: "conferenceHomeRank",
  },
  {
    label: "ConfRoadRank",
    type: "Conference Road Rank",
    stat: "conferenceRoadRank",
  },
  {
    label: "DivHomeRank",
    type: "Division Home Rank",
    stat: "divisionHomeRank",
  },
  {
    label: "DivRoadRank",
    type: "Division Road Rank",
    stat: "divisionRoadRank",
  },
  {
    label: "HomeWins",
    type: "Home - Wins",
    stat: "homeWins",
  },
  {
    label: "HomeGoalsFor",
    type: "Home - GF",
    stat: "homeGoalsFor",
  },
  {
    label: "HomeGoalsAgainst",
    type: "Home - GA",
    stat: "homeGoalsAgainst",
  },
  {
    label: "RoadWins",
    type: "Road - Wins",
    stat: "roadWins",
  },
  {
    label: "RoadGoalsFor",
    type: "Road - GF",
    stat: "roadGoalsFor",
  },
  {
    label: "RoadGoalsAgainst",
    type: "Road - GA",
    stat: "roadGoalsAgainst",
  },
];

const standingsMapping: {
  [key: string]: { label: string; divisions: string[] };
} = {
  "Eastern Conference": {
    label: "Eastern Conference",
    divisions: ["Atlantic", "Metropolitan"],
  },
  "Western Conference": {
    label: "Western Conference",
    divisions: ["Central", "Pacific"],
  },
};

const StandingsChart = () => {
  const {
    data: standingsData,
    isLoading,
    isSuccess,
    isError,
  } = useGetStandingsQuery();
  const [conference, setConference] = useState<string>(
    standingsMapping["Eastern Conference"].label
  );
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    setShowComponent(true);
  }, []);

  const stickyColumnStyling = {
    position: "sticky",
    left: 0,
    backgroundColor: "#fff",
  };

  const renderDivisionTable = (selectedDivision: string) => {
    const easternDivisions = ["Atlantic", "Metropolitan"];
    const divisionStandingsData = standingsData
      ? easternDivisions.includes(selectedDivision)
        ? (
            standingsData["Eastern"] as {
              [key: string]: TeamStandingsDataObject[];
            }
          )[selectedDivision]
        : (
            standingsData["Western"] as {
              [key: string]: TeamStandingsDataObject[];
            }
          )[selectedDivision]
      : null;

    return (
      <TableContainer>
        <h2 style={{ position: "sticky", left: 0, fontFamily: "roboto" }}>
          {selectedDivision} Division
        </h2>
        <Table>
          <TableHead>
            <TableRow>
              {standingsTableHeaders.map((statType, index) => {
                return index === 0 ? (
                  <TableCell sx={stickyColumnStyling} key={statType.label}>
                    {statType.label}
                  </TableCell>
                ) : (
                  <TableCell key={statType.label}>{statType.label}</TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {divisionStandingsData?.map(
              (team: TeamStandingsDataObject, index) => {
                return (
                  <TableRow key={index}>
                    {standingsTableHeaders.map((statType, index) => {
                      return index === 0 ? (
                        <TableCell
                          sx={stickyColumnStyling}
                          key={statType.label}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              fontSize: "0.75rem",
                            }}
                          >
                            <img
                              alt={`${team.teamName.default} logo`}
                              src={formGetTeamLogoUrl(team.teamAbbrev.default)}
                              style={{
                                marginRight: "0.5rem",
                                width: "3rem",
                                height: "3rem",
                              }}
                            />
                            {getTeamStat(team, statType)}
                          </div>
                        </TableCell>
                      ) : (
                        <TableCell
                          key={statType.label}
                          sx={
                            statType.label === "L10"
                              ? {
                                  whiteSpace: "nowrap",
                                }
                              : undefined
                          }
                        >
                          {getTeamStat(team, statType)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <>
      {isLoading ? <Loader /> : null}
      {isError ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <strong>Error while fetching data</strong>
        </Alert>
      ) : null}
      {isSuccess ? (
        <Container
          maxWidth="md"
          sx={{
            border: "1px solid black",
            marginTop: "2rem",
            opacity: showComponent ? 1 : 0,
            transition: "opacity 0.5s ease-in",
          }}
          className={showComponent ? "fade-in" : ""}
        >
          <Tabs
            variant={"fullWidth"}
            value={false}
            scrollButtons="auto"
            aria-label="Tabs for player stat types"
          >
            <Tab
              key={standingsMapping["Eastern Conference"].label}
              label={standingsMapping["Eastern Conference"].label}
              value={standingsMapping["Eastern Conference"].label}
              onClick={() =>
                setConference(standingsMapping["Eastern Conference"].label)
              }
            />
            <Tab
              key={standingsMapping["Western Conference"].label}
              label={standingsMapping["Western Conference"].label}
              value={standingsMapping["Western Conference"].label}
              onClick={() =>
                setConference(standingsMapping["Western Conference"].label)
              }
            />
          </Tabs>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {standingsMapping[conference].divisions.map((division: string) =>
              renderDivisionTable(division)
            )}
          </Box>
        </Container>
      ) : null}
    </>
  );
};

export default StandingsChart;
