import { Request, Response } from "express";
import {
  IS_DEVELOPMENT,
  MESSAGE_TYPES,
  STATUS_CODES,
  AUTH_MESSAGES,
} from "../utils/const";
import {
  getTotalPoints,
  getGamesPlayed,
  getFavoriteGame,
  getCorrectAnswers,
  isCampusChampion,
} from "../models/stats";
import { getUserSessions } from "../models/user";
import { calculateStreaks } from "../utils/streaks";

export async function getUserStats(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    if (!userId?.trim()) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        message: "UserId cannot be empty!",
        success: false,
      });
    }

    const [
      totalPoints,
      gamesPlayed,
      favoriteGame,
      correctAnswers,
      campusChampion,
      sessions,
    ] = await Promise.all([
      getTotalPoints(userId || ""),
      getGamesPlayed(userId || ""),
      getFavoriteGame(userId || ""),
      getCorrectAnswers(userId || ""),
      isCampusChampion(userId || ""),
      getUserSessions(userId || ""),
    ]);

    // performance streaks
    const { current, best } = calculateStreaks(sessions);

    return res.status(STATUS_CODES.OK).json({
      battleStatistics: {
        battlesWon: 0, // future TBD
        totalPoints,
        winRate: 0, // future TBD
        gamesPlayed,
      },
      performanceMetrics: {
        currentStreak: current,
        bestStreak: best,
        favoriteGame,
      },
      achievements: {
        firstGame: gamesPlayed >= 1,
        knowledgeSeeker: {
          progress: correctAnswers,
          goal: 100,
        },
        campusChampion,
        battleTested: {
          progress: gamesPlayed,
          goal: 500,
        },
      },
      message: "Stats successfully retrieved!",
      success: true,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
