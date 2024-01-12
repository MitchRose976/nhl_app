import axios from "axios";
import { NHL_API_BASE } from "../constants";
import { PlayerBioFormattedType } from "../types";

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
