import { model, Schema } from "mongoose";
import { TeamType } from "../../types";

const teamSchema = new Schema<TeamType>({
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

const TeamModel = model<TeamType>("Team", teamSchema);

export default TeamModel;
