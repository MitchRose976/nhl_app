export const menuItems = [
  { label: "Home", path: "/" },
  { label: "Standings", path: "/standings" },
  // {label: "League Stats", path: '/leagueStats'},
  { label: "Team Stats", path: "/teamStats" },
  { label: "Player Stats", path: "/playerStats" },
];

export const statsTableHeaderCells = [
  "Gp",
  "G",
  "A",
  "Pts",
  "Pim",
  "+/-",
  "Hits",
  "Ppg",
  "Ppp",
  "Shg",
  "Shp",
  "Shots",
  "Fo%",
  "Shot%",
  "Blocked",
  "Toi/total",
  "Toi/game",
  "Toi/pp/total",
  "Toi/pp/game",
  "Toi/sh/total",
  "Toi/sh/game",
];

export const biographyTableHeaderCells = ["Born", "Age", "Height", "Weight"];

export const TEAM_IDS = [
  { teamID: 23, name: "New Jersey Devils", abbreviation: "NJD" },
  { teamID: 22, name: "New York Islanders", abbreviation: "NYI" },
  { teamID: 10, name: "New York Rangers", abbreviation: "NYR" },
  { teamID: 16, name: "Philadelphia Flyers", abbreviation: "PHI" },
  { teamID: 17, name: "Pittsburgh Penguins", abbreviation: "PIT" },
  { teamID: 6, name: "Boston Bruins", abbreviation: "BOS" },
  { teamID: 19, name: "Buffalo Sabres", abbreviation: "BUF" },
  { teamID: 1, name: "Montréal Canadiens", abbreviation: "MTL" },
  { teamID: 30, name: "Ottawa Senators", abbreviation: "OTT" },
  { teamID: 5, name: "Toronto Maple Leafs", abbreviation: "TOR" },
  { teamID: 26, name: "Carolina Hurricanes", abbreviation: "CAR" },
  { teamID: 33, name: "Florida Panthers", abbreviation: "FLA" },
  { teamID: 31, name: "Tampa Bay Lightning", abbreviation: "TBL" },
  { teamID: 24, name: "Washington Capitals", abbreviation: "WSH" },
  { teamID: 11, name: "Chicago Blackhawks", abbreviation: "CHI" },
  { teamID: 12, name: "Detroit Red Wings", abbreviation: "DET" },
  { teamID: 34, name: "Nashville Predators", abbreviation: "NSH" },
  { teamID: 18, name: "St. Louis Blues", abbreviation: "STL" },
  { teamID: 21, name: "Calgary Flames", abbreviation: "CGY" },
  { teamID: 27, name: "Colorado Avalanche", abbreviation: "COL" },
  { teamID: 25, name: "Edmonton Oilers", abbreviation: "EDM" },
  { teamID: 20, name: "Vancouver Canucks", abbreviation: "VAN" },
  { teamID: 32, name: "Anaheim Ducks", abbreviation: "ANA" },
  { teamID: 15, name: "Dallas Stars", abbreviation: "DAL" },
  { teamID: 14, name: "Los Angeles Kings", abbreviation: "LAK" },
  { teamID: 29, name: "San Jose Sharks", abbreviation: "SJS" },
  { teamID: 36, name: "Columbus Blue Jackets", abbreviation: "CBJ" },
  { teamID: 37, name: "Minnesota Wild", abbreviation: "MIN" },
  { teamID: 35, name: "Winnipeg Jets", abbreviation: "WPG" },
  { teamID: 28, name: "Arizona Coyotes", abbreviation: "ARI" },
  { teamID: 38, name: "Vegas Golden Knights", abbreviation: "VGK" },
  { teamID: 39, name: "Seattle Kraken", abbreviation: "SEA" },
];


