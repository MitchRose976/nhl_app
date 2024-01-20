import axios from "axios";
import { Document, OptionalId } from "mongodb";
import * as dotenv from "dotenv";
import { TeamDataType } from "../../types";
import { getTeamStatsUrl } from "../../constants";
import { collections, connectToDatabase } from "../../connect";
import { getCurrentSeason } from "../../utils";

dotenv.config();

const getTeams = async () => {
  const currentSeason = getCurrentSeason(true);
  const teamStatsUrl = getTeamStatsUrl(await currentSeason);
  console.log('mitch getTeamStatsUrl: ', teamStatsUrl)
  return await axios.get(teamStatsUrl).then((res) => res.data);
};

const postTeamsToMongoDB = async (data: OptionalId<Document>[]) => {
  data.forEach(async (team) => {
    if (collections.teams) {
      await collections.teams.updateOne(
        { teamId: team.teamId },
        {
          $set: {
            teamId: team.teamId,
            teamName: team.teamName,
            teamAbbreviation: team.teamAbbreviation,
            teamDivision: team.teamDivision,
            teamConference: team.teamConference,
            teamVenue: team.teamVenue,
            firstYearOfPlay: team.firstYearOfPlay,
            teamLogoUrl: team.teamLogoUrl,
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
    // get data from NHL api
    let data: TeamDataType[] = await getTeams();

    // array to hold model of data based on Team schema for each team
    const teamData = data.map((team: TeamDataType) => {
      console.log('mitch team: ', team)
    });
    
    // Post data to "teams" collection in mongoDB
    // await postTeamsToMongoDB(teamData);
  } catch (err) {
    console.log(err);
  }
};

export default seedTeamsCollection;
