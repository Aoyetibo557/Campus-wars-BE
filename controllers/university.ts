import { IS_DEVELOPMENT, STATUS_CODES } from "../utils/const";

import { Request, Response } from "express";
import {
  createUniversity,
  getUniversityById,
  getAllUniversities,
  updateUniversity,
  deleteUniversity,
} from "../models/university";

// Create a new university
export const createUniversityController = async (
  req: Request,
  res: Response
) => {
  try {
    const university = await createUniversity(req.body);
    return res.status(STATUS_CODES.CREATED).json(university);
  } catch (error: any) {
    if (IS_DEVELOPMENT) console.error("❌ Error creating university:", error);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "Failed to create university" });
  }
};

// Get all universities
export const getAllUniversitiesController = async (
  req: Request,
  res: Response
) => {
  try {
    const universities = await getAllUniversities();
    return res.status(STATUS_CODES.OK).json(universities);
  } catch (error: any) {
    if (IS_DEVELOPMENT) console.error("❌ Error fetching universities:", error);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "Failed to fetch universities" });
  }
};

// Get university by ID
export const getUniversityByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "University ID is required" });
    }

    const university = await getUniversityById(id);

    if (!university) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "University not found" });
    }

    return res.status(STATUS_CODES.OK).json(university);
  } catch (error: any) {
    if (IS_DEVELOPMENT) console.error("❌ Error fetching university:", error);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "Failed to fetch university" });
  }
};

// Update university
export const updateUniversityController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "University ID is required" });
    }

    const updates = req.body;
    const updated = await updateUniversity(id, updates);

    if (!updated) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "University not found" });
    }

    return res.status(STATUS_CODES.OK).json(updated);
  } catch (error: any) {
    if (IS_DEVELOPMENT) console.error("❌ Error updating university:", error);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "Failed to update university" });
  }
};

// Delete university
export const deleteUniversityController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "University ID is required" });
    }

    const deleted = await deleteUniversity(id);

    if (!deleted) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "University not found" });
    }

    return res
      .status(STATUS_CODES.OK)
      .json({ message: "University deleted successfully" });
  } catch (error: any) {
    if (IS_DEVELOPMENT) console.error("❌ Error deleting university:", error);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "Failed to delete university" });
  }
};
