import { Types } from "mongoose";

export type TeamType = {
  teamId: number;
  teamName: string;
  teamAbbreviation: string;
  teamDivision: object;
  teamConference: object;
  teamVenue: object;
  firstYearOfPlay: string;
  teamLogoUrl: string;
};

export type PlayerType = {
  playerInfo: object;
  playerStats: object;
  playerHeadshot: object;
};

export type TeamDataType = {
  id: number;
  name: string;
  venue: {
    name: string;
    link: string;
    city: string;
    timeZone: {
      id: string;
      offset: number;
      tz: string;
    };
  };
  abbreviation: string;
  teamName: string;
  locationName: string;
  firstYearOfPlay: string;
  division: {
    id: number;
    name: string;
    nameShort: string;
    link: string;
    abbreviation: string;
  };
  conference: {
    id: number;
    name: string;
    link: string;
  };
  franchise: {
    franchiseId: number;
    teamName: string;
    link: string;
  };
  shortName: string;
  officialSiteUrl: string;
  franchiseId: number;
  active: boolean;
};

/* 
  this type is returned inside an array from:
  https://statsapi.web.nhl.com/api/v1/teams/${teamId}/roster
  example: [
      {
      person: {
        id: 8474697,
        fullName: 'Mark Borowiecki',
        link: '/api/v1/people/8474697'
      },
      jerseyNumber: '90',
      position: {
        code: 'D',
        name: 'Defenseman',
        type: 'Defenseman',
        abbreviation: 'D'
      }
    },
    ... etc.
  ]
*/
export type BasicPlayerInfoType = {
  person: {
    id: number;
    fullName: string;
    link: string;
  };
  jerseyNumber: string;
  position: {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
  };
};

export type RosterType = {
  copyright: string;
  roster: BasicPlayerInfoType[];
  link: string;
};

export type PlayerBioFormattedType = {
  id: number;
  fullName: string;
  link: string;
  firstName: string;
  lastName: string;
  primaryNumber: string;
  birthDate: string;
  currentAge: number;
  birthCity: string;
  birthStateProvince: string;
  birthCountry: string;
  nationality: string;
  height: string;
  weight: number;
  active: boolean;
  alternateCaptain: boolean;
  captain: boolean;
  rookie: boolean;
  shootsCatches: string;
  rosterStatus: string;
  currentTeam: {
    id: number;
    name: string;
    link: string;
  };
  primaryPosition: {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
  };
};

export type PlayerStatsFormattedType = {
  type: {
    displayName: string;
    gameType: {
      id: string;
      description: string;
      postseason: boolean;
    };
  };
  splits: [
    {
      season: string;
      stat: {
        timeOnIce: string;
        assists: number;
        goals: number;
        pim: number;
        shots: number;
        games: number;
        hits: number;
        powerPlayGoals: number;
        powerPlayPoints: number;
        powerPlayTimeOnIce: string;
        evenTimeOnIce: string;
        penaltyMinutes: string;
        faceOffPct: number;
        shotPct: number;
        gameWinningGoals: number;
        overTimeGoals: number;
        shortHandedGoals: number;
        shortHandedPoints: number;
        shortHandedTimeOnIce: string;
        blocked: number;
        plusMinus: number;
        points: number;
        shifts: number;
        timeOnIcePerGame: string;
        evenTimeOnIcePerGame: string;
        shortHandedTimeOnIcePerGame: string;
        powerPlayTimeOnIcePerGame: string;
      };
    }
  ];
};

// this is the returned from call to:
// https://statsapi.web.nhl.com/api/v1/people/${playerID}
export type PlayerBioFromApiType = {
  copyright: string;
  people: [PlayerBioFormattedType];
};

// this is the returned from call to:
// https://statsapi.web.nhl.com/api/v1/people/${playerID}/stats?stats=statsSingleSeason&season=20222023
export type PlayerStatsFromApiType = {
  copyright: string;
  stats: [PlayerStatsFormattedType];
};

// this is the type stored in the players collection in mongoDB
export type PlayerDataType = {
  playerInfo: PlayerBioFormattedType;
  playerStats: PlayerStatsFormattedType;
  playerHeadshot: string;
  _id: Types.ObjectId;
};
