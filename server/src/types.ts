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

export interface TeamRecordInterface {
  [key: string]: object | number | string;
  team: {
    id: number;
    name: string;
    link: string;
  };
  leagueRecord: {
    wins: number;
    losses: number;
    ot: number;
    type: string;
  };
  regulationWins: number;
  goalsAgainst: number;
  goalsScored: number;
  points: number;
  divisionRank: string;
  divisionL10Rank: string;
  divisionRoadRank: string;
  divisionHomeRank: string;
  conferenceRank: string;
  conferenceL10Rank: string;
  conferenceRoadRank: string;
  conferenceHomeRank: string;
  leagueRank: string;
  leagueL10Rank: string;
  leagueRoadRank: string;
  leagueHomeRank: string;
  wildCardRank: string;
  row: number;
  gamesPlayed: number;
  streak: {
    streakType: string;
    streakNumber: number;
    streakCode: string;
  };
  clinchIndicator: string;
  pointsPercentage: number;
  ppDivisionRank: string;
  ppConferenceRank: string;
  ppLeagueRank: string;
  lastUpdated: string;
}

export interface StandingsRecordInterface {
  [key: string]: object | number | string;
  standingsType: string;
  league: {
    id: number;
    name: string;
    link: string;
  };
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
  teamRecords: TeamRecordInterface[];
}

export interface StandingsDataInterface {
  [key: string]: object | string | number;
  copyright: string;
  records: StandingsRecordInterface[];
}

export interface GameInterface {
  [key: string]: any;
  status: {
    state: string;
    progress?: {
      currentPeriod: number;
      currentPeriodOrdinal: string;
      currentPeriodTimeRemaining: {
        pretty: string;
        min: number;
        sec: number;
      };
    };
  };
  startTime: string;
  goals: [];
  scores: {
    [key: string]: number;
  };
  teams: {
    away: {
      abbreviation: string;
      id: number;
      locationName: string;
      shortName: string;
      teamName: string;
    };
    home: {
      abbreviation: string;
      id: number;
      locationName: string;
      shortName: string;
      teamName: string;
    };
  };
  currentStats: {
    records: {
      [key: string]: {
        wins: number;
        losses: number;
        ot: number;
      };
    };
    standings: {
      [key: string]: {
        divisionRank: string;
        leagueRank: string;
        pointsFromPlayoffSpot: string;
      };
    };
    playoffSeries: {
      round: number;
      wins: {
        [key: string]: number;
      };
    };
  };
}

export interface TodaysGamesInterface {
  [key: string]: object | object[];
  date: {
    raw: string;
    pretty: string;
  };
  games: GameInterface[];
}

export type PlayerInfoType = {
  player: string;
  playerId: number;
  seasonTotal?: number;
};

export type GoalType = {
  team: string;
  period: string;
  scorer: PlayerInfoType;
  sec: number;
  min: number;
  assists: PlayerInfoType[];
  strength?: string;
  emptyNet?: boolean;
};

export interface TeamStatsDataType {
  copyright: string;
  stats: [
    {
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
          stat: {
            gamesPlayed: number;
            wins: number;
            losses: number;
            ot: number;
            pts: number;
            ptPctg: "61.0";
            goalsPerGame: number;
            goalsAgainstPerGame: number;
            evGGARatio: number;
            powerPlayPercentage: string;
            powerPlayGoals: number;
            powerPlayGoalsAgainst: number;
            powerPlayOpportunities: number;
            penaltyKillPercentage: string;
            shotsPerGame: number;
            shotsAllowed: number;
            winScoreFirst: number;
            winOppScoreFirst: number;
            winLeadFirstPer: number;
            winLeadSecondPer: number;
            winOutshootOpp: number;
            winOutshotByOpp: number;
            faceOffsTaken: number;
            faceOffsWon: number;
            faceOffsLost: number;
            faceOffWinPercentage: string;
            shootingPctg: number;
            savePctg: number;
          };
          team: {
            id: number;
            name: string;
            link: string;
          };
        }
      ];
    },
    {
      type: {
        displayName: string;
        gameType: null;
      };
      splits: [
        {
          stat: {
            wins: string;
            losses: string;
            ot: string;
            pts: string;
            ptPctg: string;
            goalsPerGame: string;
            goalsAgainstPerGame: string;
            evGGARatio: string;
            powerPlayPercentage: string;
            powerPlayGoals: string;
            powerPlayGoalsAgainst: string;
            powerPlayOpportunities: string;
            penaltyKillOpportunities: string;
            penaltyKillPercentage: string;
            shotsPerGame: string;
            shotsAllowed: string;
            winScoreFirst: string;
            winOppScoreFirst: string;
            winLeadFirstPer: string;
            winLeadSecondPer: string;
            winOutshootOpp: string;
            winOutshotByOpp: string;
            faceOffsTaken: string;
            faceOffsWon: string;
            faceOffsLost: string;
            faceOffWinPercentage: string;
            savePctRank: string;
            shootingPctRank: string;
          };
          team: {
            id: number;
            name: string;
            link: string;
          };
        }
      ];
    }
  ];
}


export interface formattedTeamStatType {
  teamName: string;
  data: {
    x: string;
    y: number;
  }[];
}