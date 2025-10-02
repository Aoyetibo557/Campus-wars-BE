import {
  IS_DEVELOPMENT,
  MESSAGE_TYPES,
  STATUS_CODES,
  AUTH_MESSAGES,
} from "../utils/const";
import { Request, Response } from "express";
import type { User } from "@supabase/supabase-js";
import {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUser,
  deleteUser,
  uploadUserAvatar,
  deactivateUser,
  reactivateUser,
  isUsernameAvailable,
} from "../models/user";
import { signIn } from "../models/auth";
import { supabase } from "../config/db";
import { IGetUserAuthInfoRequest } from "../types/definitionfile";
import multer from "multer";
import path from "path";

// Multer configuration for file uploads
const storage = multer.memoryStorage(); // Store in memory for processing

const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  // Check if file is an image
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    return cb(null, false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1, // Only allow 1 file
  },
});

// register a new user
export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    //   trim email and password
    if (!email.trim() || !password.trim()) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: AUTH_MESSAGES.INVALID_CREDENTIALS });
    }
    // check if email already exists
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: AUTH_MESSAGES.EMAIL_ALREADY_EXISTS });
    }

    // create new user
    const { user, session } = await createUser(email, password);

    return res
      .status(STATUS_CODES.CREATED)
      .json({ message: AUTH_MESSAGES.ACCOUNT_VERIFIED, data: user, session });
  } catch (error: any) {
    if (IS_DEVELOPMENT) {
      console.error("Error checking existing user:", error);
    }
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: AUTH_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

// login user
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // trim email and password
    if (!email.trim() || !password.trim()) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: AUTH_MESSAGES.INVALID_CREDENTIALS });
    }

    // create session
    const { session, user } = await signIn(email, password);

    //get user profile data
    const profileData = await getUserById(user?.id);

    return res
      .status(STATUS_CODES.OK)
      .json({ message: "Login Successful", user: profileData, session });
  } catch (error: any) {
    if (IS_DEVELOPMENT) {
      console.error("Error logging in user:", error);
    }
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error || AUTH_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

// get all users
export const fetchAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    return res.status(STATUS_CODES.OK).json({ data: users });
  } catch (error: any) {
    if (IS_DEVELOPMENT) {
      console.error("Error fetching all users:", error);
    }
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: AUTH_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

// get user by id
export const fetchUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id?.trim()) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: AUTH_MESSAGES.USER_NOT_FOUND });
    }
    const user = await getUserById(id);
    if (!user) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: AUTH_MESSAGES.USER_NOT_FOUND });
    }
    return res.status(STATUS_CODES.OK).json({ data: user });
  } catch (error: any) {
    if (IS_DEVELOPMENT) {
      console.error("Error fetching user by id:", error);
    }
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: AUTH_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

// update user
export const modifyUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userUpdates = req.body;
  try {
    if (!id?.trim()) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: AUTH_MESSAGES.USER_NOT_FOUND });
    }
    const updatedUser = await updateUser(id, userUpdates);
    if (!updatedUser) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: AUTH_MESSAGES.USER_NOT_FOUND, success: false });
    }
    return res.status(STATUS_CODES.OK).json({
      message: "User updated successfully",
      success: true,
      data: updatedUser,
    });
  } catch (error: any) {
    if (IS_DEVELOPMENT) {
      console.error("Error updating user:", error);
    }
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: AUTH_MESSAGES.INTERNAL_SERVER_ERROR, success: false });
  }
};

export const checkUsernameAvailability = async (
  req: Request,
  res: Response
) => {
  const { username } = req.body;

  try {
    if (!username || !username.trim()) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: AUTH_MESSAGES.MISSING_USERNAME || "Username is required.",
      });
    }

    const available = await isUsernameAvailable(username.trim());

    return res.status(STATUS_CODES.OK).json({
      available,
      success: true,
      message: available
        ? "Username is available."
        : "Username is already taken.",
    });
  } catch (error: any) {
    if (IS_DEVELOPMENT) {
      console.error("Error checking username availability:", error);
    }

    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: AUTH_MESSAGES.INTERNAL_SERVER_ERROR, success: false });
  }
};

// delete user
export const removeUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id?.trim()) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: AUTH_MESSAGES.USER_NOT_FOUND });
    }
    const deletedUser = await deleteUser(id);
    if (!deletedUser) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: AUTH_MESSAGES.USER_NOT_FOUND });
    }
    return res
      .status(STATUS_CODES.OK)
      .json({ message: "User deleted successfully", data: deletedUser });
  } catch (error: any) {
    if (IS_DEVELOPMENT) {
      console.error("Error deleting user:", error);
    }
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: AUTH_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

export const getCurrentUser = (req: IGetUserAuthInfoRequest, res: Response) => {
  // `req.user` was set by your auth middleware
  const user = req.user ?? {};
  return res.status(200).json({ user });
};

export const uploadAvatar = async (req: Request, res: Response) => {
  const { id } = req.params;
  const file = req.file;
  try {
    if (!id?.trim()) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: AUTH_MESSAGES.USER_NOT_FOUND });
    }

    // Check if file was uploaded
    if (!file) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Generate unique filename
    const fileExtension = path.extname(file.originalname);
    const fileName = `avatar_${id}_${Date.now()}${fileExtension}`;

    // Upload avatar using the model function
    const result = await uploadUserAvatar(
      id,
      file.buffer,
      fileName,
      file.mimetype
    );

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Avatar uploaded successfully",
      data: {
        avatar_url: result.avatar_url,
        // user: {
        //   id: result.user.id,
        //   username: result.user.username,
        //   email: result.user.email,
        //   avatar_url: result.user.avatar_url,
        //   updated_at: result.user.updated_at,
        // },
      },
    });
  } catch (error: any) {
    if (IS_DEVELOPMENT) {
      console.error("Error uploading avatar:", error);
    }

    // Handle multer errors
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
          success: false,
          message: "File too large. Maximum size is 5MB.",
        });
      }
    }

    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: AUTH_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};
