import { Router } from "express";
import {
  createGameController,
  updateGameController,
  deleteGameController,
  getGameByIdController,
  getAllGamesController,
} from "../controllers/game";
import { authenticateJWT } from "../middleware/middleware";

const router = Router();

router.post("/create", authenticateJWT, createGameController);
router.put("/update", authenticateJWT, updateGameController);
router.delete("/delete/:id", authenticateJWT, deleteGameController);
router.get("/get", authenticateJWT, getGameByIdController);
router.get("/all", authenticateJWT, getAllGamesController);

export default router;
