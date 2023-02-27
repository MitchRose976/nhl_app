import { ObjectId, Document, WithId } from "mongodb";

interface PlayerClass extends WithId<Document> {
    playerInfo: object,
    playerStats: object,
    playerHeadshot: object,
    id?: ObjectId
}

export default PlayerClass;
