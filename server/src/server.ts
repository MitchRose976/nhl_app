import express, { Application, Request, Response } from "express";
import routes from "./routes/routes";
import connectToDatabase from "./connect";

const server: Application = express();

// middleware
server.use((req: Request, res: Response, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
server.use("/api/routes", routes);

// connect to database
connectToDatabase();
