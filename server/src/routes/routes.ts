import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import { ObjectId } from "mongodb";
import { TeamModel, PlayerModel, PlayerClass } from "../models";
import { collections } from "../connect";
import axios from "axios";

dotenv.config();
const router = express.Router();
router.use(express.json());

// GET
router.get("/", async (req: Request, res: Response) => {
  // res.json({message: 'GET base url'})
  TeamModel.find().then((teams) => res.json(teams));
});

// GET Top 10 Points
router.get("/players/top10Points", async (req: Request, res: Response) => {
  try {
    if (collections.players) {
      const top10PointsPlayers = (await collections.players
        .find({})
        .sort({ "playerStats.splits.stat.points": -1 })
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
        .find({})
        .sort({ "playerStats.splits.stat.goals": -1 })
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
        .find({})
        .sort({ "playerStats.splits.stat.assists": -1 })
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
        .find({})
        .sort({ "playerStats.splits.stat.plusMinus": -1 })
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
          .find({})
          .sort({ "playerStats.splits.stat.pim": -1 })
          .limit(10)
          .toArray()) as PlayerClass[];
        return res.status(200).send(top10PenaltyMinutesPlayers);
      }
    } catch (error) {
      console.log("Error @ /players/top10PenaltyMinutes: ", error);
    }
  }
);

// GET Top 10 Hits
router.get("/players/top10Hits", async (req: Request, res: Response) => {
  try {
    if (collections.players) {
      const top10HitsPlayers = (await collections.players
        .find({})
        .sort({ "playerStats.splits.stat.hits": -1 })
        .limit(10)
        .toArray()) as PlayerClass[];
      return res.status(200).send(top10HitsPlayers);
    }
  } catch (error) {
    console.log("Error @ /players/top10Hits: ", error);
  }
});

// GET Top 10 Total Time on Ice
router.get(
  "/players/top10TotalTimeOnIce",
  async (req: Request, res: Response) => {
    try {
      if (collections.players) {
        const top10TotalTimeOnIcePlayers = (await collections.players
          .find({})
          .sort({
            "playerInfo.primaryPosition.type": 1,
            "playerStats.splits.stat.timeOnIce": -1,
          })
          .collation({ locale: "en_US", numericOrdering: true })
          .limit(10)
          .toArray()) as PlayerClass[];
        return res.status(200).send(top10TotalTimeOnIcePlayers);
      }
    } catch (error) {
      console.log("Error @ /players/top10TotalTimeOnIce: ", error);
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
          .find({})
          .sort({
            "playerInfo.primaryPosition.type": 1,
            "playerStats.splits.stat.timeOnIcePerGame": -1,
          })
          .collation({ locale: "en_US", numericOrdering: true })
          .limit(10)
          .toArray()) as PlayerClass[];
        return res.status(200).send(top10TimeOnIcePerGamePlayers);
      }
    } catch (error) {
      console.log("Error @ /players/top10TimeOnIcePerGame: ", error);
    }
  }
);

// GET Top 10 Time on Ice - Short Handed
router.get(
  "/players/top10TimeOnIceShortHanded",
  async (req: Request, res: Response) => {
    try {
      if (collections.players) {
        const top10TimeOnIceShortHandedPlayers = (await collections.players
          .find({})
          .sort({
            "playerInfo.primaryPosition.type": 1,
            "playerStats.splits.stat.shortHandedTimeOnIce": -1,
          })
          .collation({ locale: "en_US", numericOrdering: true })
          .limit(10)
          .toArray()) as PlayerClass[];
        return res.status(200).send(top10TimeOnIceShortHandedPlayers);
      }
    } catch (error) {
      console.log("Error @ /players/top10TimeOnIceShortHanded: ", error);
    }
  }
);

