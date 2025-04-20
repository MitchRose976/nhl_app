import { apiSlice } from "../../api/apiSlice";

export const useTop10Queries = () => {
  const queries = {
    // PLAYERS
    getTop10Points: apiSlice.endpoints.getTop10Points.useQuery(),
    getTop10Goals: apiSlice.endpoints.getTop10Goals.useQuery(),
    getTop10Assists: apiSlice.endpoints.getTop10Assists.useQuery(),
    getTop10PlusMinus: apiSlice.endpoints.getTop10PlusMinus.useQuery(),
    getTop10PenaltyMinutes: apiSlice.endpoints.getTop10PenaltyMinutes.useQuery(),
    getTop10TimeOnIcePerGame: apiSlice.endpoints.getTop10TimeOnIcePerGame.useQuery(),
    getTop10PowerplayGoals: apiSlice.endpoints.getTop10PowerplayGoals.useQuery(),
    getTop10ShortHandedGoals: apiSlice.endpoints.getTop10ShortHandedGoals.useQuery(),
    getTop10PowerplayPoints: apiSlice.endpoints.getTop10PowerplayPoints.useQuery(),
    getTop10ShortHandedPoints: apiSlice.endpoints.getTop10ShortHandedPoints.useQuery(),
    getTop10FaceOffPercentage: apiSlice.endpoints.getTop10FaceOffPercentage.useQuery(),
    getTop10ShootingPercentage: apiSlice.endpoints.getTop10ShootingPercentage.useQuery(),
    getTop10ShotsOnNet: apiSlice.endpoints.getTop10ShotsOnNet.useQuery(),
    getTop10GameWinningGoals: apiSlice.endpoints.getTop10GameWinningGoals.useQuery(),
    getTop10OtGoals: apiSlice.endpoints.getTop10OtGoals.useQuery(),
    // GOALIES
    getTop10SavePercentage: apiSlice.endpoints.getTop10SavePercentage.useQuery(),
    getTop10Wins: apiSlice.endpoints.getTop10Wins.useQuery(),
    getTop10Losses: apiSlice.endpoints.getTop10Losses.useQuery(),
    getTop10GamesStarted: apiSlice.endpoints.getTop10GamesStarted.useQuery(),
    getTop10Shutouts: apiSlice.endpoints.getTop10Shutouts.useQuery(),
    getTop10GoalsAgainstAverage: apiSlice.endpoints.getTop10GoalsAgainstAverage.useQuery(),
  } as const;

  return queries;
};

export type QueryHooks = ReturnType<typeof useTop10Queries>;
export type QueryType = keyof QueryHooks; 