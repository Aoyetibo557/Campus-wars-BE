import { Router } from "express";
import { refreshTokenController } from "../controllers/auth";

const router = Router();

router.post("/refresh-token", refreshTokenController);

export default router;
