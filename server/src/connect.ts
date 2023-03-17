import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: {
  teams?: mongoDB.Collection;
  players?: mongoDB.Collection;
} = {};

// Initialize Connection
export const connectToDatabase = async () => {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    `${process.env.MONGO_URI}`
  );

  await client.connect();

  const db: mongoDB.Db = client.db(`${process.env.MONGO_DB_NAME}`);

  const teamsCollection: mongoDB.Collection = db.collection(
    `${process.env.MONGO_TEAMS_COLLECTION}`
  );

  const playersCollection: mongoDB.Collection = db.collection(
    `${process.env.MONGO_PLAYERS_COLLECTION}`
  );

  collections.teams = teamsCollection;
  collections.players = playersCollection;

  console.log(
    `Successfully connected to database: ${process.env.MONGO_DB_NAME} and collections: ${process.env.MONGO_TEAMS_COLLECTION}, ${process.env.MONGO_PLAYERS_COLLECTION}`
  );
};

export const closeConnection = async () => {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    `${process.env.MONGO_URI}`
  );

  await client.close();

  console.log(
    `Successfully closed connection to database: ${process.env.MONGO_DB_NAME}`
  );
};
