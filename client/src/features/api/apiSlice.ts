import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
  BASE_URL,
  TOP_10_POINTS_PATH,
  TOP_10_GOALS_PATH,
  TOP_10_ASSISTS_PATH,
  TOP_10_PLUS_MINUS_PATH,
  TOP_10_PENALTY_MINUTES_PATH,
  TOP_10_HITS_PATH,
  TOP_10_TOTAL_TIME_ON_ICE_PATH,
  TOP_10_TIME_ON_ICE_PER_GAME_PATH,
  TOP_10_TIME_ON_ICE_SHORT_HANDED_PATH,
  TOP_10_TIME_ON_ICE_POWERPLAY_PATH,
  TOP_10_POWERPLAY_GOALS_PATH,
  TOP_10_SHORT_HANDED_GOALS_PATH,
  TOP_10_POWERPLAY_POINTS_PATH,
  TOP_10_SHORT_HANDED_POINTS_PATH,
  TOP_10_FACE_OFF_PERCENTAGE_PATH,
  TOP_10_SAVE_PERCENTAGE_PATH,
  TOP_10_WINS_PATH,
  TOP_10_GOALS_AGAINST_AVERAGE_PATH,
  //GET_PLAYER_STATS_PATH,
} from "../../shared/constants";
import type { PlayerDataType } from "../../../../server/src/types";

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
    getTop10Hits: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_HITS_PATH,
    }),
    getTop10TotalTimeOnIce: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_TOTAL_TIME_ON_ICE_PATH,
    }),
    getTop10TimeOnIcePerGame: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_TIME_ON_ICE_PER_GAME_PATH,
    }),
    getTop10TimeOnIceShortHanded: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_TIME_ON_ICE_SHORT_HANDED_PATH,
    }),
    getTop10TimeOnIcePowerplay: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_TIME_ON_ICE_POWERPLAY_PATH,
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
    getTop10SavePercentage: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_SAVE_PERCENTAGE_PATH,
    }),
    getTop10Wins: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_WINS_PATH,
    }),
    getTop10GoalsAgainstAverage: builder.query<PlayerDataType[], void>({
      query: () => TOP_10_GOALS_AGAINST_AVERAGE_PATH,
    }),
  }),
});

export const {
  useGetTop10PointsQuery,
  useGetTop10GoalsQuery,
  useGetTop10AssistsQuery,
  useGetTop10PlusMinusQuery,
  useGetTop10PenaltyMinutesQuery,
  useGetTop10HitsQuery,
  useGetTop10TotalTimeOnIceQuery,
  useGetTop10TimeOnIcePerGameQuery,
  useGetTop10TimeOnIceShortHandedQuery,
  useGetTop10TimeOnIcePowerplayQuery,
  useGetTop10PowerplayGoalsQuery,
  useGetTop10ShortHandedGoalsQuery,
  useGetTop10PowerplayPointsQuery,
  useGetTop10ShortHandedPointsQuery,
  useGetTop10FaceOffPercentageQuery,
  useGetTop10SavePercentageQuery,
  useGetTop10WinsQuery,
  useGetTop10GoalsAgainstAverageQuery,
} = apiSlice;
