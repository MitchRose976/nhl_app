import React, { useEffect, useState } from "react";
import {
  PRE_GAME_STATS_TYPES,
  TEAM_IDS,
} from "../../../shared/constants";
import { useGetTeamStatsByIDQuery } from "../../api/apiSlice";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { formatStatType } from "../../../shared/utils";

interface TeamInputProps {
  teamInputOrder: number; // corresponds to the title of the select container (Team, Team 2, Team 3 etc.)
  numOfTeamsToCompare: number; // controlled by add team and subtract team buttons
  fetchTeamData: any;
}

const TeamInput = ({
  teamInputOrder,
  numOfTeamsToCompare,
  fetchTeamData,
}: TeamInputProps) => {
  const [teamID, setTeamID] = useState<number>(teamInputOrder);
  const [teamName, setTeamName] = useState<string>(
    TEAM_IDS[teamInputOrder - 1].name
  );
  const { data, isLoading, isSuccess, isError } = useGetTeamStatsByIDQuery({
    teamID,
  });

  const handleChange = (event: SelectChangeEvent) => {
    const selectedTeam = TEAM_IDS.find(
      ({ name }) => name === event.target.value
    );
    if (selectedTeam) {
      setTeamID(selectedTeam.teamID);
      setTeamName(selectedTeam.name);
    }
  };

  useEffect(() => {
    if (!isLoading && !isError && isSuccess && data) {
      // format data for victory bar chart to read
      const teamDataObject = data.stats[0].splits[0].stat;
      let formattedData: { x: string; y: number }[] = [];
      PRE_GAME_STATS_TYPES.forEach(({ statType, label }) => {
        formattedData.push({
          x: label,
          y: formatStatType(teamDataObject, statType)
          //z: parseInt(teamDataObject[statType]),
        });
      });
      fetchTeamData(formattedData, teamInputOrder, teamName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, teamID, teamName]);

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
