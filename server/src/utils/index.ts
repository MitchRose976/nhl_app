import axios from "axios";
import { NHL_API_BASE } from "../constants";
import { PlayerBioFormattedType, TeamDataType } from "../types";

export const formatYearMonthDay = (date: Date) =>
  date.toISOString().slice(0, 10);

export const formGetTeamRosterUrlString = (
  teamAbbreviation: string,
  season: string
) => {
  // ex: https://api-web.nhle.com/v1/roster/TOR/20232024
  return `https://api-web.nhle.com/v1/roster/${teamAbbreviation}/${season}`;
};

export const formGetFullPlayerInfoUrlString = (playerId: string) =>
  // ex: https://api-web.nhle.com/v1/player/8479318/landing
  `https://api-web.nhle.com/v1/player/${playerId}/landing`;

/*
  Extracts and formats player info from nhl api response
*/
export const formatPlayerInfo = (playerInfo: PlayerBioFormattedType) => {
  const {
    headshot,
    featuredStats,
    careerTotals,
    seasonTotals,
    last5Games,
    ...rest
  } = playerInfo;
  return rest;
};

/*
  Gets current NHL season as a string
  if formatForApiCall is true, current season is returned as 20232024
  otherwise 2023/2024
*/
export const getCurrentSeason = async (formatForApiCall: boolean) => {
  const url = NHL_API_BASE + "/standings-season";
  const currentSeason = await axios.get(url).then((response) => {
    const current = response.data.seasons[response.data.seasons.length - 1].id;
    return formatForApiCall
      ? current
      : String(current).substring(0, 4) + "/" + String(current).substring(4);
  });
  return currentSeason;
};

export const getTeamStatsUrl = (season: string) =>
  `https://api.nhle.com/stats/rest/en/team/summary?isAggregate=false&isGame=false&sort=%5B%7B%22property%22:%22points%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22wins%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22teamId%22,%22direction%22:%22ASC%22%7D%5D&start=0&limit=50&factCayenneExp=gamesPlayed%3E=1&cayenneExp=gameTypeId=2%20and%20seasonId%3C=20232024%20and%20seasonId%3E=${season}`;

export const formatTeamStats = (teamStats: TeamDataType) => {
  const statsRequiringRoundingTo2Decimals = [
    "goalsAgainstPerGame",
    "goalsForPerGame",
    "shotsAgainstPerGame",
    "shotsForPerGame",
  ];
  const statsRequiringFormattingAsPercentage = [
    "faceoffWinPct",
    "penaltyKillNetPct",
    "penaltyKillPct",
    "pointPct",
    "powerPlayNetPct",
    "powerPlayPct",
  ];
  for (let stat in teamStats) {
    const value = teamStats[stat];
    if (value !== null && typeof value === "number") {
      if (statsRequiringRoundingTo2Decimals.includes(stat)) {
        teamStats[stat] = parseFloat(value.toFixed(2));
      } else if (statsRequiringFormattingAsPercentage.includes(stat)) {
        teamStats[stat] = parseFloat((value * 100).toFixed(2));
      }
    }
  }
  return teamStats;
};
