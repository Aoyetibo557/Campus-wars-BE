import {
  IS_DEVELOPMENT,
  MESSAGE_TYPES,
  STATUS_CODES,
  AUTH_MESSAGES,
} from "../utils/const";
import { Request, Response } from "express";
import type { Profile, Game, GameSession } from "../types/database";
import {
  createGame,
  updateGame,
  deleteGame,
  getGameById,
  getAllGames,
} from "../models/game";

// Create a new game
export const createGameController = async (req: Request, res: Response) => {
  try {
    const { name, slug, description } = req.body;
    if (!name.trim() || !slug.trim()) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        message: "Name and Slug are required fields",
        success: false,
      });
    }

    const game = await createGame(name, slug, description);

    return res.status(STATUS_CODES.CREATED).json({
      message: "New game created successfully",
      success: true,
      data: game,
    });
  } catch (error: any) {
    if (IS_DEVELOPMENT) console.error("Error occured creating new game");
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Failed to create new game",
      success: false,
    });
  }
};

// Update a game by it's id
export const updateGameController = async (req: Request, res: Response) => {
  const updates = req.body;

  try {
    const updatedGame = await updateGame(updates);

    return res.status(STATUS_CODES.OK).json({
      message: "Game Updated!",
      success: true,
      data: updatedGame,
    });
  } catch (error: any) {
    if (IS_DEVELOPMENT) console.error("Error occurred updating game");
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Failed to update game data",
      success: false,
    });
  }
};

// Delete game by id
export const deleteGameController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!id || !id?.trim()) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        message: "Id is required to delete a game!",
        success: false,
      });
    }

    const isDeleted = await deleteGame(id);

    return res.status(STATUS_CODES.OK).json({
      message: "Game deleted Successfully",
      success: true,
    });
  } catch (error: any) {
    if (IS_DEVELOPMENT) console.error("Error occurred deleting game");
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Failed to update game data",
      success: false,
    });
  }
};

// Get game by ID
export const getGameByIdController = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    if (!id.trim()) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        message: "Id is required to delete a game!",
        success: false,
      });
    }

    const foundGame = await getGameById(id);

    return res.status(STATUS_CODES.OK).json({
      message: "Game found!",
      success: true,
      data: foundGame,
    });
  } catch (error: any) {
    if (IS_DEVELOPMENT) console.error("Error occurred updating game");
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Failed to update game data",
      success: false,
    });
  }
};

// Get game by ID
export const getAllGamesController = async (req: Request, res: Response) => {
  try {
    const allGames = await getAllGames();

    return res.status(STATUS_CODES.OK).json({
      message: "Game found!",
      success: true,
      data: allGames,
    });
  } catch (error: any) {
    if (IS_DEVELOPMENT) console.error("Error occurred fetching all games");
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Failed to get all games data",
      success: false,
    });
  }
};
