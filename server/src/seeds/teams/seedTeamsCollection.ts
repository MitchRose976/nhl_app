import axios from "axios";
import { Document, OptionalId } from "mongodb";
import * as dotenv from "dotenv";
import { TeamDataType } from "../../types";
import { GET_TEAMS_BASE_URL } from "../../constants";
import { collections, connectToDatabase } from "../../connect";

dotenv.config();

const getTeams = async () => {
  return await axios.get(GET_TEAMS_BASE_URL).then((res) => res.data?.teams);
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
      return {
        teamId: team.id,
        teamName: team.name,
        teamAbbreviation: team.abbreviation,
        teamDivision: team.division,
        teamConference: team.conference,
        teamVenue: team.venue,
        firstYearOfPlay: team.firstYearOfPlay,
        teamLogoUrl: `https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${team.id}.svg`,
      };
    });
    
    // Post data to "teams" collection in mongoDB
    await postTeamsToMongoDB(teamData);
  } catch (err) {
    console.log(err);
  }
};

export default seedTeamsCollection;
