import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  ButtonGroup,
  Container,
} from "@mui/material";
import TeamStatsBarChart from "../../shared/components/TeamStatsBarChart";
import TeamStatsRadarChart from "../../shared/components/TeamStatsRadarChart";
import { useGetTeamStatsFormattedQuery } from "../api/apiSlice";
import { TEAM_IDS } from "../../shared/constants";
import { useEffect, useState } from "react";
import { FormattedRechartDataItem } from "../../shared/types";
const TeamStats2 = () => {
  // Query
  const { data, isLoading, isSuccess, isError } =
    useGetTeamStatsFormattedQuery();

  // Team Selection States
  const [team1, setTeam1] = useState(TEAM_IDS[0].name);
  const [team2, setTeam2] = useState(TEAM_IDS[1].name);
  const [team3, setTeam3] = useState(TEAM_IDS[2].name);

  // Other States
  const [numOfTeamsToCompare, setNumOfTeamsToCompare] = useState(1);
  const [showComponent, setShowComponent] = useState(false);

  console.log("mitch data: ", data);

  const renderTeamDropdownItems = () => {
    return TEAM_IDS.map(({ name }) => {
      return <MenuItem value={name}>{name}</MenuItem>;
    });
  };

  const handleTeamChange = (teamNumber: number, teamName: string) => {
    switch (teamNumber) {
      case 1:
        setTeam1(teamName);
        break;
      case 2:
        setTeam2(teamName);
        break;
      default:
        setTeam3(teamName);
        break;
    }
  };

  /* --------------------------------------------------------- */
  /* -------------------Team Comparison Buttons--------------- */
  /* --------------------------------------------------------- */
  const addTeamToCompare = () => {
    setNumOfTeamsToCompare((state: number) =>
      state < 3 ? (state += 1) : state
    );
  };

  const subtractTeamToCompare = () => {
    setNumOfTeamsToCompare((state: number) =>
      state > 1 ? (state -= 1) : state
    );
  };

  const renderAddSubtractButtons = () => {
    return (
      <ButtonGroup variant="contained" aria-label="add/subtract team buttons">
        <Button sx={{ backgroundColor: "#008000" }} onClick={addTeamToCompare}>
          Add Team
        </Button>
        <Button
          sx={{ backgroundColor: "#cc0000" }}
          onClick={subtractTeamToCompare}
        >
          Subtract Team
        </Button>
      </ButtonGroup>
    );
  };

  const formatData = () => {
    if (data && !isLoading && !isError) {
      const allTeams = [team1, team2, team3];
      const matchingTeams = data.filter((team) =>
        allTeams.includes(team.teamName)
      );

      let formattedData: FormattedRechartDataItem[] = [
        { statType: "Point %" },
        { statType: "Faceoff %" },
        { statType: "Goals/Game" },
        { statType: "Goals Against/Game" },
        { statType: "PK%" },
        { statType: "PP%" },
        { statType: "Shots/Game" },
        { statType: "Shots Against/Game" },
      ];

      matchingTeams?.forEach((teamData, index) => {
        formattedData.forEach((stat) => {
          stat[`team${index + 1}`] = teamData.data[stat.statType] || 0;
        });
      });

      console.log("mitch formattedData: ", formattedData);
      return formattedData;
    }
  };

  useEffect(() => {
    setShowComponent(true);
  }, []);

  console.log("mitch team1: ", team1);
  console.log("mitch team2: ", team2);
  console.log("mitch team3: ", team3);

  return (
    <Container
      maxWidth="md"
      sx={{
        // border: "1px solid black",
        padding: "2rem 0",
        marginTop: "2rem",
        opacity: showComponent ? 1 : 0,
        transition: "opacity 0.5s ease-in",
      }}
      className={showComponent ? "fade-in" : ""}
    >
      {/* TEAM 1 */}
      <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
        <InputLabel id="team-selection-1">Team 1</InputLabel>
        <Select
          autoWidth
          labelId="team-selection-1"
          value={team1}
          label="Team 1"
          onChange={(e) => handleTeamChange(1, e.target.value)}
        >
          {renderTeamDropdownItems()}
        </Select>
      </FormControl>

      {/* TEAM 2 */}
      {numOfTeamsToCompare > 1 ? (
        <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
          <InputLabel id="team-selection-2">Team 2</InputLabel>
          <Select
            autoWidth
            labelId="team-selection-2"
            value={team2}
            label="Team 2"
            onChange={(e) => handleTeamChange(2, e.target.value)}
          >
            {renderTeamDropdownItems()}
          </Select>
        </FormControl>
      ) : null}

      {/* TEAM 3 */}
      {numOfTeamsToCompare > 2 ? (
        <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
          <InputLabel id="team-selection-2">Team 3</InputLabel>
          <Select
            autoWidth
            labelId="team-selection-3"
            value={team3}
            label="Team 3"
            onChange={(e) => handleTeamChange(3, e.target.value)}
          >
            {renderTeamDropdownItems()}
          </Select>
        </FormControl>
      ) : null}

      {/* BUTTONS */}
      {renderAddSubtractButtons()}

      {/* CHARTS */}
      <TeamStatsRadarChart data={formatData()} />
      <br />
      <TeamStatsBarChart data={formatData()} />
    </Container>
  );
};

export default TeamStats2;
