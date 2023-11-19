"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamModel = exports.PlayerModel = void 0;
const PlayerModel_1 = __importDefault(require("./player/PlayerModel"));
exports.PlayerModel = PlayerModel_1.default;
const TeamModel_1 = __importDefault(require("./team/TeamModel"));
exports.TeamModel = TeamModel_1.default;
