import { TeamStandingsDataObject, TeamStandingsObject } from "../types";

const formatStandingsData = (data: TeamStandingsObject) => {
  const formattedStandingsData = data.standings.reduce(
    (acc: any, team: TeamStandingsDataObject) => {
      const conferenceName = team.conferenceName;
      const divisionName = team.divisionName;

      // Create conference if it doesn't exist
      if (!acc[conferenceName]) {
        acc[conferenceName] = {};
      }

      // Create division if it doesn't exist
      if (!acc[conferenceName][divisionName]) {
        acc[conferenceName][divisionName] = [];
      }

      // Push the team to the corresponding division
      acc[conferenceName][divisionName].push(team);

      return acc;
    },
    {}
  );

  return formattedStandingsData;
};

export default formatStandingsData;
