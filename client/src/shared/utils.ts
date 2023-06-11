import { PlayerDataType, TeamRecordInterface } from "../../../server/src/types";
import { statTypeMapping } from "./constants";

export const formGetTeamLogoUrl = (teamID: number) =>
  `https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${teamID}.svg`;

export const formatStat = (player: PlayerDataType, statType: string) => {
  if (statType === statTypeMapping.savePercentage.type) {
    return `${Number(player.playerStats.splits[0].stat[statType])
      .toFixed(3)
      .toString()}%`;
  } else if (statType === statTypeMapping.goalAgainstAverage.type) {
    return Number(player.playerStats.splits[0].stat[statType])
      .toFixed(2)
      .toString();
  } else if (statType === statTypeMapping.faceOffPct.type) {
    return `${player.playerStats.splits[0].stat[statType]}%`;
  } else {
    return player.playerStats.splits[0].stat[statType];
  }
};

export const getTeamStat = (
  team: TeamRecordInterface,
  stat: { label: string; stat: string; type: string }
) => {
  const statLabel = stat.label;
  switch (statLabel) {
    case "Team":
      return team.team.name;
    case "GP":
      return team.gamesPlayed;
    case "W":
      return team.leagueRecord.wins;
    case "L":
      return team.leagueRecord.losses;
    case "OTL":
      return team.leagueRecord.ot;
    case "Pts":
      return team.points;
    case "GF":
      return team.goalsScored;
    case "GA":
      return team.goalsAgainst;
    case "Diff":
      return team.goalsScored - team.goalsAgainst;
    case "L10":
      return "placeholder";
    case "Strk":
      return team.streak.streakCode;
    case "P%":
      return `${team.pointsPercentage.toFixed(2).substring(2)}%`;
    case "ConfHomeRank":
      return team.conferenceHomeRank;
    case "ConfRoadRank":
      return team.conferenceRoadRank;
    case "DivHomeRank":
      return team.divisionHomeRank;
    case "DivRoadRank":
      return team.divisionRoadRank;
    case "PPLeagueRank":
      return team.ppLeagueRank;
    case "PPConfRank":
      return team.ppConferenceRank;
    case "PPDivRank":
      return team.ppDivisionRank;
    default:
      return "";
  }
};

export const getTimeZoneOffset = () => {
  const currentDate = new Date();
  const month = currentDate.getMonth();
  const day = currentDate.getDay();
  // EDT = march 12th - November 5th
  if (month >= 3 && day >= 12 && month <= 11 && day <= 5) {
    return { timezone: "EST", offset: -Math.abs(5) };
  } else {
    return { timezone: "EDT", offset: -Math.abs(4) };
  }
};

export const formatHour = (hour: number) => {
  let formattedHour = "0:00";
  if (hour > 0 && hour <= 12) {
    formattedHour = "" + hour;
  } else if (hour > 12) {
    formattedHour = "" + (hour - 12);
  } else if (hour === 0) {
    formattedHour = "12";
  }
  return formattedHour;
};

export const formatMinutes = (minutes: number) => {
  let formattedMinute = "0";
  if (minutes < 10) {
    formattedMinute += "0";
  }
  return minutes < 10 ? formattedMinute : minutes;
};

export const splitArrayIntoEqualParts = (arr: any[], n: number) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
};

export const addNumberSuffix = (number: number) => {
  if (number > 3 && number < 21) return "th";
  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const formatBarLabelStatsForGameModal = (
  statType: string,
  number: number
) => {
  switch (statType) {
    case "Win% - Opponent Scores First":
    case "Win% - Leading 2nd Period":
    case "Win% - Outshot By Opponent":
    case "Win% - Outshoot Opponent":
    case "Win% - Leading 1st Period":
    case "Win% - Scoring First":
    case "PP%":
    case "PK%":
    case "Faceoff %":
    case "Point %":
      return `${number.toFixed(1)}%`;
    default:
      return `${number.toFixed(1)}`;
  }
};

export const getWindowSize = () => {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
};
