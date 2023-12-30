import { PlayerBioFormattedType } from "../types";

export const formatYearMonthDay = (date: Date) => date.toISOString().slice(0, 10);

export const formGetTeamRosterUrlString = (teamAbbreviation: string, season: string) => {
  // ex: https://api-web.nhle.com/v1/roster/TOR/20232024
  return `https://api-web.nhle.com/v1/roster/${teamAbbreviation}/${season}`;
};

export const formGetFullPlayerInfoUrlString = (playerId: string) =>
  // https://api-web.nhle.com/v1/player/8479318/landing
  `https://api-web.nhle.com/v1/player/${playerId}/landing`;

export const formGetPlayerStatsUrlString = (
  playerId: string,
  currentSeason: string
) => {
  // https://api-web.nhle.com/v1/player/8479318/landing
  return `https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats?stats=statsSingleSeason&season=${currentSeason}`;
};

export const formGetPlayerHeadshotUrlString = (playerId: string) =>
  `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${playerId}.jpg`;

export const formatPlayerInfo = (playerInfo: PlayerBioFormattedType) => {
  const { headshot, featuredStats, careerTotals, seasonTotals, last5Games, ...rest } = playerInfo;
  return rest;
}

export const formatDecimalNumbers = (
  data: Record<string, any>
): Record<string, any> => {

  const hasMoreThanTwoDecimalPlaces = (number: number | string) => {
    const decimalIndex = number.toString().indexOf(".");
    if (decimalIndex === -1) {
      return false; // No decimal places
    }
    const decimalPlaces = number.toString().substring(decimalIndex + 1);
    return decimalPlaces.length > 2;
  };

  // these stat types are decimal (ex. 0.86) and need to be returned as whole numbers (ex. 86)
  const statTypesRequiringFormatting = [
    "winScoreFirst",
    "winLeadFirstPer",
    "winLeadSecondPer",
    "winOppScoreFirst",
    "winOutshootOpp",
    "winOutshotByOpp",
  ];

  const formattedData: Record<string, any> = {};

  for (const key in data) {
    const value = data[key];
    if (key === "savePctg") {
      formattedData[key] = Number(value);
    } else if (statTypesRequiringFormatting.includes(key)) {
      formattedData[key] = hasMoreThanTwoDecimalPlaces(value * 100)
        ? Number((value * 100).toFixed(1))
        : value * 100;
    } else if (typeof value === "number") {
      formattedData[key] = Number(value.toFixed(2));
    } else {
      formattedData[key] = Number(value);
    }
  }

  return formattedData;
};

export const getCurrentSeason = (formatForApiCall: boolean) => {
  // if formatForApiCall is true, current season is returned as 20232024
  // otherwise 2023/2024
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  if (day === 30 && month === 9) {
    return formatForApiCall ? `${year - 1}${year}` : `${year - 1}/${year}`;
  } else {
    return formatForApiCall ? `${year}${year + 1}` : `${year}/${year + 1}`;
  }
};
