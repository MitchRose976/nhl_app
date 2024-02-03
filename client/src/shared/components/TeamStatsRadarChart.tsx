import React from "react";
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

interface TeamStatsRadarChartProps {
  data: FormattedRechartDataItem[] | undefined;
}

const TeamStatsRadarChart: React.FC<TeamStatsRadarChartProps> = ({ data }) => {
  return data !== undefined && data.length > 0 ? (
    <ResponsiveContainer width={500} height={300}>
      <RadarChart
        cx="50%"
        cy="50%"
        outerRadius="80%"
        data={data}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="statType" />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        <Radar
          name="Team 1"
          dataKey="team1"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Radar
          name="Team 2"
          dataKey="team2"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.6}
        />
        <Radar
          name="Team 3"
          dataKey="team3"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.6}
        />
        <Tooltip />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  ) : (
    <div>No Data Found</div>
  );
};

export default TeamStatsRadarChart;
