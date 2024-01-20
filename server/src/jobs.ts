import { ToadScheduler, SimpleIntervalJob, AsyncTask } from "toad-scheduler";
import {
  // deletePlayersCollection,
  seedPlayersCollection,
  seedTeamsCollection,
} from "./seeds/index";

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

// const deletePlayersTask = new AsyncTask("Delete players collection", async () => {
//   try {
//     console.log("running deletePlayersJob...");
//     return await deletePlayersCollection();
//   } catch (err) {
//     return console.log("Error in deletePlayersJob: ", err);
//   }
// });


// Jobs
const seedPlayersJob = new SimpleIntervalJob(
  { hours: 1, runImmediately: false },
  seedPlayersTask,
  { id: "id_1" }
);

const seedTeamsJob = new SimpleIntervalJob(
  { minutes: 1, runImmediately: false },
  seedTeamsTask,
  { id: "id_2" }
);

// const deletePlayersJob = new SimpleIntervalJob(
//   { minutes: 1, runImmediately: false },
//   deletePlayersTask,
//   { id: "id_3" }
// );

scheduler.addSimpleIntervalJob(seedPlayersJob);
// scheduler.addSimpleIntervalJob(deletePlayersJob);
scheduler.addSimpleIntervalJob(seedTeamsJob);
