"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const models_1 = require("../models");
const connect_1 = require("../connect");
const axios_1 = __importDefault(require("axios"));
const standingsService_1 = require("../service/standingsService");
const constants_1 = require("../constants");
dotenv.config();
const router = express_1.default.Router();
router.use(express_1.default.json());
router.use(express_1.default.urlencoded({ extended: true }));
// GET
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.json({message: 'GET base url'})
    models_1.TeamModel.find().then((teams) => res.json(teams));
}));
// GET Top 10 Points
router.get("/players/top10Points", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (connect_1.collections.players) {
            const top10PointsPlayers = (yield connect_1.collections.players
                .find({})
                .sort({ "playerStats.splits.stat.points": -1 })
                .limit(10)
                .toArray());
            return res.status(200).send(top10PointsPlayers);
        }
    }
    catch (error) {
        console.log("Error @ /players/top10Points: ", error);
    }
}));
// GET Top 10 Goals
router.get("/players/top10Goals", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (connect_1.collections.players) {
            const top10GoalsPlayers = (yield connect_1.collections.players
                .find({})
                .sort({ "playerStats.splits.stat.goals": -1 })
                .limit(10)
                .toArray());
            return res.status(200).send(top10GoalsPlayers);
        }
    }
    catch (error) {
        console.log("Error @ /players/top10Goals: ", error);
    }
}));
// GET Top 10 Assists
router.get("/players/top10Assists", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (connect_1.collections.players) {
            const top10AssistsPlayers = (yield connect_1.collections.players
                .find({})
                .sort({ "playerStats.splits.stat.assists": -1 })
                .limit(10)
                .toArray());
            return res.status(200).send(top10AssistsPlayers);
        }
    }
    catch (error) {
        console.log("Error @ /players/top10Assists: ", error);
    }
}));
// GET Top 10 PlusMinus
router.get("/players/top10PlusMinus", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (connect_1.collections.players) {
            const top10PlusMinusPlayers = (yield connect_1.collections.players
                .find({})
                .sort({ "playerStats.splits.stat.plusMinus": -1 })
                .limit(10)
                .toArray());
            return res.status(200).send(top10PlusMinusPlayers);
        }
    }
    catch (error) {
        console.log("Error @ /players/top10PlusMinus: ", error);
    }
}));
// GET Top 10 Penalty Minutes
router.get("/players/top10PenaltyMinutes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (connect_1.collections.players) {
            const top10PenaltyMinutesPlayers = (yield connect_1.collections.players
                .find({})
                .sort({ "playerStats.splits.stat.pim": -1 })
                .limit(10)
                .toArray());
            return res.status(200).send(top10PenaltyMinutesPlayers);
        }
    }
    catch (error) {
        console.log("Error @ /players/top10PenaltyMinutes: ", error);
    }
}));
// GET Top 10 Hits
router.get("/players/top10Hits", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (connect_1.collections.players) {
            const top10HitsPlayers = (yield connect_1.collections.players
                .find({})
                .sort({ "playerStats.splits.stat.hits": -1 })
                .limit(10)
                .toArray());
            return res.status(200).send(top10HitsPlayers);
        }
    }
    catch (error) {
        console.log("Error @ /players/top10Hits: ", error);
    }
}));
// GET Top 10 Total Time on Ice
router.get("/players/top10TotalTimeOnIce", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (connect_1.collections.players) {
            const top10TotalTimeOnIcePlayers = (yield connect_1.collections.players
                .find({})
                .sort({
                "playerInfo.primaryPosition.type": 1,
                "playerStats.splits.stat.timeOnIce": -1,
            })
                .collation({ locale: "en_US", numericOrdering: true })
                .limit(10)
                .toArray());
            return res.status(200).send(top10TotalTimeOnIcePlayers);
        }
    }
    catch (error) {
        console.log("Error @ /players/top10TotalTimeOnIce: ", error);
    }
}));
// GET Top 10 Time on Ice - Per Game
router.get("/players/top10TimeOnIcePerGame", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (connect_1.collections.players) {
            const top10TimeOnIcePerGamePlayers = (yield connect_1.collections.players
                .find({})
                .sort({
                "playerInfo.primaryPosition.type": 1,
                "playerStats.splits.stat.timeOnIcePerGame": -1,
            })
                .collation({ locale: "en_US", numericOrdering: true })
                .limit(10)
                .toArray());
            return res.status(200).send(top10TimeOnIcePerGamePlayers);
        }
    }
    catch (error) {
        console.log("Error @ /players/top10TimeOnIcePerGame: ", error);
    }
}));
// GET Top 10 Time on Ice - Short Handed
router.get("/players/top10TimeOnIceShortHanded", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (connect_1.collections.players) {
            const top10TimeOnIceShortHandedPlayers = (yield connect_1.collections.players
                .find({})
                .sort({
                "playerInfo.primaryPosition.type": 1,
                "playerStats.splits.stat.shortHandedTimeOnIce": -1,
            })
                .collation({ locale: "en_US", numericOrdering: true })
                .limit(10)
                .toArray());
            return res.status(200).send(top10TimeOnIceShortHandedPlayers);
        }
    }
    catch (error) {
        console.log("Error @ /players/top10TimeOnIceShortHanded: ", error);
    }
}));
// GET Top 10 Time on Ice - Powerplay
router.get("/players/top10TimeOnIcePowerplay", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (connect_1.collections.players) {
            const top10TimeOnIcePowerplayPlayers = (yield connect_1.collections.players
                .find({})
                .sort({
                "playerInfo.primaryPosition.type": 1,
                "playerStats.splits.stat.powerPlayTimeOnIce": -1,
            })
                .collation({ locale: "en_US", numericOrdering: true })
                .limit(10)
                .toArray());
            return res.status(200).send(top10TimeOnIcePowerplayPlayers);
        }
    }
    catch (error) {
        console.log("Error @ /players/top10TimeOnIcePowerplay: ", error);
    }
}));
// GET Top 10 Powerplay Goals
router.get("/players/top10PowerplayGoals", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (connect_1.collections.players) {
            const top10PowerplayGoalsPlayers = (yield connect_1.collections.players
                .find({})
                .sort({
                "playerStats.splits.stat.powerPlayGoals": -1,
            })
                .limit(10)
                .toArray());
            return res.status(200).send(top10PowerplayGoalsPlayers);
        }
    }
    catch (error) {
        console.log("Error @ /players/top10PowerplayGoals: ", error);
    }
}));
// GET Top 10 ShortHanded Goals
router.get("/players/top10ShortHandedGoals", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (connect_1.collections.players) {
            const top10ShortHandedGoalsPlayers = (yield connect_1.collections.players
                .find({})
                .sort({
                "playerStats.splits.stat.shortHandedGoals": -1,
            })
                .limit(10)
                .toArray());
            return res.status(200).send(top10ShortHandedGoalsPlayers);
        }
    }
    catch (error) {
        console.log("Error @ /players/top10ShortHandedGoals: ", error);
    }
}));
// GET Top 10 Powerplay Points
router.get("/players/top10PowerplayPoints", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (connect_1.collections.players) {
            const top10PowerplayPointsPlayers = (yield connect_1.collections.players
                .find({})
                .sort({
                "playerStats.splits.stat.powerPlayPoints": -1,
            })
                .limit(10)
                .toArray());
            return res.status(200).send(top10PowerplayPointsPlayers);
        }
    }
    catch (error) {
        console.log("Error @ /players/top10PowerplayPoints: ", error);
    }
}));
// GET Top 10 ShortHanded Points
router.get("/players/top10ShortHandedPoints", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (connect_1.collections.players) {
            const top10ShortHandedPointsPlayers = (yield connect_1.collections.players
                .find({})
                .sort({
                "playerStats.splits.stat.shortHandedPoints": -1,
            })
                .limit(10)
                .toArray());
            return res.status(200).send(top10ShortHandedPointsPlayers);
        }
    }
    catch (error) {
        console.log("Error @ /players/top10ShortHandedPoints: ", error);
    }
}));
// GET Top 10 Faceoff Percentage (10+ games)
router.get("/players/top10FaceOffPercentage", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (connect_1.collections.players) {
            const top10FaceOffPercentagePlayers = (yield connect_1.collections.players
                .find({ "playerStats.splits.stat.games": { $gte: 10 } })
                .sort({
                "playerInfo.primaryPosition.code": 1,
                "playerStats.splits.stat.faceOffPct": -1,
            })
                .collation({ locale: "en_US", numericOrdering: true })
                .limit(10)
                .toArray());
            return res.status(200).send(top10FaceOffPercentagePlayers);
        }
    }
    catch (error) {
        console.log("Error @ /players/top10FaceOffPercentage: ", error);
    }
}));
// GET Top 10 Save Percentage (10+ games)
router.get("/players/top10SavePercentage", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (connect_1.collections.players) {
            const top10SavePercentagePlayers = (yield connect_1.collections.players
                .find({ "playerStats.splits.stat.games": { $gte: 10 } })
                .sort({
                "playerStats.splits.stat.savePercentage": -1,
            })
                .collation({ locale: "en_US", numericOrdering: true })
                .limit(10)
                .toArray());
            return res.status(200).send(top10SavePercentagePlayers);
        }
    }
    catch (error) {
        console.log("Error @ /players/top10SavePercentage: ", error);
    }
}));
// GET Top 10 Wins (10+ games)
router.get("/players/top10Wins", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (connect_1.collections.players) {
            const top10WinsPlayers = (yield connect_1.collections.players
                .find({ "playerStats.splits.stat.games": { $gte: 10 } })
                .sort({
                "playerStats.splits.stat.wins": -1,
            })
                .collation({ locale: "en_US", numericOrdering: true })
                .limit(10)
                .toArray());
            return res.status(200).send(top10WinsPlayers);
        }
    }
    catch (error) {
        console.log("Error @ /players/top10Wins: ", error);
    }
}));
// GET Top 10 Goals Against Average (10+ games)
router.get("/players/top10GoalsAgainstAverage", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (connect_1.collections.players) {
            const top10GoalsAgainstAveragePlayers = (yield connect_1.collections.players
                .find({
                "playerInfo.primaryPosition.code": "G",
                "playerStats.splits.stat.games": { $gte: 10 },
            })
                .sort({
                "playerStats.splits.stat.goalAgainstAverage": 1,
            })
                .collation({ locale: "en_US", numericOrdering: true })
                .limit(10)
                .toArray());
            return res.status(200).send(top10GoalsAgainstAveragePlayers);
        }
    }
    catch (error) {
        console.log("Error @ /players/top10GoalsAgainstAverage: ", error);
    }
}));
// GET league standings
router.get("/teams/standings", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield axios_1.default
            .get(`${constants_1.NHL_API_BASE}/standings/now/`)
            .then((response) => {
            const formattedStandings = (0, standingsService_1.formatStandingsData)(response);
            res.status(200).send(formattedStandings);
        })
            .catch((error) => {
            console.log(error);
        });
    }
    catch (error) {
        console.log("Error @ /teams/standings: ", error);
    }
}));
// GET todays scores
router.get("/games/scores", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todaysDate = new Date()
        .toLocaleDateString("pt-br")
        .split("/")
        .reverse()
        .join("-");
    try {
        yield axios_1.default
            //.get(`https://nhl-score-api.herokuapp.com/api/scores?startDate=${'2023-04-10'}&endDate=${'2023-04-10'}`)
            .get(`https://nhl-score-api.herokuapp.com/api/scores?startDate=${todaysDate}&endDate=${todaysDate}`)
            .then((response) => res.status(200).send(response.data))
            .catch((error) => {
            console.log(error);
        });
    }
    catch (error) {
        console.log("Error @ /teams/standings: ", error);
    }
}));
// POST team stats by id
router.get("/teams/stats/:teamID/:season", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield axios_1.default
            .get(
        // `https://statsapi.web.nhl.com/api/v1/teams/${req.params.teamID}/stats`
        `https://api.nhle.com/stats/rest/en/team/summary?isAggregate=false&isGame=false&sort=%5B%7B%22property%22:%22points%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22wins%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22teamId%22,%22direction%22:%22ASC%22%7D%5D&start=0&limit=50&factCayenneExp=gamesPlayed%3E=1&cayenneExp=franchiseId%3D${req.params.teamID}%20and%20gameTypeId=2%20and%20seasonId%3C=20232024%20and%20seasonId%3E=${req.params.season}`)
            .then((response) => {
            return res.status(200).send(response.data);
        })
            .catch((error) => {
            console.log(error);
        });
    }
    catch (error) {
        console.log("Error @ /teams/stats: ", error);
    }
}));
// POST Player by full name
router.post("/players/getPlayer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (connect_1.collections.players) {
            console.log("player: ", req.body);
            const playerStats = (yield connect_1.collections.players
                .find({ "playerInfo.id": req.body.playerId })
                .toArray());
            return res.status(200).send(playerStats);
        }
    }
    catch (error) {
        console.log("Error @ /players/top10Points: ", error);
    }
}));
exports.default = router;
