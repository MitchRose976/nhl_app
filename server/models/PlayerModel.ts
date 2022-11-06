import { model, Schema, Model, Document } from "mongoose";

type Player = {
  playerInfo: object;
  playerStats: object;
  playerHeadshot: object;
};

const playerSchema = new Schema<Player>({
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

const PlayerModel = model<Player>("Player", playerSchema);

export default PlayerModel;
