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

export {
  formatYearMonthDay,
  formGetTeamRosterUrlString,
  formGetFullPlayerInfoUrlString,
  formGetPlayerStatsUrlString,
  formGetPlayerHeadshotUrlString,
};
