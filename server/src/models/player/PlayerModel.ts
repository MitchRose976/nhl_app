import { model, Schema } from "mongoose";
import { PlayerType } from "../../types";

const playerSchema = new Schema<PlayerType>({
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

const PlayerModel = model<PlayerType>("Player", playerSchema);

export default PlayerModel;