export const BASE_URL = "https://nhl-live-game-tracker.onrender.com/nhl-app";
// to test locally
// export const BASE_URL = "http://localhost:7000/nhl-app";
export const TOP_10_POINTS_PATH = "/players/top10Points";
export const TOP_10_GOALS_PATH = "/players/top10Goals";
export const TOP_10_ASSISTS_PATH = "/players/top10Assists";
export const TOP_10_PLUS_MINUS_PATH = "/players/top10PlusMinus";
export const TOP_10_PENALTY_MINUTES_PATH = "/players/top10PenaltyMinutes";
export const TOP_10_TIME_ON_ICE_PER_GAME_PATH =
  "/players/top10TimeOnIcePerGame";
export const TOP_10_POWERPLAY_GOALS_PATH = "/players/top10PowerplayGoals";
export const TOP_10_SHORT_HANDED_GOALS_PATH = "/players/top10ShortHandedGoals";
export const TOP_10_POWERPLAY_POINTS_PATH = "/players/top10PowerplayPoints";
export const TOP_10_SHORT_HANDED_POINTS_PATH =
  "/players/top10ShortHandedPoints";
export const TOP_10_FACE_OFF_PERCENTAGE_PATH =
  "/players/top10FaceOffPercentage";
export const TOP_10_SHOOTING_PERCENTAGE_PATH = "/players/top10ShootingPercentage"
export const TOP_10_SHOTS_ON_NET_PATH = "players/top10ShotsOnNet"
export const TOP_10_GAME_WINNING_GOALS_PATH = "players/top10GameWinningGoals"
export const TOP_10_OT_GOALS_PATH = "players/top10OtGoals"
export const TOP_10_SAVE_PERCENTAGE_PATH = "/players/top10SavePercentage";
export const TOP_10_WINS_PATH = "/players/top10Wins";
export const TOP_10_LOSSES_PATH = "/players/top10Losses";
export const TOP_10_GAMES_STARTED_PATH = "/players/top10GamesStarted"
export const TOP_10_SHUTOUTS_PATH = "/players/top10Shutouts"
export const TOP_10_GOALS_AGAINST_AVERAGE_PATH =
  "/players/top10GoalsAgainstAverage";
export const GET_STANDINGS_PATH = "/teams/standings";
export const GET_SCORES_PATH = "/games/scores";
export const GET_TEAM_STATS_PATH = "/teams/stats"

export const TOP_10_STATS_CATEGORIES = [
  { label: "Points", name: "Points" },
  { label: "Goals", name: "Goals" },
  { label: "Assists", name: "Assists" },
  { label: "+/-", name: "Plus Minus" },
  { label: "PiM", name: "Penalty Minutes" },
  { label: "ToI/Game", name: "Time on Ice Per Game" },
  { label: "PP Goals", name: "Powerplay Goals" },
  { label: "SH Goals", name: "Shorthanded Goals" },
  { label: "PP Points", name: "Powerplay Points" },
  { label: "SH Points", name: "Shorthanded Points" },
  { label: "FO %", name: "Faceoff Percentage" },
  { label: "Shoot%", name: "Shooting Percentage" },
  { label: "SoN", name: "Shots on Net" },
  { label: "GWG", name: "Game Winning Goals" },
  { label: "OTG", name: "OT Goals" },
  { label: "Save %", name: "Save Percentage" },
  { label: "Wins", name: "Wins" },
  { label: "Losses", name: "Losses" },
  { label: "GS", name: "Games Started" },
  { label: "SO", name: "Shutouts" },
  { label: "GAA", name: "Goals Against Average" },
];

