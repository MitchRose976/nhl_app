import express, { Application, Request, Response } from "express";
import router from "./routes/routes";
import { connectToDatabase } from "./connect";

const server: Application = express();

const port: number = 7000;

// middleware
server.use((req: Request, res: Response, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
server.use("/api/routes", router);

// connect to database
connectToDatabase()
  .then(() => {
    server.use("/nhl-app", router);

    server.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
