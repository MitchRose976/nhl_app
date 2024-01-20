import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import { ObjectId } from "mongodb";
import { TeamModel, PlayerModel, PlayerClass } from "../models";
import { collections } from "../connect";
import axios from "axios";
import { NHL_API_BASE } from "../constants";
import formatStandingsData from "../service/standingsService";
import { getCurrentSeason } from "../utils";

dotenv.config();
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const playerStatsBasePath = "playerStats.featuredStats.regularSeason.subSeason";
const currentSeason = getCurrentSeason(true);

// GET
router.get("/", async (req: Request, res: Response) => {
  // res.json({message: 'GET base url'})
  TeamModel.find().then((teams) => res.json(teams));
});

///////////////////////////////////////////////////////////////////////////////
//////////////////////////////// PLAYER STATS /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// GET Top 10 Points
router.get("/players/top10Points", async (req: Request, res: Response) => {
  try {
    if (collections.players) {
      const top10PointsPlayers = (await collections.players
        .find({ "playerStats.featuredStats.season": await currentSeason })
        .sort({ [`${playerStatsBasePath}.points`]: -1 })
        .limit(10)
        .toArray()) as PlayerClass[];
      return res.status(200).send(top10PointsPlayers);
    }
  } catch (error) {
    console.log("Error @ /players/top10Points: ", error);
  }
});

// GET Top 10 Goals
router.get("/players/top10Goals", async (req: Request, res: Response) => {
  try {
    if (collections.players) {
      const top10GoalsPlayers = (await collections.players
        .find({ "playerStats.featuredStats.season": await currentSeason })
        .sort({ [`${playerStatsBasePath}.goals`]: -1 })
        .limit(10)
        .toArray()) as PlayerClass[];
      return res.status(200).send(top10GoalsPlayers);
    }
  } catch (error) {
    console.log("Error @ /players/top10Goals: ", error);
  }
});

// GET Top 10 Assists
router.get("/players/top10Assists", async (req: Request, res: Response) => {
  try {
    if (collections.players) {
      const top10AssistsPlayers = (await collections.players
        .find({ "playerStats.featuredStats.season": await currentSeason })
        .sort({ [`${playerStatsBasePath}.assists`]: -1 })
        .limit(10)
        .toArray()) as PlayerClass[];
      return res.status(200).send(top10AssistsPlayers);
    }
  } catch (error) {
    console.log("Error @ /players/top10Assists: ", error);
  }
});

// GET Top 10 PlusMinus
router.get("/players/top10PlusMinus", async (req: Request, res: Response) => {
  try {
    if (collections.players) {
      const top10PlusMinusPlayers = (await collections.players
        .find({ "playerStats.featuredStats.season": await currentSeason })
        .sort({ [`${playerStatsBasePath}.plusMinus`]: -1 })
        .limit(10)
        .toArray()) as PlayerClass[];
      return res.status(200).send(top10PlusMinusPlayers);
    }
  } catch (error) {
    console.log("Error @ /players/top10PlusMinus: ", error);
  }
});

// GET Top 10 Penalty Minutes
router.get(
  "/players/top10PenaltyMinutes",
  async (req: Request, res: Response) => {
    try {
      if (collections.players) {
        const top10PenaltyMinutesPlayers = (await collections.players
          .find({ "playerStats.featuredStats.season": await currentSeason })
          .sort({ [`${playerStatsBasePath}.pim`]: -1 })
          .limit(10)
          .toArray()) as PlayerClass[];
        return res.status(200).send(top10PenaltyMinutesPlayers);
      }
    } catch (error) {
      console.log("Error @ /players/top10PenaltyMinutes: ", error);
    }
  }
);

// GET Top 10 Time on Ice - Per Game
router.get(
  "/players/top10TimeOnIcePerGame",
  async (req: Request, res: Response) => {
    try {
      if (collections.players) {
        const top10TimeOnIcePerGamePlayers = (await collections.players
          .aggregate([
            {
              $match: {
                "playerInfo.position": { $ne: "G" }, // Filter out goalies
                "playerStats.featuredStats.season": await currentSeason,
              },
            },
            {
              // retrieve latest season from each players seasonTotals array
              $addFields: {
                lastSeasonTotal: {
                  $arrayElemAt: [
                    "$playerStats.seasonTotals",
                    { $subtract: [{ $size: "$playerStats.seasonTotals" }, 1] },
                  ],
                },
              },
            },
            {
              $sort: {
                "lastSeasonTotal.avgToi": -1,
              },
            },
            {
              $limit: 10,
            },
          ])
          .toArray()) as PlayerClass[];
        return res.status(200).send(top10TimeOnIcePerGamePlayers);
      }
    } catch (error) {
      console.log("Error @ /players/top10TimeOnIcePerGame: ", error);
    }
  }
);