export const statTypeMapping: {
  [key: string]: {
    type: string;
    label: string;
    queryName: string;
    tableType: string;
  };
} = {
  points: {
    type: "points",
    label: "Points",
    queryName: "getTop10Points",
    tableType: "skater",
  },
  goals: {
    type: "goals",
    label: "Goals",
    queryName: "getTop10Goals",
    tableType: "skater",
  },
  assists: {
    type: "assists",
    label: "Assists",
    queryName: "getTop10Assists",
    tableType: "skater",
  },
  plusMinus: {
    type: "plusMinus",
    label: "+/-",
    queryName: "getTop10PlusMinus",
    tableType: "skater",
  },
  pim: {
    type: "pim",
    label: "PiM",
    queryName: "getTop10PenaltyMinutes",
    tableType: "skater",
  },
  avgToi: {
    type: "avgToi",
    label: "ToI/Game",
    queryName: "getTop10TimeOnIcePerGame",
    tableType: "skater",
  },
  powerPlayGoals: {
    type: "powerPlayGoals",
    label: "PP Goals",
    queryName: "getTop10PowerplayGoals",
    tableType: "skater",
  },
  shorthandedGoals: {
    type: "shorthandedGoals",
    label: "SH Goals",
    queryName: "getTop10ShortHandedGoals",
    tableType: "skater",
  },
  powerPlayPoints: {
    type: "powerPlayPoints",
    label: "PP Points",
    queryName: "getTop10PowerplayPoints",
    tableType: "skater",
  },
  shorthandedPoints: {
    type: "shorthandedPoints",
    label: "SH Points",
    queryName: "getTop10ShortHandedPoints",
    tableType: "skater",
  },
  faceoffWinningPctg: {
    type: "faceoffWinningPctg",
    label: "FO %",
    queryName: "getTop10FaceOffPercentage",
    tableType: "skater",
  },
  shootingPctg: {
    type: "shootingPctg",
    label: "Shoot%",
    queryName: "getTop10ShootingPercentage",
    tableType: "skater",
  },
  shots: {
    type: "shots",
    label: "SoN",
    queryName: "getTop10ShotsOnNet",
    tableType: "skater",
  },
  gameWinningGoals: {
    type: "gameWinningGoals",
    label: "GWG",
    queryName: 'getTop10GameWinningGoals',
    tableType: "skater",
  },
  otGoals: {
    type: "otGoals",
    label: "OTG",
    queryName: "getTop10OtGoals",
    tableType: "skater",
  },
  savePctg: {
    type: "savePctg",
    label: "Save %",
    queryName: "getTop10SavePercentage",
    tableType: "goalie",
  },
  wins: {
    type: "wins",
    label: "Wins",
    queryName: "getTop10Wins",
    tableType: "goalie",
  },
  losses: {
    type: "losses",
    label: "Losses",
    queryName: "getTop10Losses",
    tableType: "goalie",
  },
  gamesStarted: {
    type: "gamesStarted",
    label: "GS",
    queryName: "getTop10GamesStarted",
    tableType: "goalie",
  },
  shutouts: {
    type: "shutouts",
    label: "SO",
    queryName: "getTop10Shutouts",
    tableType: "goalie",
  },
  goalsAgainstAvg: {
    type: "goalsAgainstAvg",
    label: "GAA",
    queryName: "getTop10GoalsAgainstAverage",
    tableType: "goalie",
  },
};

export const LIVE_GAME_STATS_TYPES = [
  { statType: "shots", label: "Shots" },
  { statType: "blocked", label: "Shots Blocked" },
  { statType: "faceOffWinPercentage", label: "Faceoff %" },
  { statType: "giveaways", label: "Giveaways" },
  { statType: "hits", label: "Hits" },
  { statType: "pim", label: "Penalty Minutes" },
  { statType: "powerPlay", label: "Powerplay Goals" },
  { statType: "takeaways", label: "Takeaways" },
];

export const PRE_GAME_STATS_TYPES = [
  { statType: "pointPct", label: "Point %" },
  { statType: "faceoffWinPct", label: "Faceoff %" },
  { statType: "goalsForPerGame", label: "Goals/Game" },
  { statType: "goalsAgainstPerGame", label: "Goals Against/Game" },
  { statType: "penaltyKillPct", label: "PK%" },
  { statType: "powerPlayPct", label: "PP%" },
  { statType: "shotsForPerGame", label: "Shots/Game" },
  { statType: "shotsAgainstPerGame", label: "Shots Against/Game" },
];

export const TEAM_STATS_BAR_COLORS = [
  "#45B29D",
  "#FFA5A5",
  "#387780",
  "#4B2B50",
  "#5C3E0E",
];
