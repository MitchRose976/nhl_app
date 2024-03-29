import { TeamStandingsDataObject } from "../../../server/src/types";
import {
  FormattedRechartDataItem,
  NameType,
  PlayerDataType,
  FormattedTeamData,
} from "../shared/types";
import { statTypeMapping } from "./constants";

export const formGetTeamLogoUrl = (teamAbbreviation: string) =>
  `https://assets.nhle.com/logos/nhl/svg/${teamAbbreviation}_light.svg`;

export const formatStat = (player: PlayerDataType, statType: string) => {
  const statsRequiringDifferentMapping = [
    statTypeMapping.avgToi.type,
    statTypeMapping.faceoffWinningPctg.type,
    statTypeMapping.gamesStarted.type,
    statTypeMapping.shutouts.type,
  ];

  const statsRequiringRoundingTo3Decimals = [
    statTypeMapping.savePctg.type,
    statTypeMapping.faceoffWinningPctg.type,
    statTypeMapping.shootingPctg.type,
  ];

  const featuredSeasonMapping =
    player.playerStats.featuredStats.regularSeason.subSeason;
  const seasonTotalsMapping =
    player.playerStats.seasonTotals[player.playerStats.seasonTotals.length - 1];

  const convertNameTypeToString = (nameType: NameType): string => {
    return nameType.default || "";
  };

  if (statsRequiringRoundingTo3Decimals.includes(statType)) {
    return statsRequiringDifferentMapping.includes(statType)
      ? `${Number(seasonTotalsMapping[statType]).toFixed(3).toString()}%`
      : `${Number(featuredSeasonMapping[statType]).toFixed(3).toString()}%`;
  } else if (statType === statTypeMapping.goalsAgainstAvg.type) {
    return Number(featuredSeasonMapping[statType]).toFixed(2).toString();
  } else {
    const value = statsRequiringDifferentMapping.includes(statType)
      ? seasonTotalsMapping[statType]
      : featuredSeasonMapping[statType];

    // Convert NameType to string if applicable
    return typeof value === "object" ? convertNameTypeToString(value) : value;
  }
};

export const getTeamStat = (
  team: TeamStandingsDataObject,
  stat: { label: string; stat: string; type: string }
) => {
  const statLabel = stat.label;
  switch (statLabel) {
    case "Team":
      return team.teamName.default;
    case "GP":
      return team.gamesPlayed;
    case "W":
      return team.wins;
    case "L":
      return team.losses;
    case "OTL":
      return team.otLosses;
    case "Pts":
      return team.points;
    case "GF":
      return team.goalFor;
    case "GA":
      return team.goalAgainst;
    case "Diff":
      return team.goalDifferential;
    case "L10":
      return `${team.l10Wins}-${team.l10Losses}-${team.l10OtLosses}`;
    case "Strk":
      return `${team.streakCode}${team.streakCount}`;
    case "P%":
      return `${team.pointPctg.toFixed(2).substring(2)}%`;
    case "ConfHomeRank":
      return team.conferenceHomeSequence;
    case "ConfRoadRank":
      return team.conferenceRoadSequence;
    case "DivHomeRank":
      return team.divisionHomeSequence;
    case "DivRoadRank":
      return team.divisionRoadSequence;
    case "HomeWins":
      return team.homeWins;
    case "HomeGoalsFor":
      return team.homeGoalsFor;
    case "HomeGoalsAgainst":
      return team.homeGoalsAgainst;
    case "RoadWins":
      return team.roadWins;
    case "RoadGoalsFor":
      return team.roadGoalsFor;
    case "RoadGoalsAgainst":
      return team.roadGoalsAgainst;
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

export const getWindowSize = () => {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
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

export const formatRechartsData = (
  data: FormattedTeamData[] | undefined,
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
  teamsArray: string[]
) => {
  if (data && !isLoading && !isError && isSuccess) {
    const matchingTeams = data.filter((team) =>
      teamsArray.includes(team.teamName)
    );

    let formattedData: FormattedRechartDataItem[] = [
      { statType: "Point %" },
      { statType: "Faceoff %" },
      { statType: "Goals/Game" },
      { statType: "Goals Against/Game" },
      { statType: "PK%" },
      { statType: "PP%" },
      { statType: "Shots/Game" },
      { statType: "Shots Against/Game" },
    ];

    matchingTeams?.forEach((teamData) => {
      formattedData.forEach((stat) => {
        stat[`${teamData.teamName}`] = teamData.data[stat.statType] || 0;
      });
    });

    return formattedData;
  }
};
