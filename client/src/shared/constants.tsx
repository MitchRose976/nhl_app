export const menuItems: string[] = [
  "Home",
  "Standings",
  "League Stats",
  "Team Stats",
  "Player Stats",
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
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  24, 25, 26, 28, 29, 30, 52, 53, 54, 55,
];

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
