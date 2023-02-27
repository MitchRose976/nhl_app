import express, { Request, Response } from "express";
import { collections } from "../../connect";
import * as dotenv from "dotenv";
import { TeamClass } from "../../models";

dotenv.config();

const router = express.Router();
router.use(express.json());

// GET
router.get("/", async (req: Request, res: Response) => {
  try {
    if (collections.teams) {
      const teams = (await collections.teams.find({}).toArray()) as TeamClass[];
      res.status(200).send(teams);
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// GET all players
router.get("/players", (req: Request, res: Response) => {
  res.json({ message: "GET all players" });
});

// GET all teams
router.get("/teams", (req: Request, res: Response) => {
  res.json({ message: "GET all teams" });
});

// POST players
router.post("/teams", (req: Request, res: Response) => {
  res.json({ message: "GET all teams" });
});

export default router;
