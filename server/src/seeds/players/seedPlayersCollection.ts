import axios from "axios";
import { Document } from "mongodb";
import * as dotenv from "dotenv";
import { PlayerBioFormattedType, RosterType, PlayerRawType } from "../../types";
import { TEAM_IDS } from "../../constants";
import {
  formGetTeamRosterUrlString,
  formGetFullPlayerInfoUrlString,
  getCurrentSeason,
  formatPlayerInfo,
} from "../../utils";
import { collections, connectToDatabase, closeConnection } from "../../connect";

dotenv.config();

// current season ex. 20232024
const currentSeason = getCurrentSeason(true)

// array of team abbreviations
const teamAbbreviations: string[] = TEAM_IDS.map((team) => team.abbreviation);

const postPlayersToMongoDB = async (playerData: Document) => {
  try {
    if (collections.players) {
      const filterQuery = {
        "playerInfo.playerId": playerData.playerInfo.playerId,
      };
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
  // Connect to MongoDB
  await connectToDatabase();

  try {
    // Get team roster using team abbreviations ex. TOR, TBL, BOS
    for (const teamAbbreviation of teamAbbreviations) {
      // Fetch all player IDs
      const teamRoster = await axios
        .get<RosterType>(
          formGetTeamRosterUrlString(teamAbbreviation, await currentSeason)
        )
        .then(({ data }) => {
          const forwardsIds = data.forwards.map(
            (forward: PlayerRawType) => forward.id
          );
          const defensemenIds = data.defensemen.map(
            (defenseman: PlayerRawType) => defenseman.id
          );
          const goaliesIds = data.goalies.map(
            (goalie: PlayerRawType) => goalie.id
          );
          return [...forwardsIds, ...defensemenIds, ...goaliesIds];
        });

      // Loop through team roster
      // For each player, get: playerHeadshot, playerInfo, playerStats
      for (const playerID of teamRoster) {
        let playerHeadshot;
        let playerStats;
        let playerInfo;
        await axios
          .get<PlayerBioFormattedType>(formGetFullPlayerInfoUrlString(playerID))
          .then((results) => {
            playerHeadshot = results.data.headshot;
            playerStats = {
              featuredStats: results.data.featuredStats,
              careerTotals: results.data.careerTotals,
              seasonTotals: results.data.seasonTotals,
              last5Games: results.data.last5Games,
            };
            playerInfo = formatPlayerInfo(results.data);

            // Form player model
            const completePlayer = {
              playerInfo: playerInfo,
              playerStats: playerStats,
              playerHeadshot: playerHeadshot,
            };

            // Post player to MongoDB players collection
            postPlayersToMongoDB(completePlayer);
          });
      }
    }
  } catch (err) {
    console.log("Error in seedPlayersCollection.ts: ", err);
  } finally {
    await closeConnection();
  }
};

export default seedPlayersCollection;
