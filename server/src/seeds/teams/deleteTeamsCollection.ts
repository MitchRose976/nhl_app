import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(`${process.env.MONGO_URI}`);
const db = client.db(`${process.env.MONGO_DB_NAME}`);
const coll = db.collection(`${process.env.MONGO_TEAMS_COLLECTION}`);

const deleteTeamsCollection = async () => {
  try {
    // await client
    //   .connect()
    //   .then(() => console.log("Connected to MongoDB..."))
    //   .catch((err) => console.log("Error: ", err));

    try {
      coll.deleteMany({});
      console.log("Successfully deleted teams collection");
    } catch (error) {
      console.log("Error deleting teams collection: ", error);
    }
  } catch (error) {
    console.log("Error trying to connect to client in deleteTeams.ts", error);
  } finally {
    setTimeout(() => {
      client.close();
    }, 1500);
    console.log("connection closed");
  }
};

export default deleteTeamsCollection;
