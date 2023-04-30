import React, { useRef, useState } from "react";
import { useGetStandingsQuery } from "../api/apiSlice";
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  CircularProgress,
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
import {
  StandingsRecordInterface,
  TeamRecordInterface,
} from "../../../../server/src/types";
import { formGetTeamLogoUrl, getTeamStat } from "../../shared/utils";

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
    label: "PPLeagueRank",
    type: "Powerplay League Rank",
    stat: "ppLeagueRank",
  },
  {
    label: "PPConfRank",
    type: "Powerplay Conference Rank",
    stat: "ppConferenceRank",
  },
  {
    label: "PPDivRank",
    type: "Powerplay Division Rank",
    stat: "ppDivisionRank",
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
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const [conference, setConference] = useState<string>(
    standingsMapping["Eastern Conference"].label
  );

  const stickyColumnStyling = {
    position: "sticky",
    left: 0,
    backgroundColor: "#fff",
  };

  const getLast10GamesRecord = () => {};

  const renderDivisionTable = (selectedDivision: string) => {
    const divisionStandingsData = standingsData
      ? standingsData.records.find(
          (item: StandingsRecordInterface) =>
            item.division.name === selectedDivision
        )
      : null;

    return (
      <TableContainer>
        <h2 style={{ fontFamily: "roboto" }}>{selectedDivision} Division</h2>
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
            {divisionStandingsData?.teamRecords.map(
              (team: TeamRecordInterface) => {
                return (
                  <TableRow>
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
                            <Avatar
                              alt={`${team.team.name} logo`}
                              variant="rounded"
                              srcSet={formGetTeamLogoUrl(team.team.id)}
                              sx={{
                                width: 30,
                                height: 30,
                                marginRight: "0.5rem",
                              }}
                            />
                            {getTeamStat(team, statType)}
                          </div>
                        </TableCell>
                      ) : (
                        <TableCell key={statType.label}>
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
      {isLoading ? <CircularProgress /> : null}
      {isError ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <strong>Error while fetching data</strong>
        </Alert>
      ) : null}
      {isSuccess ? (
        <Container maxWidth="md" sx={{ border: "1px solid black" }}>
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
              onClick={() => setConference(standingsMapping["Eastern Conference"].label)}
            />
            <Tab
              key={standingsMapping["Western Conference"].label}
              label={standingsMapping["Western Conference"].label}
              value={standingsMapping["Western Conference"].label}
              onClick={() => setConference(standingsMapping["Western Conference"].label)}
            />
          </Tabs>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: 'column'
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
