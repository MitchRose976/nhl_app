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


//export const BASE_URL = "https://nhl-live-game-tracker.onrender.com/nhl-app";
// to test locally
export const BASE_URL = "http://localhost:7000/nhl-app";
export const TOP_10_POINTS_PATH = "/players/top10Points";
export const TOP_10_GOALS_PATH = "/players/top10Goals";
export const TOP_10_ASSISTS_PATH = "/players/top10Assists";
export const TOP_10_PLUS_MINUS_PATH = "/players/top10PlusMinus";
export const TOP_10_PENALTY_MINUTES_PATH = "/players/top10PenaltyMinutes";
export const TOP_10_HITS_PATH = "/players/top10Hits";
export const TOP_10_TOTAL_TIME_ON_ICE_PATH = "/players/top10TotalTimeOnIce";
export const TOP_10_TIME_ON_ICE_PER_GAME_PATH =
  "/players/top10TimeOnIcePerGame";
export const TOP_10_TIME_ON_ICE_SHORT_HANDED_PATH =
  "/players/top10TimeOnIceShortHanded";
export const TOP_10_TIME_ON_ICE_POWERPLAY_PATH =
  "/players/top10TimeOnIcePowerplay";
export const TOP_10_POWERPLAY_GOALS_PATH = "/players/top10PowerplayGoals";
export const TOP_10_SHORT_HANDED_GOALS_PATH = "/players/top10ShortHandedGoals";
export const TOP_10_POWERPLAY_POINTS_PATH = "/players/top10PowerplayPoints";
export const TOP_10_SHORT_HANDED_POINTS_PATH =
  "/players/top10ShortHandedPoints";
export const TOP_10_FACE_OFF_PERCENTAGE_PATH =
  "/players/top10FaceOffPercentage";
export const TOP_10_SAVE_PERCENTAGE_PATH = "/players/top10SavePercentage";
export const TOP_10_WINS_PATH = "/players/top10Wins";
export const TOP_10_GOALS_AGAINST_AVERAGE_PATH =
  "/players/top10GoalsAgainstAverage";
export const GET_PLAYER_STATS_PATH = "/players/getPlayer";
export const GET_STANDINGS_PATH = "/teams/standings";
export const GET_SCORES_PATH = "/games/scores";

export const TOP_10_STATS_CATEGORIES = [
  { label: "Points", name: "Points" },
  { label: "Goals", name: "Goals" },
  { label: "Assists", name: "Assists" },
  { label: "+/-", name: "Plus Minus" },
  { label: "PiM", name: "Penalty Minutes" },
  { label: "Hits", name: "Hits" },
  { label: "Total ToI", name: "Total Time on Ice" },
  { label: "ToI/Game", name: "Time on Ice Per Game" },
  { label: "ToI SH", name: "Time on Ice Short Handed" },
  { label: "ToI PP", name: "Time on Ice Powerplay" },
  { label: "PP Goals", name: "Powerplay Goals" },
  { label: "SH Goals", name: "Shorthanded Goals" },
  { label: "PP Points", name: "Powerplay Points" },
  { label: "SH Points", name: "Shorthanded Points" },
  { label: "FO %", name: "Faceoff Percentage" },
  { label: "Save %", name: "Save Percentage" },
  { label: "Wins", name: "Wins" },
  { label: "GAA", name: "Goals Against Average" },
];

