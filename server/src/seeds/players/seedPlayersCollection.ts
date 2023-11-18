import axios from "axios";
import { Document } from "mongodb";
import * as dotenv from "dotenv";
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
import { collections, connectToDatabase, closeConnection } from "../../connect";

dotenv.config();

// current season
const currentYear = new Date().getFullYear();
let currentSeason = (currentYear - 1).toString().concat(currentYear.toString());
// Increment the season year by 1 to get latest season stats
// ex. 2021/2022 => 2022/2023
let newSeasonStart = new Date().toLocaleDateString();
if (newSeasonStart === `7/15/${currentYear}`) {
  currentSeason = currentYear.toString().concat((currentYear + 1).toString());
}

const postPlayersToMongoDB = async (playerData: Document) => {
  try {
    if (collections.players) {
      const filterQuery = { "playerInfo.id": playerData.playerInfo.id };
      const updateDoc = {
        $set: {
          playerInfo: playerData.playerInfo,
          playerStats: playerData.playerStats,
          playerHeadshot: playerData.playerHeadshot,
        },
      };
      const options = { upsert: true };

      const result = await collections.players.updateOne(
        filterQuery,
        updateDoc,
        options
      );

      result
        ? console.log(
            `${result?.matchedCount} document(s) matched the filter, updated ${result?.modifiedCount} document(s)`
          )
        : console.log("Error in postPlayersToMongoDb: result is undefined");
        
    } else {
      console.log(
        "Error in postPlayersToMongoDb: collections.players is false"
      );
    }
  } catch (err) {
    console.log("Error in postPlayersToMongoDB: ", err);
  }
};

const seedPlayersCollection = async () => {
  // Connect to MongoDb
  await connectToDatabase();

  try {
    // get team roster using teamIDs
    TEAM_IDS.forEach(async (teamID) => {
      const teamRoster = await axios
        .get<RosterType>(formGetTeamRosterUrlString(teamID))
        .then(({ data }) => data.roster);
      // loop through team roster
      // for each player, get: playerID, playerHeadshot, playerBio, playerStats
      teamRoster.forEach(async (player) => {
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
        const completePlayer = {
          playerInfo: playerBio,
          playerStats: playerStats,
          playerHeadshot: playerHeadshot,
        };

        // post player to mongoDB players collection
        await postPlayersToMongoDB(completePlayer);
      });
    });
  } catch (err) {
    console.log("Error in seedPlayersCollection.ts: ", err);
  } finally {
    await closeConnection();
  }
};

export default seedPlayersCollection;