// GET Top 10 Powerplay Goals
router.get(
  "/players/top10PowerplayGoals",
  async (req: Request, res: Response) => {
    try {
      if (collections.players) {
        const top10PowerplayGoalsPlayers = (await collections.players
          .find({ "playerStats.featuredStats.season": await currentSeason })
          .sort({
            [`${playerStatsBasePath}.powerPlayGoals`]: -1,
          })
          .limit(10)
          .toArray()) as PlayerClass[];
        return res.status(200).send(top10PowerplayGoalsPlayers);
      }
    } catch (error) {
      console.log("Error @ /players/top10PowerplayGoals: ", error);
    }
  }
);

// GET Top 10 ShortHanded Goals
router.get(
  "/players/top10ShortHandedGoals",
  async (req: Request, res: Response) => {
    try {
      if (collections.players) {
        const top10ShortHandedGoalsPlayers = (await collections.players
          .find({ "playerStats.featuredStats.season": await currentSeason })
          .sort({
            [`${playerStatsBasePath}.shorthandedGoals`]: -1,
          })
          .limit(10)
          .toArray()) as PlayerClass[];
        return res.status(200).send(top10ShortHandedGoalsPlayers);
      }
    } catch (error) {
      console.log("Error @ /players/top10ShortHandedGoals: ", error);
    }
  }
);

// GET Top 10 Powerplay Points
router.get(
  "/players/top10PowerplayPoints",
  async (req: Request, res: Response) => {
    try {
      if (collections.players) {
        const top10PowerplayPointsPlayers = (await collections.players
          .find({ "playerStats.featuredStats.season": await currentSeason })
          .sort({
            [`${playerStatsBasePath}.powerPlayPoints`]: -1,
          })
          .limit(10)
          .toArray()) as PlayerClass[];
        return res.status(200).send(top10PowerplayPointsPlayers);
      }
    } catch (error) {
      console.log("Error @ /players/top10PowerplayPoints: ", error);
    }
  }
);

// GET Top 10 ShortHanded Points
router.get(
  "/players/top10ShortHandedPoints",
  async (req: Request, res: Response) => {
    try {
      if (collections.players) {
        const top10ShortHandedPointsPlayers = (await collections.players
          .find({ "playerStats.featuredStats.season": await currentSeason })
          .sort({
            [`${playerStatsBasePath}.shorthandedPoints`]: -1,
          })
          .limit(10)
          .toArray()) as PlayerClass[];
        return res.status(200).send(top10ShortHandedPointsPlayers);
      }
    } catch (error) {
      console.log("Error @ /players/top10ShortHandedPoints: ", error);
    }
  }
);

// GET Top 10 Faceoff Percentage
router.get(
  "/players/top10FaceOffPercentage",
  async (req: Request, res: Response) => {
    try {
      if (collections.players) {
        const top10FaceOffPercentagePlayers = (await collections.players
          .aggregate([
            {
              $match: {
                "playerInfo.position": "C", // Filter out goalies
                "playerStats.featuredStats.season": await currentSeason,
              },
            },
            {
              // retrieve latest season from each players seasonTotals array
              $addFields: {
                lastSeasonTotal: {
                  $arrayElemAt: [
                    "$playerStats.seasonTotals",
                    { $subtract: [{ $size: "$playerStats.seasonTotals" }, 1] },
                  ],
                },
              },
            },
            {
              $sort: {
                "lastSeasonTotal.faceoffWinningPctg": -1,
              },
            },
            {
              $limit: 10,
            },
          ])
          .toArray()) as PlayerClass[];
        return res.status(200).send(top10FaceOffPercentagePlayers);
      }
    } catch (error) {
      console.log("Error @ /players/top10FaceOffPercentage: ", error);
    }
  }
);

// GET Top 10 Shooting Percentage
// TODO: find way to filter out call ups who only played a game or two
router.get(
  "/players/top10ShootingPercentage",
  async (req: Request, res: Response) => {
    try {
      if (collections.players) {
        const top10ShootingPercentage = (await collections.players
          .find({ "playerStats.featuredStats.season": await currentSeason })
          .sort({
            [`${playerStatsBasePath}.shootingPctg`]: -1,
          })
          .limit(10)
          .toArray()) as PlayerClass[];
        return res.status(200).send(top10ShootingPercentage);
      }
    } catch (error) {
      console.log("Error @ /players/top10ShootingPercentage: ", error);
    }
  }
);

