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
    case 'DivRoadRank':
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
