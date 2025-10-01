import { Router } from "express";
import { authenticateJWT } from "../middleware/middleware";
import { topLeaderboardDataController } from "../controllers/leaderboard";

const router = Router();

router.get("/top/:university_id", topLeaderboardDataController);

export default router;
