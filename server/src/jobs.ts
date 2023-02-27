import { ToadScheduler, SimpleIntervalJob, AsyncTask } from "toad-scheduler";
import { seedPlayersCollection, seedTeamsCollection } from "./seeds/index";

const scheduler = new ToadScheduler();

// Tasks
const seedTeamsTask = new AsyncTask("Seed Teams", async () => {
  try {
    console.log("running seedTeamsJob...");
    return await seedTeamsCollection();
  } catch (err) {
    return console.log("Error in seedTeamsTask: ", err);
  }
});

const seedPlayersTask = new AsyncTask("Seed Players", async () => {
  try {
    console.log("running seedPlayersJob...");
    return await seedPlayersCollection();
  } catch (err) {
    return console.log("Error in seedPlayersTask: ", err);
  }
});

const seedPlayersJob = new SimpleIntervalJob(
  { hours: 6, runImmediately: false },
  seedPlayersTask,
  { id: "id_1" }
);

const seedTeamsJob = new SimpleIntervalJob(
  { hours: 12, runImmediately: false },
  seedTeamsTask,
  { id: "id_2" }
);

scheduler.addSimpleIntervalJob(seedPlayersJob);
scheduler.addSimpleIntervalJob(seedTeamsJob);
