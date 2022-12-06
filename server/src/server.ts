import express, { Application, Request, Response } from "express";
import { appendFile } from "fs";
import * as dotenv from 'dotenv';
import mongoose from "mongoose";
import routes from "./routes/routes";
import { seedTeams } from "./seeds/seedTeams";
import { deleteTeamsCollection } from "./seeds/deleteTeams";
// import formatYearMonthDay from '../utils/formatYearMonthDay.ts';

const server: Application = express();
const port: number = 7000;
dotenv.config();

// middleware
server.use((req: Request, res: Response, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
server.use("/api/nhl-app", routes);

// connect to db
mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => {
    server.listen(port, () => {
      console.log(`Connected to db successfully and listenting on: http://localhost:${port}`);
    });
    //seedTeams().catch((err) => console.log('Error: ', err));
    //deleteTeamsCollection().catch(err => console.log('Error: ', err));
  })
  .catch((error) => {
    console.log(error);
  });
