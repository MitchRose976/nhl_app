import React from "react";
import { GameInterface } from "../../../shared/types";
import Typography from "@mui/material/Typography";

interface MatchupInfoProps {
  game: GameInterface;
}

const MatchupInfo: React.FC<MatchupInfoProps> = ({ game }) => {
  const headToHeadStats = game.currentStats;
  
  if (headToHeadStats.playoffSeries) {
    return (
      <Typography sx={{ fontSize: "0.7rem", fontWeight: "500" }}>
        {`Rd ${game.currentStats.playoffSeries.round} - ${
          game.teams.home.abbreviation
        }: ${
          game.currentStats.playoffSeries.wins[game.teams.home.abbreviation]
        }   ${game.teams.away.abbreviation}: ${
          game.currentStats.playoffSeries.wins[game.teams.away.abbreviation]
        }`}
      </Typography>
    );
  }

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
};

export default MatchupInfo; 