import React, { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { FormattedRechartDataItem } from "../types";
import { TEAM_STATS_BAR_COLORS } from "../constants";
import { getWindowSize } from "../utils";

interface TeamStatsRadarChartProps {
  data: FormattedRechartDataItem[] | undefined;
  numOfTeamsToCompare: number;
  teamNamesInOrder: string[];
}

const TeamStatsRadarChart: React.FC<TeamStatsRadarChartProps> = ({
  data,
  numOfTeamsToCompare,
  teamNamesInOrder,
}) => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const CustomizedTick = (props: {
    x: number;
    y: number;
    payload: {
      coordinate: number;
      value: string;
      index: number;
      offset: number;
    };
  }) => {
    const { x, y, payload } = props;
    switch (payload.value) {
      case "Goals Against/Game":
        return (
          <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={0} fill="#666">
              <tspan textAnchor="middle" x="25">
                Goals
              </tspan>
              <tspan textAnchor="middle" x="25" dy="18">
                Against
              </tspan>
              <tspan textAnchor="middle" x="25" dy="18">
                /Game
              </tspan>
            </text>
          </g>
        );
      case "Goals/Game":
        return (
          <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={0} fill="#666">
              <tspan textAnchor="middle" x="17" dy="0">
                Goals
              </tspan>
              <tspan textAnchor="middle" x="17" dy="18">
                /Game
              </tspan>
            </text>
          </g>
        );
      case "Shots Against/Game":
        return (
          <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={0} fill="#666">
              <tspan textAnchor="middle" x="-25" y="-25">
                Shots
              </tspan>
              <tspan textAnchor="middle" x="-25" dy="18">
                Against
              </tspan>
              <tspan textAnchor="middle" x="-25" dy="18">
                /Game
              </tspan>
            </text>
          </g>
        );
      case "Shots/Game":
        return (
          <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={0} fill="#666">
              <tspan textAnchor="middle" x="-17">
                Shots
              </tspan>
              <tspan textAnchor="middle" x="-17" dy="15">
                /Game
              </tspan>
            </text>
          </g>
        );
      case "Point %":
        return (
          <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={0} fill="#666">
              <tspan textAnchor="middle" x="0">
                {payload.value}
              </tspan>
            </text>
          </g>
        );
      case "Faceoff %":
        return (
          <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={0} fill="#666">
              <tspan textAnchor="middle" x="30">
                {payload.value}
              </tspan>
            </text>
          </g>
        );

      default:
        return (
          <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} fill="#666">
              <tspan textAnchor="middle" x="0">
                {payload.value}
              </tspan>
            </text>
          </g>
        );
    }
  };

  return data !== undefined && data.length > 0 ? (
    <ResponsiveContainer
      width={
        windowSize.innerWidth < 1000
          ? windowSize.innerWidth - 80
          : windowSize.innerWidth / 2 - 50
      }
      height={500}
    >
      <RadarChart
        cx="50%"
        cy="45%"
        outerRadius="80%"
        data={data}
        margin={{
          top: 0,
          right: 30,
          bottom: windowSize.innerWidth < 450 ? 0 : 30,
          left: 30,
        }}
      >
        <PolarGrid />
        <PolarAngleAxis
          dataKey="statType"
          tick={(e) => {
            return <CustomizedTick x={e.x} y={e.y} payload={e.payload} />;
          }}
        />
        <PolarRadiusAxis angle={70} domain={[0, 100]} />
        <Radar
          name={`${teamNamesInOrder[0]}`}
          dataKey={`${teamNamesInOrder[0]}`}
          stroke={TEAM_STATS_BAR_COLORS[0]}
          fill={TEAM_STATS_BAR_COLORS[0]}
          fillOpacity={0.6}
        />
        {numOfTeamsToCompare > 1 ? (
          <Radar
            name={`${teamNamesInOrder[1]}`}
            dataKey={`${teamNamesInOrder[1]}`}
            stroke={TEAM_STATS_BAR_COLORS[1]}
            fill={TEAM_STATS_BAR_COLORS[1]}
            fillOpacity={0.6}
          />
        ) : null}
        {numOfTeamsToCompare > 2 ? (
          <Radar
            name={`${teamNamesInOrder[2]}`}
            dataKey={`${teamNamesInOrder[2]}`}
            stroke={TEAM_STATS_BAR_COLORS[2]}
            fill={TEAM_STATS_BAR_COLORS[2]}
            fillOpacity={0.6}
          />
        ) : null}
        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{ marginBottom: "1.5rem" }} />
      </RadarChart>
    </ResponsiveContainer>
  ) : (
    <div>No Data Found</div>
  );
};

export default TeamStatsRadarChart;
