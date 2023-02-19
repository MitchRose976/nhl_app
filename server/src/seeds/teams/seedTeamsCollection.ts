import axios from "axios";
import { Document, MongoClient, OptionalId } from "mongodb";
import * as dotenv from "dotenv";
import { TeamModel } from "../../models";
import { TeamDataType } from "../../types";
import { GET_TEAMS_BASE_URL } from "../../constants";

dotenv.config();

const client = new MongoClient(`${process.env.MONGO_URI}`);
const db = client.db(`${process.env.MONGO_DB_NAME}`);
const coll = db.collection(`${process.env.MONGO_TEAMS_COLLECTION}`);

const getTeams = async () => {
  return await axios.get(GET_TEAMS_BASE_URL).then((res) => res.data?.teams);
};

const postTeamsToMongoDB = async (
  client: MongoClient,
  data: OptionalId<Document>[]
) => {
  data.forEach((team) => {
    coll.updateOne(
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
  });
};

const seedTeamsCollection = async () => {
  const client = new MongoClient(`${process.env.MONGO_URI}`);
  try {
    // Connect to MongoDB
    await client
      .connect()
      .then(() => console.log("Connected to MongoDB..."))
      .catch((err) => console.log("Error: ", err));

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
    await postTeamsToMongoDB(client, teamData);
  } catch (err) {
    console.log(err);
  }
};

export default seedTeamsCollection;
