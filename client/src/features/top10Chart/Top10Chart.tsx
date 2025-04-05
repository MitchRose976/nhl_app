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

const Top10Chart = () => {
  const queryHooks = useTop10Queries();
  const [queryType, setQueryType] = useState<QueryType>("getTop10Points");
  const [activeCard, setActiveCard] = useState(0);
  const [statType, setStatType] = useState<string>(statTypeMapping.points.type);
  const [showComponent, setShowComponent] = useState(false);
  const windowSize = useWindowSize();

  const chartData = queryHooks[queryType];

  useEffect(() => {
    setShowComponent(true);
  }, []);

  useEffect(() => {
    const newStat = Object.values(statTypeMapping).find(
      ({ type }) => statType === type
    );
    if (newStat) {
      setQueryType(newStat.queryName as QueryType);
    }
  }, [statType]);

  const handleTabChange = (event: React.SyntheticEvent, value: string) => {
    const newStatType = Object.values(statTypeMapping).find(
      ({ label }) => value === label
    );
    if (newStatType) {
      setStatType(newStatType.type);
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
        opacity: showComponent ? 1 : 0,
        transition: "opacity 0.5s ease-in",
      }}
      className={showComponent ? "fade-in" : ""}
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
        {chartData.data[activeCard] && (
          <MiniPlayerCard
            player={chartData.data[activeCard]}
            statType={statType}
          />
        )}
        <PlayerTable
          players={chartData.data}
          statType={statType}
          onPlayerHover={setActiveCard}
          windowWidth={windowSize.width}
        />
      </Box>
    </Container>
  );
};

export default Top10Chart;
