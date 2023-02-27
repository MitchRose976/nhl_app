import { ObjectId, Document, WithId } from "mongodb";

interface TeamClass extends WithId<Document> {
  teamId: number;
  teamName: string;
  teamAbbreviation: string;
  teamDivision: object;
  teamConference: object;
  teamVenue: object;
  firstYearOfPlay: string;
  teamLogoUrl: string;
  id?: ObjectId;
}

export default TeamClass;
