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

export const TOP_10_STATS_CATEGORIES: {
  [key: string]: { label: string; name: string }[];
} = {
  skater: [
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
  ],
  goalie: [
    { label: "Save %", name: "Save Percentage" },
    { label: "Wins", name: "Wins" },
    { label: "GAA", name: "Goals Against Average" },
  ],
};

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
