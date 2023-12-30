import axios from "axios";
import { Document } from "mongodb";
import * as dotenv from "dotenv";
import {
  PlayerBioFormattedType,
  PlayerBioFromApiType,
  PlayerStatsFromApiType,
  PlayerStatsFormattedType,
  RosterType,
  PlayerRawType,
} from "../../types";
import { TEAM_IDS } from "../../constants";
import {
  formGetTeamRosterUrlString,
  formGetFullPlayerInfoUrlString,
  formGetPlayerStatsUrlString,
  formGetPlayerHeadshotUrlString,
  getCurrentSeason,
  formatPlayerInfo,
} from "../../utils";
import { collections, connectToDatabase, closeConnection } from "../../connect";

dotenv.config();

// current season ex. 20232024
const currentSeason = getCurrentSeason(true);

// array of team abbreviations
const teamAbbreviations: string[] = TEAM_IDS.map((team) => team.abbreviation);

const postPlayersToMongoDB = async (playerData: Document) => {
  try {
    if (collections.players) {
      if (playerData.playerInfo.playerID === 8479318) {
        console.log("mitch playerData: ", playerData);
      }
      const filterQuery = { "playerInfo.playerId": playerData.playerInfo.playerId };
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
    // get team roster using team abbreviations ex. TOR, TBL, BOS
    teamAbbreviations.forEach(async (teamAbbreviation) => {
      // fetch all playerID's
      const teamRoster = await axios
        .get<RosterType>(
          formGetTeamRosterUrlString(teamAbbreviation, currentSeason)
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

      // loop through team roster
      // for each player, get: playerHeadshot, playerInfo, playerStats
      teamRoster.forEach(async (playerID) => {
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
            return results.data;
          });

        // form player model
        const completePlayer = {
          playerInfo: playerInfo,
          playerStats: playerStats,
          playerHeadshot: playerHeadshot,
        };

        console.log('mitch player: ', completePlayer)

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
