import { IS_DEVELOPMENT, STATUS_CODES } from "../utils/const";
import { Request, Response } from "express";
import { validateTriviaGame } from "../services/triviaValidator";

export const endTriviaGame = async (req: Request, res: Response) => {
  try {
    const { userId, universityId, gameId, createdAt, answers } = req.body;

    if (!userId || !universityId || !gameId || !answers) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "Missing required fields", success: false });
    }

    const result = await validateTriviaGame(
      userId,
      universityId,
      gameId,
      createdAt,
      answers
    );

    res.status(STATUS_CODES.OK).json({
      message: "Game session completed",
      score: result.score,
      session: result.session,
      success: true,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Failed to process game" });
  }
};
