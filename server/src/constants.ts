const TEAM_IDS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  24, 25, 26, 28, 29, 30, 52, 53, 54, 55,
];
// base url to grab all teams in the league
const GET_TEAMS_BASE_URL = "https://statsapi.web.nhl.com/api/v1/teams";

// origin url for cors
const CLIENT_URL = 'http://localhost:3000';

export { TEAM_IDS, GET_TEAMS_BASE_URL, CLIENT_URL };
