"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const playerSchema = new mongoose_1.Schema({
    playerInfo: {
        type: "object",
        required: [true, "Player info is required"],
    },
    playerStats: {
        type: "object",
        required: [true, "Player stats are required"],
    },
    playerHeadshot: {
        type: "string",
        required: [true, "Player headshot is required"],
    },
});
const PlayerModel = (0, mongoose_1.model)("Player", playerSchema);
exports.default = PlayerModel;
