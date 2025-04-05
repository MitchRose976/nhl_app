import { Container, Box } from "@mui/material";
import TeamStatsBarChart from "../../shared/components/TeamStatsBarChart";
import TeamStatsRadarChart from "../../shared/components/TeamStatsRadarChart";
import { useGetTeamStatsFormattedQuery } from "../api/apiSlice";
import { TEAM_IDS } from "../../shared/constants";
import { useEffect, useState } from "react";
import { formatRechartsData, getWindowSize } from "../../shared/utils";
import TeamSelector from "../../shared/components/TeamSelector";

const TeamStats = () => {
  // Query
  const { data, isLoading, isSuccess, isError } =
    useGetTeamStatsFormattedQuery();

  // Team Selection States
  const sortedTeams = TEAM_IDS.slice().sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const [selectedTeams, setSelectedTeams] = useState([sortedTeams[0]]);

  // Other States
  const [showComponent, setShowComponent] = useState(false);
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    setShowComponent(true);
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const chartProps = {
    data: formatRechartsData(
      data,
      isLoading,
      isError,
      isSuccess,
      selectedTeams.map((team) => team.name)
    ),
    numOfTeamsToCompare: selectedTeams.length,
    teamNamesInOrder: selectedTeams.map((team) => team.name),
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        padding: "2rem 0",
        marginTop: "2rem",
        opacity: showComponent ? 1 : 0,
        transition: "opacity 0.5s ease-in",
      }}
      className={showComponent ? "fade-in" : ""}
    >
      <Box
        sx={{
          width: windowSize.innerWidth < 1000 ? "75%" : "25rem",
        }}
      >
        <TeamSelector
          selectedTeams={selectedTeams}
          onTeamChange={setSelectedTeams}
        />
      </Box>

      {/* CHARTS */}
      <Box
        sx={{
          display: "flex",
          flexDirection: windowSize.innerWidth < 1000 ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <Box sx={{ margin: "0.7rem" }}>
          <TeamStatsBarChart {...chartProps} />
        </Box>
        <Box sx={{ margin: "0.7rem" }}>
          <TeamStatsRadarChart {...chartProps} />
        </Box>
      </Box>
    </Container>
  );
};

export default TeamStats;