// GET Top 10 Shots On Net
router.get("/players/top10ShotsOnNet", async (req: Request, res: Response) => {
  try {
    if (collections.players) {
      const top10ShotsOnNet = (await collections.players
        .find({ "playerStats.featuredStats.season": await currentSeason })
        .sort({
          [`${playerStatsBasePath}.shots`]: -1,
        })
        .limit(10)
        .toArray()) as PlayerClass[];
      return res.status(200).send(top10ShotsOnNet);
    }
  } catch (error) {
    console.log("Error @ /players/top10ShotsOnNet: ", error);
  }
});

// GET Top 10 Game Winning Goals
router.get(
  "/players/top10GameWinningGoals",
  async (req: Request, res: Response) => {
    try {
      if (collections.players) {
        const top10GameWinningGoals = (await collections.players
          .find({ "playerStats.featuredStats.season": await currentSeason })
          .sort({
            [`${playerStatsBasePath}.gameWinningGoals`]: -1,
          })
          .limit(10)
          .toArray()) as PlayerClass[];
        return res.status(200).send(top10GameWinningGoals);
      }
    } catch (error) {
      console.log("Error @ /players/top10GameWinningGoals: ", error);
    }
  }
);

// GET Top 10 OT Goals
router.get("/players/top10OtGoals", async (req: Request, res: Response) => {
  try {
    if (collections.players) {
      const top10OtGoals = (await collections.players
        .find({ "playerStats.featuredStats.season": await currentSeason })
        .sort({
          [`${playerStatsBasePath}.otGoals`]: -1,
        })
        .limit(10)
        .toArray()) as PlayerClass[];
      return res.status(200).send(top10OtGoals);
    }
  } catch (error) {
    console.log("Error @ /players/top10OtGoals: ", error);
  }
});

///////////////////////////////////////////////////////////////////////////////
//////////////////////////////// GOALIE STATS /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// GET Top 10 Save Percentage
// TODO: find way to filter out call ups who only played a game or two
router.get(
  "/players/top10SavePercentage",
  async (req: Request, res: Response) => {
    try {
      if (collections.players) {
        const top10SavePercentagePlayers = (await collections.players
          .find({
            "playerInfo.position": "G",
            "playerStats.featuredStats.season": await currentSeason,
          }) // Filter for goalies
          .sort({
            [`${playerStatsBasePath}.savePctg`]: -1,
          })
          .collation({ locale: "en_US", numericOrdering: true })
          .limit(10)
          .toArray()) as PlayerClass[];
        return res.status(200).send(top10SavePercentagePlayers);
      }
    } catch (error) {
      console.log("Error @ /players/top10SavePercentage: ", error);
    }
  }
);

// GET Top 10 Wins
// TODO: find way to filter out call ups who only played a game or two
router.get("/players/top10Wins", async (req: Request, res: Response) => {
  try {
    if (collections.players) {
      const top10WinsPlayers = (await collections.players
        .find({
          "playerInfo.position": "G",
          "playerStats.featuredStats.season": await currentSeason,
        }) // Filter for goalies
        .sort({
          [`${playerStatsBasePath}.wins`]: -1,
        })
        .collation({ locale: "en_US", numericOrdering: true })
        .limit(10)
        .toArray()) as PlayerClass[];
      return res.status(200).send(top10WinsPlayers);
    }
  } catch (error) {
    console.log("Error @ /players/top10Wins: ", error);
  }
});

// GET Top 10 Losses
router.get("/players/top10Losses", async (req: Request, res: Response) => {
  try {
    if (collections.players) {
      const top10Losses = (await collections.players
        .find({
          "playerInfo.position": "G",
          "playerStats.featuredStats.season": await currentSeason,
        }) // Filter for goalies
        .sort({
          [`${playerStatsBasePath}.losses`]: -1,
        })
        .collation({ locale: "en_US", numericOrdering: true })
        .limit(10)
        .toArray()) as PlayerClass[];
      return res.status(200).send(top10Losses);
    }
  } catch (error) {
    console.log("Error @ /players/top10Losses: ", error);
  }
});

