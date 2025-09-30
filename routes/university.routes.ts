import { Router } from "express";
import {
  createUniversityController,
  getAllUniversitiesController,
  getUniversityByIdController,
  updateUniversityController,
  deleteUniversityController,
} from "../controllers/university";
import { authenticateJWT } from "../middleware/middleware";

const router = Router();

router.post("/create", authenticateJWT, createUniversityController);
router.get("/all", getAllUniversitiesController);
router.get("/:id", getUniversityByIdController);
router.put("/:id", authenticateJWT, updateUniversityController);
router.delete("/:id", authenticateJWT, deleteUniversityController);

export default router;
