import express, { Application, Request, Response } from "express";
import router from "./routes/routes";
import { connectToDatabase } from "./connect";
import cors from "cors";
import { CLIENT_URL } from "./constants";

const server: Application = express();

const port: number = 7000;

// middleware
server.use((req: Request, res: Response, next) => {
  res.on("finish", () => {
    console.info(req.path, req.method, res.statusCode);
  });
  next();
});

// cors
server.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "UPDATE"],
  })
);

// routes
server.use("/api/routes", router);

// connect to database
connectToDatabase()
  .then(() => {
    server.use("/nhl-app", router);

    server.listen(port, () => {
      console.info(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
