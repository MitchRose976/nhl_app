import React, { useState } from "react";
import { TEAM_IDS } from "../../../shared/constants";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface TeamInputProps {
  teamInputOrder: number; // corresponds to the title of the select container (Team, Team 2, Team 3 etc.)
  numOfTeamsToCompare: number; // controlled by add team and subtract team buttons
}

const TeamInput = ({
  teamInputOrder,
  numOfTeamsToCompare
}: TeamInputProps) => {
  const [teamID, setTeamID] = useState<number>(
    TEAM_IDS[teamInputOrder - 1].teamID
  );
  const [teamName, setTeamName] = useState<string>(
    TEAM_IDS[teamInputOrder - 1].name
  );

  const handleChange = (event: SelectChangeEvent) => {
    const selectedTeam = TEAM_IDS.find(
      ({ name }) => name === event.target.value
    );
    if (selectedTeam) {
      setTeamID(selectedTeam.teamID);
      setTeamName(selectedTeam.name);
    }
  };

  const renderTeamDropdownItems = () => {
    return TEAM_IDS.map(({ name }) => (
      <MenuItem key={name} value={name}>
        {name}
      </MenuItem>
    ));
  };

  const formControlSXProps = {
    minWidth: 190,
    maxWidth: 190,
    height: "2rem",
    margin: "0.5rem",
  };

  return (
    <FormControl
      sx={{
        ...formControlSXProps,
        display: numOfTeamsToCompare >= teamInputOrder ? "" : "none",
      }}
    >
      <InputLabel id="team-input-label">{`Team ${
        teamInputOrder > 1 ? teamInputOrder : ""
      }`}</InputLabel>
      <Select
        labelId="team-label"
        id="team-id"
        autoWidth
        defaultValue=""
        value={teamName}
        label="Team"
        onChange={handleChange}
        sx={{ height: "2rem" }}
      >
        {renderTeamDropdownItems()}
      </Select>
    </FormControl>
  );
};

export default TeamInput;
