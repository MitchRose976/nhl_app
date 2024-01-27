import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
  BASE_URL,
  TOP_10_POINTS_PATH,
  TOP_10_GOALS_PATH,
  TOP_10_ASSISTS_PATH,
  TOP_10_PLUS_MINUS_PATH,
  TOP_10_PENALTY_MINUTES_PATH,
  TOP_10_TIME_ON_ICE_PER_GAME_PATH,
  TOP_10_POWERPLAY_GOALS_PATH,
  TOP_10_SHORT_HANDED_GOALS_PATH,
  TOP_10_POWERPLAY_POINTS_PATH,
  TOP_10_SHORT_HANDED_POINTS_PATH,
  TOP_10_FACE_OFF_PERCENTAGE_PATH,
  TOP_10_SHOOTING_PERCENTAGE_PATH,
  TOP_10_SHOTS_ON_NET_PATH,
  TOP_10_GAME_WINNING_GOALS_PATH,
  TOP_10_OT_GOALS_PATH,
  TOP_10_SAVE_PERCENTAGE_PATH,
  TOP_10_WINS_PATH,
  TOP_10_LOSSES_PATH,
  TOP_10_GAMES_STARTED_PATH,
  TOP_10_SHUTOUTS_PATH,
  TOP_10_GOALS_AGAINST_AVERAGE_PATH,
  GET_STANDINGS_PATH,
  GET_SCORES_PATH,
  GET_TEAM_STATS_PATH,
  TEAM_STATS_FORMATTED_PATH,
} from "../../shared/constants";
import type { FormattedTeamStats, PlayerDataType } from "../../shared/types";
import { StandingsFormattedType } from "../../../../server/src/types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getTop10Points: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_POINTS_PATH,
    }),
    getTop10Goals: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_GOALS_PATH,
    }),
    getTop10Assists: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_ASSISTS_PATH,
    }),
    getTop10PlusMinus: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_PLUS_MINUS_PATH,
    }),
    getTop10PenaltyMinutes: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_PENALTY_MINUTES_PATH,
    }),
    getTop10TimeOnIcePerGame: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_TIME_ON_ICE_PER_GAME_PATH,
    }),
    getTop10PowerplayGoals: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_POWERPLAY_GOALS_PATH,
    }),
    getTop10ShortHandedGoals: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_SHORT_HANDED_GOALS_PATH,
    }),
    getTop10PowerplayPoints: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_POWERPLAY_POINTS_PATH,
    }),
    getTop10ShortHandedPoints: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_SHORT_HANDED_POINTS_PATH,
    }),
    getTop10FaceOffPercentage: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_FACE_OFF_PERCENTAGE_PATH,
    }),
    getTop10ShootingPercentage: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_SHOOTING_PERCENTAGE_PATH,
    }),
    getTop10ShotsOnNet: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_SHOTS_ON_NET_PATH,
    }),
    getTop10GameWinningGoals: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_GAME_WINNING_GOALS_PATH,
    }),
    getTop10OtGoals: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_OT_GOALS_PATH,
    }),
    getTop10SavePercentage: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_SAVE_PERCENTAGE_PATH,
    }),
    getTop10Wins: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_WINS_PATH,
    }),
    getTop10Losses: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_LOSSES_PATH,
    }),
    getTop10GamesStarted: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_GAMES_STARTED_PATH,
    }),
    getTop10Shutouts: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_SHUTOUTS_PATH,
    }),
    getTop10GoalsAgainstAverage: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_GOALS_AGAINST_AVERAGE_PATH,
    }),
    getStandings: builder.query<StandingsFormattedType, void>({
      query: () => GET_STANDINGS_PATH,
    }),
    getScores: builder.query<any, void>({
      query: () => GET_SCORES_PATH,
    }),
    getTeamStatsByID: builder.query<any, { teamID: number }>({
      query: (args) => {
        const { teamID } = args;
        return {
          url: `${GET_TEAM_STATS_PATH}`,
          params: { teamID },
        };
      },
    }),
    getTeamStatsFormatted: builder.query<FormattedTeamStats, void>({
      query: () => TEAM_STATS_FORMATTED_PATH,
    }),
  }),
});

export const {
  useGetTop10PointsQuery,
  useGetTop10GoalsQuery,
  useGetTop10AssistsQuery,
  useGetTop10PlusMinusQuery,
  useGetTop10PenaltyMinutesQuery,
  useGetTop10TimeOnIcePerGameQuery,
  useGetTop10PowerplayGoalsQuery,
  useGetTop10ShortHandedGoalsQuery,
  useGetTop10PowerplayPointsQuery,
  useGetTop10ShortHandedPointsQuery,
  useGetTop10FaceOffPercentageQuery,
  useGetTop10ShootingPercentageQuery,
  useGetTop10ShotsOnNetQuery,
  useGetTop10GameWinningGoalsQuery,
  useGetTop10OtGoalsQuery,
  useGetTop10SavePercentageQuery,
  useGetTop10WinsQuery,
  useGetTop10LossesQuery,
  useGetTop10GamesStartedQuery,
  useGetTop10ShutoutsQuery,
  useGetTop10GoalsAgainstAverageQuery,
  useGetStandingsQuery,
  useGetScoresQuery,
  useGetTeamStatsByIDQuery,
  useGetTeamStatsFormattedQuery,
} = apiSlice;