// GET Top 10 Time on Ice - Powerplay
router.get(
  "/players/top10TimeOnIcePowerplay",
  async (req: Request, res: Response) => {
    try {
      if (collections.players) {
        const top10TimeOnIcePowerplayPlayers = (await collections.players
          .find({})
          .sort({
            "playerInfo.primaryPosition.type": 1,
            "playerStats.splits.stat.powerPlayTimeOnIce": -1,
          })
          .collation({ locale: "en_US", numericOrdering: true })
          .limit(10)
          .toArray()) as PlayerClass[];
        return res.status(200).send(top10TimeOnIcePowerplayPlayers);
      }
    } catch (error) {
      console.log("Error @ /players/top10TimeOnIcePowerplay: ", error);
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
          .find({})
          .sort({
            "playerStats.splits.stat.powerPlayGoals": -1,
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
          .find({})
          .sort({
            "playerStats.splits.stat.shortHandedGoals": -1,
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
          .find({})
          .sort({
            "playerStats.splits.stat.powerPlayPoints": -1,
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
          .find({})
          .sort({
            "playerStats.splits.stat.shortHandedPoints": -1,
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

// GET Top 10 Faceoff Percentage (10+ games)
router.get(
  "/players/top10FaceOffPercentage",
  async (req: Request, res: Response) => {
    try {
      if (collections.players) {
        const top10FaceOffPercentagePlayers = (await collections.players
          .find({ "playerStats.splits.stat.games": { $gte: 10 } })
          .sort({
            "playerInfo.primaryPosition.code": 1,
            "playerStats.splits.stat.faceOffPct": -1,
          })
          .collation({ locale: "en_US", numericOrdering: true })
          .limit(10)
          .toArray()) as PlayerClass[];
        return res.status(200).send(top10FaceOffPercentagePlayers);
      }
    } catch (error) {
      console.log("Error @ /players/top10FaceOffPercentage: ", error);
    }
  }
);

// GET Top 10 Save Percentage (10+ games)
router.get(
  "/players/top10SavePercentage",
  async (req: Request, res: Response) => {
    try {
      if (collections.players) {
        const top10SavePercentagePlayers = (await collections.players
          .find({ "playerStats.splits.stat.games": { $gte: 10 } })
          .sort({
            "playerStats.splits.stat.savePercentage": -1,
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

// GET Top 10 Wins (10+ games)
router.get("/players/top10Wins", async (req: Request, res: Response) => {
  try {
    if (collections.players) {
      const top10WinsPlayers = (await collections.players
        .find({ "playerStats.splits.stat.games": { $gte: 10 } })
        .sort({
          "playerStats.splits.stat.wins": -1,
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

// GET Top 10 Goals Against Average (10+ games)
router.get(
  "/players/top10GoalsAgainstAverage",
  async (req: Request, res: Response) => {
    try {
      if (collections.players) {
        const top10GoalsAgainstAveragePlayers = (await collections.players
          .find({
            "playerInfo.primaryPosition.code": "G",
            "playerStats.splits.stat.games": { $gte: 10 },
          })
          .sort({
            "playerStats.splits.stat.goalAgainstAverage": 1,
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

// GET league standings
router.get("/teams/standings", async (req: Request, res: Response) => {
  try {
    await axios
      .get("https://statsapi.web.nhl.com/api/v1/standings")
      .then((response) => res.status(200).send(response.data))
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log("Error @ /teams/standings: ", error);
  }
});

// GET todays scores
router.get("/games/scores", async (req: Request, res: Response) => {
  const todaysDate = new Date().toISOString().slice(0, 10);
  try {
    await axios
      .get(`https://nhl-score-api.herokuapp.com/api/scores?startDate=${todaysDate}&endDate=${todaysDate}`)
      .then((response) => res.status(200).send(response.data))
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log("Error @ /teams/standings: ", error);
  }
});

// GET all players
router.get("/players", (req: Request, res: Response) => {
  res.json({ message: "GET all players" });
});

// GET all teams
router.get("/teams", (req: Request, res: Response) => {
  res.json({ message: "GET all teams" });
});

// POST players
router.post("/teams", (req: Request, res: Response) => {
  res.json({ message: "GET all teams" });
});

// POST Player by full name
router.post("/players/getPlayer", async (req: Request, res: Response) => {
  try {
    if (collections.players) {
      console.log("player: ", req.body);
      const playerStats = (await collections.players
        .find({ "playerInfo.id": req.body.playerId })
        .toArray()) as PlayerClass[];
      return res.status(200).send(playerStats);
    }
  } catch (error) {
    console.log("Error @ /players/top10Points: ", error);
  }
});

export default router;
