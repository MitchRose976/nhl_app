import React, { useEffect, useState } from "react";
import TeamSelectDropdown from "./components/TeamSelectDropdown";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup } from "victory";
import {
  PRE_GAME_STATS_TYPES,
  TEAM_STATS_BAR_COLORS,
} from "../../shared/constants";
import styled from "@emotion/styled";
import { Slider } from "@mui/material";
import CustomLegend from "./components/CustomLegend";
import { formattedTeamStatType } from "../../shared/types";
import "../../shared/style.scss";
import Loader from "../../shared/components/Loader";
import { Tooltip } from "react-tooltip";
import "./style.scss";
import { useGetTeamStatsFormattedQuery } from "../api/apiSlice";

const TeamStats = () => {
  // variables
  const allCategories = PRE_GAME_STATS_TYPES.map((item) => item.label);
  const chartWidth = window.innerWidth < 500 ? 300 : 800;
  const chartHeight = window.innerWidth < 500 ? 400 : 600;

  // queries
  const { data, isLoading, isSuccess, isError } = useGetTeamStatsFormattedQuery();

  // states
  const [numOfTeamsToCompare, setNumOfTeamsToCompare] = useState<number>(1);
  const [sliderValues, setSliderValues] = useState<number[]>([
    0,
    allCategories.length,
  ]);
  const [activeCategories, setActiveCategories] = useState(
    allCategories.slice(sliderValues[0], sliderValues[1])
  );
  const [visibleData, setVisibleData] = useState(() => {
    const initialData = data?.slice(0, numOfTeamsToCompare).map((team) => {
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
  const [showComponent, setShowComponent] = useState(false);
  const [barWidth, setBarWidth] = useState(12);
  const [tooltipData, setTooltipData] = useState<{
    index: null | number;
    x: number;
    y: number;
    content: string | null;
  }>({
    index: null,
    x: 0,
    y: 0,
    content: null,
  });

  useEffect(() => {
    setShowComponent(true);
  }, []);


  const handleSliderChange = (_event: Event, newValues: number | number[]) => {
    if (Array.isArray(newValues)) {
      setSliderValues(newValues);
      setActiveCategories(allCategories.slice(...newValues));
    }
  };

  // Function to handle changes in visibleData
  const handleVisibleDataChange = () => {
    const updatedData = data.slice(0, numOfTeamsToCompare).map((team) => {
      const barData = team.data.slice(sliderValues[0], sliderValues[1]);
      return { ...team, data: barData };
    });
    setVisibleData(updatedData);
  };

  const handleBarWidth = () => {
    if (window.innerWidth < 500 && numOfTeamsToCompare > 1) {
      return 3;
    } else if (window.innerWidth > 500 && numOfTeamsToCompare > 1) {
      return 7;
    } else if (
      window.innerWidth > 500 &&
      window.innerWidth < 1000 &&
      numOfTeamsToCompare > 1
    ) {
      return 9;
    }
    return 15;
  };

  useEffect(() => {
    handleVisibleDataChange();
    setChartKey((prevKey) => prevKey + 1);
    setBarWidth(handleBarWidth());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, numOfTeamsToCompare, sliderValues, isLoading]);

  console.log('mitch data: ', data)

  return (
    <div>
      <TeamSelectDropdown
        setNumOfTeamsToCompare={setNumOfTeamsToCompare}
        numOfTeamsToCompare={numOfTeamsToCompare}
      />
      {isLoading ? <Loader /> : null}
      {/* {!isLoading && data? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <strong>Error while fetching data</strong>
        </Alert>
      ) : null} */}
      {data && !isLoading ? (
        <div
          style={{
            opacity: showComponent ? 1 : 0,
            transition: "opacity 0.5s ease-in",
          }}
          className={showComponent ? "fade-in" : ""}
        >
          <CustomLegend data={data.slice(0, numOfTeamsToCompare)} />
          <VictoryChart
            width={chartWidth}
            height={chartHeight}
            padding={{ bottom: 140, right: 80, left: 50, top: 20 }}
            key={chartKey}
          >
            {/* Y-axis */}
            <VictoryAxis
              dependentAxis
              tickFormat={(tick) => `${tick}`}
              domain={[0, 100]}
              style={{
                tickLabels: { fontSize: window.innerWidth < 500 ? 8 : 12 },
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
            />
            <VictoryGroup
              offset={window.innerWidth < 500 ? 3 : 12}
              colorScale={TEAM_STATS_BAR_COLORS}
              animate={{
                duration: 2000,
                onLoad: { duration: 500 },
              }}
            >
              {visibleData.map((team, index) => {
                return (
                  <VictoryBar
                    key={`bar-${index}`}
                    data={team.data}
                    x="x"
                    y="y"
                    labels={({ datum }) => `${datum.y}`}
                    style={{
                      data: { width: window.innerWidth < 500 ? 10 : 12 },
                      labels: { fontSize: window.innerWidth < 500 ? 6 : 10 },
                    }}
                    alignment="middle"
                    barWidth={barWidth}
                    //data-tooltip-id={`tooltip-${tooltipData.index}`}
                    data-tooltip-id={`tooltip-${tooltipData.index}`}
                    data-tooltip-content={`${tooltipData.content}`}
                    data-tooltip-place="top"
                    events={[
                      {
                        target: "data",
                        eventHandlers: {
                          onMouseEnter: (event, props) => {
                            const mouseEvent = event as unknown as MouseEvent;
                            return [
                              {
                                target: "data",
                                mutation: () => {
                                  const xPos = mouseEvent.clientX;
                                  const yPos = mouseEvent.clientY;
                                  setTooltipData({
                                    index: props.index,
                                    x: xPos,
                                    y: yPos,
                                    content: `${props.datum.x}: ${props.datum.y}`,
                                  });
                                },
                              },
                            ];
                          },
                          onMouseLeave: () => {
                            return [
                              {
                                target: "data",
                                mutation: () => {
                                  setTooltipData({
                                    index: null,
                                    x: 0,
                                    y: 0,
                                    content: null,
                                  });
                                },
                              },
                            ];
                          },
                        },
                      },
                    ]}
                  />
                );
              })}
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
          <Tooltip
            id={`tooltip-${tooltipData.index}`}
            position={{ x: tooltipData.x, y: tooltipData.y }}
            className="team-stats-tooltip"
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
