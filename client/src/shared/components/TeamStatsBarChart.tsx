import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FormattedRechartDataItem } from "../types";

interface TeamStatsBarChartProps {
  data: FormattedRechartDataItem[] | undefined;
}

const TeamStatsBarChart: React.FC<TeamStatsBarChartProps> = ({ data }) => {
  return data !== undefined && data.length > 0 ? (
    <ResponsiveContainer width={500} height={300}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="statType" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="team1"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="team2"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
        <Bar
          dataKey="team3"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
  ) : (
    <div>No Data Found</div>
  );
};

export default TeamStatsBarChart;
