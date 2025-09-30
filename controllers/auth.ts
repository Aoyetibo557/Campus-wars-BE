import {
  IS_DEVELOPMENT,
  MESSAGE_TYPES,
  STATUS_CODES,
  AUTH_MESSAGES,
} from "../utils/const";
import { Request, Response } from "express";
import { refreshToken } from "../models/auth";

export const refreshTokenController = async (req: Request, res: Response) => {
  try {
    // Get refresh token from cookies or Authorization header
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        message: "Refresh token not provided",
        success: false,
      });
    }

    const session = await refreshToken(refresh_token);

    // // Set new tokens in httpOnly cookies (recommended for security)
    // res.cookie("access_token", session.access_token, {
    //   httpOnly: true,
    //   secure: !IS_DEVELOPMENT, // Use secure cookies in production
    //   sameSite: "strict",
    //   maxAge: 3600000, // 1 hour
    // });

    // res.cookie("refresh_token", session.refresh_token, {
    //   httpOnly: true,
    //   secure: !IS_DEVELOPMENT,
    //   sameSite: "strict",
    //   maxAge: 604800000, // 7 days
    // });

    console.log("Token refresh successful");

    return res.status(STATUS_CODES.OK).json({
      message: "Token refresh successful",
      success: true,
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_at: session.expires_at,
      expires_in: session.expires_in,
    });
  } catch (error) {
    if (IS_DEVELOPMENT) {
      console.error("Error refreshing token:", error);
    }

    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      message:
        error instanceof Error ? error.message : "Failed to refresh token",
      success: false,
    });
  }
};
