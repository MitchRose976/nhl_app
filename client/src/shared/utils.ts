import { PlayerDataType } from "../../../server/src/types";
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
