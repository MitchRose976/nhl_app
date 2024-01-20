import { ToadScheduler, SimpleIntervalJob, AsyncTask } from "toad-scheduler";
import {
  // deleteTeamsCollection,
  // deletePlayersCollection,
  seedPlayersCollection,
  seedTeamsCollection,
} from "./seeds/index";

const scheduler = new ToadScheduler();

//////////////////////////////////////////////////
////////////////////// TASKS /////////////////////
/////////////////////////////////////////////////
const seedTeamsTask = new AsyncTask("Seed Teams", async () => {
  try {
    console.log("running seedTeamsJob...");
    return await seedTeamsCollection();
  } catch (err) {
    return console.log("Error in seedTeamsTask: ", err);
  }
});

// const deleteTeamsTask = new AsyncTask("Delete Teams Collection", async () => {
//   try {
//     console.log("running deleteTeamsJob...");
//     return await deleteTeamsCollection();
//   } catch (err) {
//     return console.log("Error in deleteTeamsTask: ", err);
//   }
// });

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


//////////////////////////////////////////////////
////////////////////// JOBS /////////////////////
/////////////////////////////////////////////////
const seedPlayersJob = new SimpleIntervalJob(
  { hours: 1, runImmediately: false },
  seedPlayersTask,
  { id: "id_1" }
);

// const deletePlayersJob = new SimpleIntervalJob(
//   { minutes: 1, runImmediately: false },
//   deletePlayersTask,
//   { id: "id_3" }
// );

const seedTeamsJob = new SimpleIntervalJob(
  { minutes: 150, runImmediately: false },
  seedTeamsTask,
  { id: "id_2" }
);

// const deleteTeamsJob = new SimpleIntervalJob(
//   { minutes: 1, runImmediately: false },
//   deleteTeamsTask,
//   { id: "id_2" }
// );

scheduler.addSimpleIntervalJob(seedPlayersJob);
// scheduler.addSimpleIntervalJob(deletePlayersJob);
scheduler.addSimpleIntervalJob(seedTeamsJob);
// scheduler.addSimpleIntervalJob(deleteTeamsJob);
