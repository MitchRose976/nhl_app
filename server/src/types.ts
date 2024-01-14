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

export type PlayerRawType = {
  id: number;
  headshot: string;
  firstName: {
    default: string;
    cs?: string;
    fi?: string;
    sk?: string;
    sv?: string;
  };
  lastName: {
    default: string;
    cs?: string;
    fi?: string;
    sk?: string;
  };
  sweaterNumber: number;
  positionCode: string;
  shootsCatches: string;
  heightInInches: number;
  weightInPounds: number;
  heightInCentimeters: number;
  weightInKilograms: number;
  birthDate: string;
  birthCity: {
    default: string;
    cs?: string;
    fi?: string;
    sk?: string;
    sv?: string;
  };
  birthCountry: string;
  birthStateProvince?: {
    default: string;
    fr?: string;
    sk?: string;
  };
};

export type TeamRosterType = {
  [x: string]: any;
  forwards: PlayerRawType[];
  defensemen: PlayerRawType[];
  goalies: PlayerRawType[];
};

export type RosterType = {
  [key: string]: TeamRosterType;
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

export type CurrentTeamRosterPlayerInfoType = {
  playerId: number;
  lastName: NameType;
  firstName: NameType;
  playerSlug: string;
}

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
}

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

  [key: string]:
    | number
    | string
    | {
        default: string;
        fr?: string;
      }
    | number[];
};

export type TeamStandingsObject = {
  wildCardIndicator: boolean;
  standings: TeamStandingsDataObject[];
};

export type StandingsFormattedType = {
  Eastern: {
    Atlantic: TeamStandingsDataObject[];
    Metropolitan: TeamStandingsDataObject[];
  };
  Western: {
    Pacific: TeamStandingsDataObject[];
    Central: TeamStandingsDataObject[];
  };

  [conference: string]: {
    [division: string]: TeamStandingsDataObject[];
  };
};
