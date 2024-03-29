import React from "react";
import Card from "@mui/material/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { statsTableHeaderCells } from "../constants";
import "../style.scss";

const PlayerCard = () => {
  const teamLogoUrl =
    "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/10.svg";
  const playerPicUrl =
    "http://nhl.bamcontent.com/images/headshots/current/168x168/8479318.jpg";

  const renderTableHeaderCells = () => {
    return statsTableHeaderCells.map((cell) => {
      return <TableCell key={cell}>{cell}</TableCell>;
    });
  };

  // type PlayerData = {
  //   Gp: number | string;
  //   G: number | string;
  //   A: number | string;
  //   Pts: number | string;
  //   Pim: number | string;
  //   "+/-": number | string;
  //   Hits: number | string;
  //   Ppg: number | string;
  //   Ppp: number | string;
  //   Shg: number | string;
  //   Shp: number | string;
  //   Shots: number | string;
  //   "Fo%": number | string;
  //   "Shot%": number | string;
  //   Blocked: number | string;
  //   "Toi/total": string;
  //   "Toi/game": string;
  //   "Toi/pp/total": string;
  //   "Toi/pp/game": string;
  //   "Toi/sh/total": string;
  //   "Toi/sh/game": string;
  // };

  const playerData = {
    Gp: 13,
    G: 6,
    A: 7,
    Pts: 13,
    Pim: 8,
    "+/-": 0,
    Hits: 29,
    Ppg: 4,
    Ppp: 8,
    Shg: 0,
    Shp: 0,
    Shots: 61,
    "Fo%": 48.33,
    "Shot%": 9.8,
    Blocked: 8,
    "Toi/total": "273:21",
    "Toi/game": "21:01",
    "Toi/pp/total": "54:48",
    "Toi/pp/game": "04:12",
    "Toi/sh/total": "00:01",
    "Toi/sh/game": "00:00",
  };

  const renderTableBodyCells = (playerData: {
    [x: string]: string | number;
  }) => {
    return statsTableHeaderCells.map((stat) => {
      return (
        <TableCell
          key={stat}
          sx={{ paddingTop: "2.5px", paddingBottom: "13.5px" }}
        >
          {playerData[stat]}
        </TableCell>
      );
    });
  };

  return (
    <Paper>
      <Card className="player-card-container">
        {/* Top Half */}
        <div className="player-card-header-container">
          <div className="player-card-headshot-container">
            {/* change alt tag to be dynamic */}
            <img src={playerPicUrl} alt={"player"} />
          </div>

          <div className="player-card-info-container">
            <div className="player-card-number-logo">
              <span>#34</span>
              {/* change alt tag to be dynamic */}
              <img src={teamLogoUrl} alt={"team logo"} />
            </div>
            {/* Player Name */}
            <span
              style={{
                fontSize: "0.95rem",
                fontWeight: "bold",
                marginTop: "0.75rem",
              }}
            >
              Auston Matthews
            </span>
          </div>
        </div>

        {/* Bottom Half */}
        <div className="player-card-stats-container">
          <div className="player-card-stats-container-child">
            <span>Biography</span>
          </div>
          {/* Bio */}
          <div className="player-card-bio-list">
            <ul>
              <li>Position: C</li>
              <li>Shoots: L</li>
              <li>Born: San Ramon, CA</li>
              <li>Age: 25</li>
              <li>Height: 6'3</li>
              <li>Weight: 208</li>
            </ul>
          </div>
          {/* Season Year */}
          <div className="player-card-stats-container-child">
            <span>2022-2023</span>
          </div>
          {/* Stats Table */}
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>{renderTableHeaderCells()}</TableRow>
              </TableHead>
              <TableBody style={{ height: "1rem" }}>
                <TableRow>{renderTableBodyCells(playerData)}</TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Card>
    </Paper>
  );
};

export default PlayerCard;
