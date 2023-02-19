import axios from "axios";
import { Document, MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import { PlayerModel } from "../../models";
import {
  PlayerBioFormattedType,
  PlayerBioFromApiType,
  PlayerStatsFromApiType,
  PlayerStatsFormattedType,
  RosterType,
} from "../../types";
import { TEAM_IDS } from "../../constants";
import {
  formGetTeamRosterUrlString,
  formGetFullPlayerInfoUrlString,
  formGetPlayerStatsUrlString,
  formGetPlayerHeadshotUrlString,
} from "../../utils";

dotenv.config();

// current season
const currentYear = new Date().getFullYear();
let currentSeason = (currentYear - 1).toString().concat(currentYear.toString());
// Increment the season year by 1 to get latest season stats
// 2021/2022 => 2022/2023
let newSeasonStart = new Date().toLocaleDateString();
if (newSeasonStart === `7/15/${currentYear}`) {
  currentSeason = currentYear.toString().concat((currentYear + 1).toString());
}

const postPlayersToMongoDB = async (
  client: MongoClient,
  database: string,
  collection: string,
  data: Document
) => {
  try {
    await client.connect();
    await client.db(database).collection(collection).insertOne(data);
  } catch (err) {
    console.log("Error in postPlayersToMongoDB: ", err);
  }
};

const seedPlayersCollection = async () => {
  const client = new MongoClient(`${process.env.MONGO_URI}`);
  try {
    // Connect to MongoDB
    await client
      .connect()
      .then(() => console.log("Connected to MongoDB..."))
      .catch((err) => console.log("Error: ", err));

    TEAM_IDS.forEach(async (teamID) => {
      // get team roster
      const teamRoster = await axios
        .get<RosterType>(formGetTeamRosterUrlString(teamID))
        .then(({ data }) => data.roster);
      // loop through team roster
      teamRoster.forEach(async (player) => {
        // for each player, get: playerID, playerHeadshot, playerBio, playerStats
        const playerID: string = player.person.id.toString();
        const playerHeadshot: string = formGetPlayerHeadshotUrlString(playerID);

        const playerBio: PlayerBioFormattedType = await axios
          .get<PlayerBioFromApiType>(formGetFullPlayerInfoUrlString(playerID))
          .then((results) => {
            return results.data.people[0];
          });

        const playerStats: PlayerStatsFormattedType = await axios
          .get<PlayerStatsFromApiType>(
            formGetPlayerStatsUrlString(playerID, currentSeason)
          )
          .then((results) => {
            return results.data.stats[0];
          });

        // form player model
        const completePlayer = new PlayerModel({
          playerInfo: playerBio,
          playerStats: playerStats,
          playerHeadshot: playerHeadshot,
        });

        // post player to mongoDB players collection
        postPlayersToMongoDB(
          client,
          `${process.env.MONGO_DB_NAME}`,
          `${process.env.MONGO_PLAYERS_COLLECTION}`,
          completePlayer
        );
      });
    });
  } catch (err) {
    console.log("Error in seedPlayersCollection.ts: ", err);
  }
};

export default seedPlayersCollection;
