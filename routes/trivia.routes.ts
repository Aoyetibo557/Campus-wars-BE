import { Router } from "express";
import { endTriviaGame } from "../controllers/trivia";

const router = Router();

router.post("/end", endTriviaGame);

export default router;