export const statTypeMapping: {
  [key: string]: {
    type: string;
    label: string;
    stat: string;
    queryName: string;
    tableType: string;
  };
} = {
  points: {
    type: "points",
    label: "Points",
    stat: "playerStats.splits[0].stat.points",
    queryName: "getTop10Points",
    tableType: "skater",
  },
  goals: {
    type: "goals",
    label: "Goals",
    stat: "playerStats.splits[0].stat.goals",
    queryName: "getTop10Goals",
    tableType: "skater",
  },
  assists: {
    type: "assists",
    label: "Assists",
    stat: "playerStats.splits[0].stat.assists",
    queryName: "getTop10Assists",
    tableType: "skater",
  },
  plusMinus: {
    type: "plusMinus",
    label: "+/-",
    stat: "playerStats.splits[0].stat.plusMinus",
    queryName: "getTop10PlusMinus",
    tableType: "skater",
  },
  penaltyMinutes: {
    type: "penaltyMinutes",
    label: "PiM",
    stat: "playerStats.splits[0].stat.penaltyMinutes",
    queryName: "getTop10PenaltyMinutes",
    tableType: "skater",
  },
  hits: {
    type: "hits",
    label: "Hits",
    stat: "playerStats.splits[0].stat.hits",
    queryName: "getTop10Hits",
    tableType: "skater",
  },
  timeOnIce: {
    type: "timeOnIce",
    label: "Total ToI",
    stat: "playerStats.splits[0].stat.timeOnIce",
    queryName: "getTop10TotalTimeOnIce",
    tableType: "skater",
  },
  timeOnIcePerGame: {
    type: "timeOnIcePerGame",
    label: "ToI/Game",
    stat: "playerStats.splits[0].stat.timeOnIcePerGame",
    queryName: "getTop10TimeOnIcePerGame",
    tableType: "skater",
  },
  shortHandedTimeOnIce: {
    type: "shortHandedTimeOnIce",
    label: "ToI SH",
    stat: "playerStats.splits[0].stat.shortHandedTimeOnIce",
    queryName: "getTop10TimeOnIceShortHanded",
    tableType: "skater",
  },
  powerPlayTimeOnIce: {
    type: "powerPlayTimeOnIce",
    label: "ToI PP",
    stat: "playerStats.splits[0].stat.powerPlayTimeOnIce",
    queryName: "getTop10TimeOnIcePowerplay",
    tableType: "skater",
  },
  powerPlayGoals: {
    type: "powerPlayGoals",
    label: "PP Goals",
    stat: "playerStats.splits[0].stat.powerPlayGoals",
    queryName: "getTop10PowerplayGoals",
    tableType: "skater",
  },
  shortHandedGoals: {
    type: "shortHandedGoals",
    label: "SH Goals",
    stat: "playerStats.splits[0].stat.shortHandedGoals",
    queryName: "getTop10ShortHandedGoals",
    tableType: "skater",
  },
  powerPlayPoints: {
    type: "powerPlayPoints",
    label: "PP Points",
    stat: "playerStats.splits[0].stat.powerPlayPoints",
    queryName: "getTop10PowerplayPoints",
    tableType: "skater",
  },
  shortHandedPoints: {
    type: "shortHandedPoints",
    label: "SH Points",
    stat: "playerStats.splits[0].stat.shortHandedPoints",
    queryName: "getTop10ShortHandedPoints",
    tableType: "skater",
  },
  faceOffPct: {
    type: "faceOffPct",
    label: "FO %",
    stat: "playerStats.splits[0].stat.faceOffPct",
    queryName: "getTop10FaceOffPercentage",
    tableType: "skater",
  },
  savePercentage: {
    type: "savePercentage",
    label: "Save %",
    stat: "playerStats.splits[0].stat.savePercentage",
    queryName: "getTop10SavePercentage",
    tableType: "goalie",
  },
  wins: {
    type: "wins",
    label: "Wins",
    stat: "playerStats.splits[0].stat.wins",
    queryName: "getTop10Wins",
    tableType: "goalie",
  },
  goalAgainstAverage: {
    type: "goalAgainstAverage",
    label: "GAA",
    stat: "playerStats.splits[0].stat.goalAgainstAverage",
    queryName: "getTop10GoalsAgainstAverage",
    tableType: "goalie",
  },
};

export enum statTypes {
  points = "points",
  goals = "goals",
  assists = "assists",
  plusMinus = "plusMinus",
  penaltyMinutes = "penaltyMinutes",
  hits = "hits",
  totalTOI = "totalTOI",
  toiPerGame = "toiPerGame",
  toiShortHanded = "toiShortHanded",
  toiPowerplay = "toiPowerplay",
  powerplayGoals = "powerplayGoals",
  shortHandedGoals = "shortHandedGoals",
  powerplayPoints = "powerplayPoints",
  shortHandedPoints = "shortHandedPoints",
  faceOffPercentage = "faceOffPercentage",
  savePercentage = "savePercentage",
  wins = "wins",
  goalsAgainstAverage = "goalsAgainstAverage",
}

export const nhlSeasons = [
  "2022/2023",
  "2021/2022",
  "2020/2021",
  "2019/2020",
  "2018/2019",
  "2017/2018",
  "2016/2017",
  "2015/2016",
  "2014/2015",
  "2013/2014",
  "2012/2013",
  "2011/2012",
  "2010/2011",
  "2009/2010",
  "2008/2009",
  "2007/2008",
  "2006/2007",
  "2005/2006",
  "2004/2005",
  "2003/2004",
  "2002/2003",
  "2001/2002",
  "2000/2001",
];

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
  // { statType: "winScoreFirst", label: "Win% - Scoring First" },
  // { statType: "winLeadFirstPer", label: "Win% - Leading 1st Period" },
  // { statType: "winLeadSecondPer", label: "Win% - Leading 2nd Period" },
  // { statType: "winOppScoreFirst", label: "Win% - Opponent Scores First" },
  // { statType: "winOutshootOpp", label: "Win% - Outshoot Opponent" },
  // { statType: "winOutshotByOpp", label: "Win% - Outshot By Opponent" },
];

// array of statTypes to be formatted
export const statTypesRequiringFormatting = [
  "winScoreFirst",
  "winLeadFirstPer",
  "winLeadSecondPer",
  "winOppScoreFirst",
  "winOutshootOpp",
  "winOutshotByOpp",
];

export const TEAM_STATS_BAR_COLORS = [
  "#45B29D",
  "#FFA5A5",
  "#387780",
  "#4B2B50",
  "#5C3E0E",
];
