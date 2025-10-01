import {
  IS_DEVELOPMENT,
  MESSAGE_TYPES,
  STATUS_CODES,
  AUTH_MESSAGES,
} from "../utils/const";
import { Request, Response } from "express";
import { getTopLeaderboardData } from "../models/leaderboard";

export const topLeaderboardDataController = async (
  req: Request,
  res: Response
) => {
  const { university_id } = req.params ?? {};
  try {
    if (!university_id) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        message: "Univesity Id required",
        success: false,
      });
    }

    const leaderboardData = await getTopLeaderboardData(university_id);
    return res.status(STATUS_CODES.OK).json({
      message: "Leaderboard data retrieved successfully",
      success: true,
      ...leaderboardData,
    });
  } catch (error) {
    if (IS_DEVELOPMENT) {
      console.error("Error getting leaderboard data:", error);
    }
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: AUTH_MESSAGES.INTERNAL_SERVER_ERROR, success: false });
  }
};
