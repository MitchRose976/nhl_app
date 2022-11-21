"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    teamId: {
        type: "number",
        required: [true, "Team ID is required"],
    },
    teamName: {
        type: "string",
        required: [true, "Team Name is required"],
    },
    teamAbbreviation: {
        type: "string",
        required: [true, "Team Abbreviation is required"],
    },
    teamDivision: {
        type: "object",
        required: [true, "Team Division is required"],
    },
    teamConference: {
        type: "object",
        required: [true, "Team Division is required"],
    },
    teamVenue: {
        type: "object",
        required: [true, "Team Venue is required"],
    },
    firstYearOfPlay: {
        type: "string",
        required: [true, "First Year of Play is required"],
    },
    teamLogoUrl: {
        type: "string",
        required: [true, "Team Logo URL is required"],
    },
});
const TeamModel = (0, mongoose_1.model)("Team", teamSchema);
exports.default = TeamModel;
