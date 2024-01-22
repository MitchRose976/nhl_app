import axios from "axios";
import { Document, OptionalId } from "mongodb";
import * as dotenv from "dotenv";
import { TeamDataType } from "../../types";
import { collections, connectToDatabase } from "../../connect";
import {
  formatTeamStats,
  getCurrentSeason,
  getTeamStatsUrl,
} from "../../utils";

dotenv.config();

const getTeams = async () => {
  const currentSeason = getCurrentSeason(true);
  const teamStatsUrl = getTeamStatsUrl(await currentSeason);
  return await axios.get(teamStatsUrl).then((res) => res.data.data);
};

const postTeamsToMongoDB = async (data: OptionalId<Document>[]) => {
  data.forEach(async (team) => {
    if (collections.teams) {
      await collections.teams.updateOne(
        { teamId: team.teamId },
        {
          $set: {
            faceoffWinPct: team.faceoffWinPct,
            gamesPlayed: team.gamesPlayed,
            goalsAgainst: team.goalsAgainst,
            goalsAgainstPerGame: team.goalsAgainstPerGame,
            goalsFor: team.goalsFor,
            goalsForPerGame: team.goalsForPerGame,
            losses: team.losses,
            otLosses: team.otLosses,
            penaltyKillNetPct: team.penaltyKillNetPct,
            penaltyKillPct: team.penaltyKillPct,
            pointPct: team.pointPct,
            points: team.points,
            powerPlayNetPct: team.powerPlayNetPct,
            powerPlayPct: team.powerPlayPct,
            regulationAndOtWins: team.regulationAndOtWins,
            seasonId: team.seasonId,
            shotsAgainstPerGame: team.shotsAgainstPerGame,
            shotsForPerGame: team.shotsForPerGame,
            teamFullName: team.teamFullName,
            teamId: team.teamId,
            ties: team.ties,
            wins: team.wins,
            winsInRegulation: team.winsInRegulation,
            winsInShootout: team.winsInShootout,
          },
        },
        { upsert: true }
      );
    }
  });
};

const seedTeamsCollection = async () => {
  // Connect to MongoDb
  await connectToDatabase();

  try {
    const data: TeamDataType[] = await getTeams();

    const teamData = data.map((team: TeamDataType) => {
      return formatTeamStats(team);
    });

    await postTeamsToMongoDB(teamData);
  } catch (err) {
    console.log("error in seedTeamsCollection: ", err);
  }
};

export default seedTeamsCollection;
