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

export interface PlayerBioFormattedType {
  [key: string]: string | boolean | number | object;
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
}

export interface SeasonStatsType {
  [key: string]: number | string;
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
}

export interface PlayerStatsFormattedType {
  [key: string]: object | string | number;
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
      stat: SeasonStatsType;
    }
  ];
}

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

export type TeamStandingsDataObject = {
  conferenceAbbrev: string;
  conferenceHomeSequence: number;
  conferenceL10Sequence: number;
  conferenceName: string;
  conferenceRoadSequence: number;
  conferenceSequence: number;
  date: string;
  divisionAbbrev: string;
  divisionHomeSequence: number;
  divisionL10Sequence: number;
  divisionName: string;
  divisionRoadSequence: number;
  divisionSequence: number;
  gameTypeId: number;
  gamesPlayed: number;
  goalDifferential: number;
  goalDifferentialPctg: number;
  goalAgainst: number;
  goalFor: number;
  goalsForPctg: number;
  homeGamesPlayed: number;
  homeGoalDifferential: number;
  homeGoalsAgainst: number;
  homeGoalsFor: number;
  homeLosses: number;
  homeOtLosses: number;
  homePoints: number;
  homeRegulationPlusOtWins: number;
  homeRegulationWins: number;
  homeTies: number;
  homeWins: number;
  l10GamesPlayed: number;
  l10GoalDifferential: number;
  l10GoalsAgainst: number;
  l10GoalsFor: number;
  l10Losses: number;
  l10OtLosses: number;
  l10Points: number;
  l10RegulationPlusOtWins: number;
  l10RegulationWins: number;
  l10Ties: number;
  l10Wins: number;
  leagueHomeSequence: number;
  leagueL10Sequence: number;
  leagueRoadSequence: number;
  leagueSequence: number;
  losses: number;
  otLosses: number;
  placeName: {
    default: string;
  };
  pointPctg: number;
  points: number;
  regulationPlusOtWinPctg: number;
  regulationPlusOtWins: number;
  regulationWinPctg: number;
  regulationWins: number;
  roadGamesPlayed: number;
  roadGoalDifferential: number;
  roadGoalsAgainst: number;
  roadGoalsFor: number;
  roadLosses: number;
  roadOtLosses: number;
  roadPoints: number;
  roadRegulationPlusOtWins: number;
  roadRegulationWins: number;
  roadTies: number;
  roadWins: number;
  seasonId: number;
  shootoutLosses: number;
  shootoutWins: number;
  streakCode: string;
  streakCount: number;
  teamName: {
    default: string;
    fr: string;
  };
  teamAbbrev: {
    default: string;
  };
  teamLogo: string;
  ties: number;
  waiversSequence: number;
  wildcardSequence: number;
  winPctg: number;
  wins: number;

  [key: string]: number | string | {
    default: string;
    fr?: string;
  } | number[];
};

export type TeamStandingsObject = {
  wildCardIndicator: boolean;
  standings: TeamStandingsDataObject[]
};

export type StandingsFormattedType = {
  "Eastern": {
    "Atlantic": TeamStandingsDataObject[],
    "Metropolitan": TeamStandingsDataObject[],
  },
  "Western": {
    "Pacific": TeamStandingsDataObject[],
    "Central": TeamStandingsDataObject[],
  }

  [conference: string]: {
    [division: string]: TeamStandingsDataObject[];
  };
}











