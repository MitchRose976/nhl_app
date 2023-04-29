import React, { useEffect, useRef, useState } from "react";
import { Container } from "@mui/system";
import {
  Box,
  Tab,
  Tabs,
  Divider,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material";
import {
  statTypeMapping,
  statTypes,
  TOP_10_STATS_CATEGORIES,
} from "../../shared/constants";
import MiniPlayerCard from "../../shared/components/MiniPlayerCard";
import { apiSlice } from "../api/apiSlice";
import { PlayerDataType } from "../../../../server/src/types";

const Top10Chart = () => {
  const queryHooks: { [key: string]: any } = {
    getTop10Points: apiSlice.endpoints.getTop10Points.useQuery(),
    getTop10Goals: apiSlice.endpoints.getTop10Goals.useQuery(),
    getTop10Assists: apiSlice.endpoints.getTop10Assists.useQuery(),
    getTop10PlusMinus: apiSlice.endpoints.getTop10PlusMinus.useQuery(),
    getTop10PenaltyMinutes:
      apiSlice.endpoints.getTop10PenaltyMinutes.useQuery(),
    getTop10Hits: apiSlice.endpoints.getTop10Hits.useQuery(),
    getTop10TotalTimeOnIce:
      apiSlice.endpoints.getTop10TotalTimeOnIce.useQuery(),
    getTop10TimeOnIcePerGame:
      apiSlice.endpoints.getTop10TimeOnIcePerGame.useQuery(),
    getTop10TimeOnIceShortHanded:
      apiSlice.endpoints.getTop10TimeOnIceShortHanded.useQuery(),
    getTop10TimeOnIcePowerplay:
      apiSlice.endpoints.getTop10TimeOnIcePowerplay.useQuery(),
    getTop10PowerplayGoals:
      apiSlice.endpoints.getTop10PowerplayGoals.useQuery(),
    getTop10ShortHandedGoals:
      apiSlice.endpoints.getTop10ShortHandedGoals.useQuery(),
    getTop10PowerplayPoints:
      apiSlice.endpoints.getTop10PowerplayPoints.useQuery(),
    getTop10ShortHandedPoints:
      apiSlice.endpoints.getTop10ShortHandedPoints.useQuery(),
    getTop10FaceOffPercentage:
      apiSlice.endpoints.getTop10FaceOffPercentage.useQuery(),
    getTop10SavePercentage:
      apiSlice.endpoints.getTop10SavePercentage.useQuery(),
    getTop10Wins: apiSlice.endpoints.getTop10Wins.useQuery(),
    getTop10GoalsAgainstAverage:
      apiSlice.endpoints.getTop10GoalsAgainstAverage.useQuery(),
  };

  // used to select corresponding endpoint from backend based on statType
  const [queryType, setQueryType] = useState<string>(
    statTypeMapping.points.queryName
  );
  // skater, goalie, or team stats
  const [tableType, setTableType] = useState<string>(
    statTypeMapping.points.tableType
  );
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const [activeCard, setActiveCard] = useState(0);
  const [statType, setStatType] = useState<string>(statTypes.points);

  let chartData = queryHooks[queryType];

  useEffect(() => {
    const newStat = Object.values(statTypeMapping).find(
      ({ type }) => statType === type
    );
    if (newStat) {
      setTableType(newStat.tableType);
      setQueryType(newStat.queryName);
    }
  }, [statType]);

  const renderTabs = () => {
    return TOP_10_STATS_CATEGORIES[tableType].map((category, index) => {
      return <Tab key={index} label={category.label} value={category.label} />;
    });
  };

  const handleTabChange = (event: React.SyntheticEvent, value: string) => {
    const newStatType = Object.values(statTypeMapping).find(
      ({ label }) => value === label
    );
    if (newStatType) {
      setStatType(newStatType.type);
    }
  };

  return (
    <>
      {chartData.isLoading && <CircularProgress />}
      {chartData.isError && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <strong>Error while fetching data</strong>
        </Alert>
      )}
      {chartData.isSuccess && (
        <Container maxWidth="md" sx={{ border: "1px solid black" }}>
          <Tabs
            value={false} // needs to change
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {renderTabs()}
          </Tabs>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <MiniPlayerCard
              player={chartData.data[activeCard]}
              statType={statType}
            />
            <TableContainer
              sx={{
                maxWidth: windowSize.current[0] < 500 ? "45%" : "40%",
                // border: "1px solid black",
              }}
            >
              <Table size="small">
                <TableBody>
                  {chartData.data.map((item: PlayerDataType, index: number) => (
                    <TableRow
                      key={index}
                      onMouseEnter={() => setActiveCard(index)}
                    >
                      <TableCell
                        size={"small"}
                        sx={{
                          fontSize:
                            windowSize.current[0] < 500 ? "0.65rem" : "0.85rem",
                        }}
                      >
                        {item.playerInfo.fullName}
                      </TableCell>
                      <TableCell>
                        {item.playerStats.splits[0].stat[statType]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Top10Chart;
