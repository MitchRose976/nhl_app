import React, { useEffect, useState } from "react";
import TeamSelectDropdown from "./components/TeamSelectDropdown";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup } from "victory";
import {
  PRE_GAME_STATS_TYPES,
  TEAM_STATS_BAR_COLORS,
} from "../../shared/constants";
import styled from "@emotion/styled";
import { Alert, AlertTitle, Slider } from "@mui/material";
import CustomLegend from "./components/CustomLegend";
import { formattedTeamStatType } from "../../../../server/src/types";
import "../../shared/style.scss";
import Loader from "../../shared/components/Loader";

const TeamStats = () => {
  // variables
  const allCategories = PRE_GAME_STATS_TYPES.map((item) => item.label);
  const chartWidth = window.innerWidth < 500 ? 300 : 800;
  const chartHeight = window.innerWidth < 500 ? 400 : 600;
  const [teamsData, setTeamsData] = useState<Array<formattedTeamStatType>>([
    {
      teamName: "New Jersey Devils",
      data: [
        {
          x: "Point %",
          y: 68.3,
        },
        {
          x: "Faceoff %",
          y: 51.3,
        },
        {
          x: "Goals/Game",
          y: 3.524,
        },
        {
          x: "Goals Against/Game",
          y: 2.707,
        },
        {
          x: "PK%",
          y: 82.6,
        },
        {
          x: "PP%",
          y: 21.9,
        },
        {
          x: "Shots/Game",
          y: 34.4024,
        },
        {
          x: "Shots Against/Game",
          y: 28.2317,
        },
        {
          x: "Win% - Scoring First",
          y: 75,
        },
        {
          x: "Win% - Leading 1st Period",
          y: 78.3,
        },
        {
          x: "Win% - Leading 2nd Period",
          y: 91.9,
        },
        {
          x: "Win% - Opponent Scores First",
          y: 52.400000000000006,
        },
        {
          x: "Win% - Outshoot Opponent",
          y: 61.4,
        },
        {
          x: "Win% - Outshot By Opponent",
          y: 66.7,
        },
      ],
    },
  ]);
  // states
  const [loadingData, setLoadingData] = useState(true);
  const [numOfTeamsToCompare, setNumOfTeamsToCompare] = useState<number>(1);
  const [sliderValues, setSliderValues] = useState<number[]>([
    0,
    allCategories.length,
  ]);
  const [activeCategories, setActiveCategories] = useState(
    allCategories.slice(sliderValues[0], sliderValues[1])
  );
  const [visibleData, setVisibleData] = useState(() => {
    const initialData = teamsData.slice(0, numOfTeamsToCompare).map((team) => {
      const barData = team.data.slice(sliderValues[0], sliderValues[1]);
      return { ...team, data: barData };
    });
    return initialData;
  });
  /*
    used to re-render entire chart when data is changed using slider
    or add/remove teams buttons
  */
  const [chartKey, setChartKey] = useState(0);

  const fetchTeamData = (
    teamData: {
      x: string;
      y: number;
    }[],
    teamNumber: number,
    teamID: number,
    teamName: string
  ) => {
    setLoadingData(true);
    /* 
      teamNumber is the order of the select dropdown (1, 2, or 3)
      subtracting 1 to correctly target the corresponding index in teamsData
    */
    const teamDataIndex = teamNumber - 1;
    setTeamsData((prevTeamsData) => {
      let newData = [...prevTeamsData];
      newData[teamDataIndex] = { teamName: teamName, data: teamData };
      return newData;
    });
    setLoadingData(false);
  };

  const handleSliderChange = (_event: Event, newValues: number | number[]) => {
    if (Array.isArray(newValues)) {
      setSliderValues(newValues);
      setActiveCategories(allCategories.slice(...newValues));
    }
  };

  // Function to handle changes in visibleData
  const handleVisibleDataChange = () => {
    const updatedData = teamsData.slice(0, numOfTeamsToCompare).map((team) => {
      const barData = team.data.slice(sliderValues[0], sliderValues[1]);
      return { ...team, data: barData };
    });
    setVisibleData(updatedData);
  };

  useEffect(() => {
    handleVisibleDataChange();
    setChartKey((prevKey) => prevKey + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamsData, numOfTeamsToCompare, sliderValues, loadingData]);

  return (
    <div>
      <TeamSelectDropdown
        fetchTeamData={fetchTeamData}
        setNumOfTeamsToCompare={setNumOfTeamsToCompare}
        numOfTeamsToCompare={numOfTeamsToCompare}
      />
      {loadingData ? <Loader /> : null}
      {/* {!loadingData && teamsData? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <strong>Error while fetching data</strong>
        </Alert>
      ) : null} */}
      {teamsData && !loadingData ? (
        <div>
          <CustomLegend data={teamsData.slice(0, numOfTeamsToCompare)} />
          <VictoryChart
            width={chartWidth}
            height={chartHeight}
            padding={{ bottom: 140, right: 80, left: 50 }}
            key={chartKey}
          >
            {/* Y-axis */}
            <VictoryAxis
              dependentAxis
              tickFormat={(tick) => `${tick}%`}
              style={{
                tickLabels: { fontSize: window.innerWidth < 500 ? 8 : 12 },
              }}
              animate={{
                duration: 2000,
                easing: "bounce",
              }}
            />
            {/* X-axis */}
            <VictoryAxis
              tickValues={activeCategories}
              style={{
                tickLabels: {
                  fontSize: window.innerWidth < 500 ? 8 : 12,
                  angle: 45,
                  textAnchor: "start",
                },
              }}
              animate={{
                duration: 2000,
                easing: "bounce",
              }}
            />
            <VictoryGroup
              offset={window.innerWidth < 500 ? 3 : 12}
              colorScale={TEAM_STATS_BAR_COLORS}
              animate={{
                duration: 2000,
                onLoad: { duration: 500 },
              }}
            >
              {visibleData.map((team, index) => (
                <VictoryBar
                  key={`bar-${index}`}
                  data={team.data}
                  x="x"
                  y="y"
                  labels={({ datum }) => datum.y}
                  style={{
                    data: { width: window.innerWidth < 500 ? 10 : 12 },
                    labels: { fontSize: window.innerWidth < 500 ? 6 : 10 },
                  }}
                  alignment="middle"
                />
              ))}
            </VictoryGroup>
          </VictoryChart>
          <StyledSlider
            value={sliderValues}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            min={0}
            max={14}
            step={1}
          />
        </div>
      ) : null}
    </div>
  );
};

const StyledSlider = styled(Slider)`
  margin-top: 20px;
  color: #1b486a;
`;

export default TeamStats;
