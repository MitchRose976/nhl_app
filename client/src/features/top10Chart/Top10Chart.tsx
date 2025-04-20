import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";
import { Box, Tab, Tabs, Divider } from "@mui/material";
import {
  statTypeMapping,
  TOP_10_STATS_CATEGORIES,
} from "../../shared/constants";
import MiniPlayerCard from "../../shared/components/MiniPlayerCard";
import { useWindowSize } from "../../shared/hooks/useWindowSize";
import { useTop10Queries, QueryType } from "./hooks/useTop10Queries";
import PlayerTable from "./components/PlayerTable";
import StatusAlerts from "./components/StatusAlerts";

interface ChartState {
  queryType: QueryType;
  statType: string;
  activeCard: number;
  showComponent: boolean;
}

const initialState: ChartState = {
  queryType: "getTop10Points",
  statType: statTypeMapping.points.type,
  activeCard: 0,
  showComponent: false,
};

const Top10Chart = () => {
  const queryHooks = useTop10Queries();
  const [state, setState] = useState<ChartState>(initialState);
  const windowSize = useWindowSize();

  const chartData = queryHooks[state.queryType];

  useEffect(() => {
    setState(prev => ({ ...prev, showComponent: true }));
  }, []);

  useEffect(() => {
    const newStat = Object.values(statTypeMapping).find(
      ({ type }) => state.statType === type
    );
    if (newStat) {
      setState(prev => ({ ...prev, queryType: newStat.queryName as QueryType }));
    }
  }, [state.statType]);

  const handleTabChange = (event: React.SyntheticEvent, value: string) => {
    const newStatType = Object.values(statTypeMapping).find(
      ({ label }) => value === label
    );
    if (newStatType) {
      setState(prev => ({ ...prev, statType: newStatType.type }));
    }
  };

  if (!chartData.isSuccess || !chartData.data || chartData.data.length === 0) {
    return <StatusAlerts {...chartData} data={chartData.data} />;
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        padding: "2rem 0",
        marginTop: "2rem",
        opacity: state.showComponent ? 1 : 0,
        transition: "opacity 0.5s ease-in",
      }}
      className={state.showComponent ? "fade-in" : ""}
    >
      <Tabs
        value={false}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Tabs for player stat types"
      >
        {TOP_10_STATS_CATEGORIES.map((category, index) => (
          <Tab key={index} label={category.label} value={category.label} />
        ))}
      </Tabs>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {chartData.data[state.activeCard] && (
          <MiniPlayerCard
            player={chartData.data[state.activeCard]}
            statType={state.statType}
          />
        )}
        <PlayerTable
          players={chartData.data}
          statType={state.statType}
          onPlayerHover={(index) => setState(prev => ({ ...prev, activeCard: index }))}
          windowWidth={windowSize.width}
        />
      </Box>
    </Container>
  );
};

export default Top10Chart;
