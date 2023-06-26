import React from "react";
import { TEAM_STATS_BAR_COLORS } from "../../../shared/constants";
import { formattedTeamStatType } from "../../../shared/types";

interface LegendProps {
  color: string;
  label: string;
}

const LegendItem = ({ color, label }: LegendProps) => (
  <div style={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
    <div
      style={{
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: color,
        marginRight: "5px",
      }}
    />
    <span>{label}</span>
  </div>
);

const CustomLegend = (data: { data: formattedTeamStatType[] }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "left",
        alignItems: "left",
        margin: "1rem 0 3rem 0",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "left",
          margin: "1rem 0 1rem 1rem",
          border: '1px solid black',
          padding: '1rem'
        }}
      >
        {data.data.map((team, index) => (
          <LegendItem
            key={team.teamName}
            color={TEAM_STATS_BAR_COLORS[index]}
            label={team.teamName}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomLegend;
