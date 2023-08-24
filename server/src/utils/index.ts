const formatYearMonthDay = (date: Date) => date.toISOString().slice(0, 10);

const formGetTeamRosterUrlString = (teamId: number) => {
  return `https://statsapi.web.nhl.com/api/v1/teams/${teamId}/roster`;
};

const formGetFullPlayerInfoUrlString = (playerId: string) =>
  `https://statsapi.web.nhl.com/api/v1/people/${playerId}`;

const formGetPlayerStatsUrlString = (
  playerId: string,
  currentSeason: string
) => {
  return `https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats?stats=statsSingleSeason&season=${currentSeason}`;
};

const formGetPlayerHeadshotUrlString = (playerId: string) =>
  `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${playerId}.jpg`;

const formatDecimalNumbers = (
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

export {
  formatYearMonthDay,
  formGetTeamRosterUrlString,
  formGetFullPlayerInfoUrlString,
  formGetPlayerStatsUrlString,
  formGetPlayerHeadshotUrlString,
  formatDecimalNumbers,
};
