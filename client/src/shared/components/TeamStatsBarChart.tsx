import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FormattedRechartDataItem } from "../types";
import { TEAM_STATS_BAR_COLORS } from "../constants";
import { useState, useEffect } from "react";
import { getWindowSize } from "../utils";

interface TeamStatsBarChartProps {
  data: FormattedRechartDataItem[] | undefined;
  numOfTeamsToCompare: number;
  teamNamesInOrder: string[];
}

const TeamStatsBarChart: React.FC<TeamStatsBarChartProps> = ({
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

  return data !== undefined && data.length > 0 ? (
    <ResponsiveContainer
      width={
        windowSize.innerWidth < 1000
          ? windowSize.innerWidth - 80
          : windowSize.innerWidth / 2 - 50
      }
      height={500}
    >
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          top: 20,
          right: 0,
          left: 40,
          bottom: 0,
        }}
        barCategoryGap="15%"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, 100]} />
        <YAxis dataKey="statType" type="category" tick={{ fontSize: 12 }} />
        <Tooltip />
        <Legend />
        <Bar
          dataKey={`${teamNamesInOrder[0]}`}
          fill={TEAM_STATS_BAR_COLORS[0]}
          label={{ fontSize: 12, fill: "#000000", position: "right" }}
        />
        {numOfTeamsToCompare > 1 ? (
          <Bar
            dataKey={`${teamNamesInOrder[1]}`}
            fill={TEAM_STATS_BAR_COLORS[1]}
            label={{ fontSize: 12, fill: "#000000", position: "right" }}
          />
        ) : null}
        {numOfTeamsToCompare > 2 ? (
          <Bar
            dataKey={`${teamNamesInOrder[2]}`}
            fill={TEAM_STATS_BAR_COLORS[2]}
            label={{ fontSize: 12, fill: "#000000", position: "right" }}
          />
        ) : null}
      </BarChart>
    </ResponsiveContainer>
  ) : (
    <div>No Data Found</div>
  );
};

export default TeamStatsBarChart;