// GET Top 10 Games Started
router.get(
  "/players/top10GamesStarted",
  async (req: Request, res: Response) => {
    try {
      if (collections.players) {
        const top10GamesStarted = (await collections.players
          .aggregate([
            {
              $match: {
                "playerInfo.position": "G", // Filter for goalies
                "playerStats.featuredStats.season": await currentSeason,
              },
            },
            {
              // retrieve latest season from each players seasonTotals array
              $addFields: {
                lastSeasonTotal: {
                  $arrayElemAt: [
                    "$playerStats.seasonTotals",
                    { $subtract: [{ $size: "$playerStats.seasonTotals" }, 1] },
                  ],
                },
              },
            },
            {
              $sort: {
                "lastSeasonTotal.gamesStarted": -1,
              },
            },
            {
              $limit: 10,
            },
          ])
          .toArray()) as PlayerClass[];
        return res.status(200).send(top10GamesStarted);
      }
    } catch (error) {
      console.log("Error @ /players/top10GamesStarted: ", error);
    }
  }
);

// GET Top 10 Shutouts
router.get("/players/top10Shutouts", async (req: Request, res: Response) => {
  try {
    if (collections.players) {
      const top10Shutouts = (await collections.players
        .aggregate([
          {
            $match: {
              "playerInfo.position": "G", // Filter for goalies
              "playerStats.featuredStats.season": await currentSeason,
            },
          },
          {
            // retrieve latest season from each players seasonTotals array
            $addFields: {
              lastSeasonTotal: {
                $arrayElemAt: [
                  "$playerStats.seasonTotals",
                  { $subtract: [{ $size: "$playerStats.seasonTotals" }, 1] },
                ],
              },
            },
          },
          {
            $sort: {
              "lastSeasonTotal.shutouts": -1,
            },
          },
          {
            $limit: 10,
          },
        ])
        .toArray()) as PlayerClass[];
      return res.status(200).send(top10Shutouts);
    }
  } catch (error) {
    console.log("Error @ /players/top10Shutouts: ", error);
  }
});

// GET Top 10 Goals Against Average
// TODO: find way to filter out call ups who only played a game or two
router.get(
  "/players/top10GoalsAgainstAverage",
  async (req: Request, res: Response) => {
    try {
      if (collections.players) {
        const top10GoalsAgainstAveragePlayers = (await collections.players
          .find({
            "playerInfo.position": "G",
            "playerStats.featuredStats.season": await currentSeason,
          }) // Filter for goalies
          .sort({
            [`${playerStatsBasePath}.goalsAgainstAvg`]: 1,
          })
          .collation({ locale: "en_US", numericOrdering: true })
          .limit(10)
          .toArray()) as PlayerClass[];
        return res.status(200).send(top10GoalsAgainstAveragePlayers);
      }
    } catch (error) {
      console.log("Error @ /players/top10GoalsAgainstAverage: ", error);
    }
  }
);

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// STANDINGS ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// GET league standings
router.get("/teams/standings", async (req: Request, res: Response) => {
  try {
    await axios
      .get(`${NHL_API_BASE}/standings/now`)
      .then((response) => {
        const formattedStandings = formatStandingsData(response.data);
        res.status(200).send(formattedStandings);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log("Error @ /teams/standings: ", error);
  }
});

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// SCORES ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// GET todays scores
router.get("/games/scores", async (req: Request, res: Response) => {
  const todaysDate = new Date()
    .toLocaleDateString("pt-br")
    .split("/")
    .reverse()
    .join("-");
  try {
    await axios
      //.get(`https://nhl-score-api.herokuapp.com/api/scores?startDate=${'2023-04-10'}&endDate=${'2023-04-10'}`)
      .get(
        `https://nhl-score-api.herokuapp.com/api/scores?startDate=${todaysDate}&endDate=${todaysDate}`
      )
      .then((response) => res.status(200).send(response.data))
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log("Error @ /teams/standings: ", error);
  }
});

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// TEAM STATS ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// POST team stats by id
router.get(
  "/teams/stats",
  async (req: Request, res: Response) => {
    const teamIdNumber = Number(req.query.teamID)
    try {
      if (collections.teams && !isNaN(teamIdNumber)) {
        const teamStatsCursor = collections.teams.find({
          "teamId": teamIdNumber
        });

        // Convert the cursor to an array and await the result
        const teamStats = await teamStatsCursor.toArray();

        return res.status(200).send(teamStats[0]);
      }
    } catch (error) {
      console.log("Error @ /teams/stats: ", error);
    }
  }
);

export default router;
