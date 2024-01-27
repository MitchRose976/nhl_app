import { Types } from "mongoose";

export type CurrentTeamRosterPlayerInfoType = {
  playerId: number;
  lastName: NameType;
  firstName: NameType;
  playerSlug: string;
};

type SeasonAwardsType = {
  seasonId: number;
  gamesPlayed: number;
  gameTypeId: number;
  goals: number;
  assists: number;
  points: number;
  plusMinus: number;
  hits: number;
  blockedShots: number;
  pim: number;
  // Add other properties as needed
};

export type AwardType = {
  trophy: NameType;
  seasons: SeasonAwardsType[];
};

export type SeasonStatsTotalType = {
  [key: string]: number | string | NameType | undefined;
  season: number;
  gameTypeId: number;
  leagueAbbrev: string;
  teamName: NameType;
  sequence: number;
  gamesPlayed: number;
  goals?: number;
  assists?: number;
  points: number;
  plusMinus?: number;
  powerPlayGoals?: number;
  gameWinningGoals?: number;
  shots?: number;
  shootingPctg?: number;
  shorthandedGoals?: number;
  pim: number;
};

export type GameInfoType = {
  gameId: number;
  gameTypeId: number;
  teamAbbrev: string;
  homeRoadFlag: string;
  gameDate: string;
  goals: number;
  assists: number;
  points: number;
  plusMinus: number;
  powerPlayGoals: number;
  shots: number;
  shifts: number;
  shorthandedGoals: number;
  pim: number;
  opponentAbbrev: string;
  toi: string;
};

export type BasicPlayerStatsType = {
  [key: string]: number | string | undefined;
  gamesPlayed: number;
  goals: number;
  assists: number;
  points: number;
  plusMinus: number;
  pim: number;
  gameWinningGoals: number;
  otGoals: number;
  shots: number;
  shootingPctg: number;
  powerPlayGoals: number;
  powerPlayPoints: number;
  shorthandedGoals: number;
  shorthandedPoints: number;
  faceoffWinningPctg?: number;
  avgToi?: string;
  wins?: number;
  losses?: number;
  ties?: number;
  otLosses?: number;
  shutouts?: number;
  goalsAgainstAverage?: number;
  savePctg: number;
};

export type NameType = {
  default: string;
  fr?: string;
  cs?: string;
  fi?: string;
  sk?: string;
};

export type PlayerBioFormattedType = {
  playerId: number;
  isActive: boolean;
  currentTeamId: number;
  currentTeamAbbrev: string;
  fullTeamName: NameType;
  firstName: {
    default: string;
  };
  lastName: {
    default: string;
  };
  teamLogo: string;
  sweaterNumber: number;
  position: string;
  headshot: string;
  heroImage: string;
  heightInInches: number;
  heightInCentimeters: number;
  weightInPounds: number;
  weightInKilograms: number;
  birthDate: string;
  birthCity: {
    default: string;
  };
  birthStateProvince: {
    default: string;
    fr: string;
    sk: string;
    sv: string;
  };
  birthCountry: string;
  shootsCatches: string;
  draftDetails: {
    year: number;
    teamAbbrev: string;
    round: number;
    pickInRound: number;
    overallPick: number;
  };
  playerSlug: string;
  inTop100AllTime: number;
  inHHOF: number;
  featuredStats: {
    season: number;
    regularSeason: {
      subSeason: BasicPlayerStatsType;
      career: BasicPlayerStatsType;
    };
  };
  careerTotals: {
    regularSeason: BasicPlayerStatsType;
    playoffs: BasicPlayerStatsType;
  };
  shopLink: string;
  twitterLink: string;
  watchLink: string;
  last5Games: GameInfoType[];
  seasonTotals: SeasonStatsTotalType[];
  awards: AwardType[];
  currentTeamRoster: CurrentTeamRosterPlayerInfoType[];
};

export interface PlayerStatsFormattedType {
  [key: string]: object | string | number;
  featuredStats: {
    season: number;
    regularSeason: {
      subSeason: BasicPlayerStatsType;
      career: BasicPlayerStatsType;
    };
  };
  careerTotals: {
    regularSeason: BasicPlayerStatsType;
    playoffs: BasicPlayerStatsType;
  };
  seasonTotals: SeasonStatsTotalType[];
  last5Games: GameInfoType[];
}

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

export interface formattedTeamStatType {
  teamName: string;
  data: {
    x: string;
    y: number;
  }[];
}

export type TeamStatistic = {
  x: string;
  y: number;
};

export type FormattedTeamData = {
  _id: string;
  teamName: string;
  data: TeamStatistic[];
};

export type FormattedTeamStats = {
  [index: number]: FormattedTeamData[];
};