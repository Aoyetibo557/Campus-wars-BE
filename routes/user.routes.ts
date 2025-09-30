import { Router } from "express";
import { authenticateJWT } from "../middleware/middleware";
import {
  register,
  login,
  fetchAllUsers,
  fetchUserById,
  modifyUser,
  removeUser,
  getCurrentUser,
  uploadAvatar,
  upload,
  checkUsernameAvailability,
} from "../controllers/user";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticateJWT, getCurrentUser);
router.get("/all", authenticateJWT, fetchAllUsers);
router.get("/:id", authenticateJWT, fetchUserById);
router.put("/update/:id", authenticateJWT, modifyUser);
router.delete("/:id", authenticateJWT, removeUser);
router.post("/username-availability", checkUsernameAvailability);

// Avatar routes
router.post(
  "/avatar/:id",
  authenticateJWT,
  upload.single("avatar"), // Multer middleware for single file upload
  uploadAvatar
);

export default router;
