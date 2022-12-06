import axios from "axios";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import { TeamModel } from "../models";
import { TeamDataType } from "../types";

dotenv.config();

const getTeamsUrl = "https://statsapi.web.nhl.com/api/v1/teams";

const client = new MongoClient(`${process.env.MONGO_URI}`);
const db = client.db(`${process.env.MONGO_DB_NAME}`);
const coll = db.collection(`${process.env.MONGO_TEAMS_COLLECTION}`);

const getTeams = async () => {
  return await axios
    .get(getTeamsUrl)
    .then((res) => res.data?.teams);
};

const postDataToMongoDB = async (client: MongoClient, data: TeamDataType[]) => {
  const results = await coll.insertMany(data);
  console.log(`${results.insertedCount} new teams added`);
};

export const seedTeams = async () => {
  const client = new MongoClient(`${process.env.MONGO_URI}`);
  try {
    // Connect to MongoDB
    await client
      .connect()
      .then(() => console.log("Connected to MongoDB..."))
      .catch((err) => console.log('Error: ', err));

    // get data from NHL api
    let data: any = await getTeams();

    // array to hold model of data based on Team schema for each team
    const teamData = data.map((team: TeamDataType) => {
      return new TeamModel({
        teamId: team.id,
        teamName: team.name,
        teamAbbreviation: team.abbreviation,
        teamDivision: team.division,
        teamConference: team.conference,
        teamVenue: team.venue,
        firstYearOfPlay: team.firstYearOfPlay,
        teamLogoUrl: `https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${team.id}.svg`,
      });
    });
    // Post data to "teams" collection in mongoDB
    await postDataToMongoDB(client, teamData);
  } catch (err) {
    console.log(err);
  } finally {
    //await client.close();
    setTimeout(() => {client.close()}, 1500)
    console.log('connection closed')
  }
};

//seed().catch((err) => console.log('Error: ', err));
