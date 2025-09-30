import { supabase } from "../config/db";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { STATUS_CODES, AUTH_MESSAGES } from "../utils/const";
import { IGetUserAuthInfoRequest } from "../types/definitionfile";
import { getUserById } from "../models/user";

// authenticate JWT token from cookies or headers
export const authenticateJWT = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ message: AUTH_MESSAGES.UNAUTHORIZED });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data, error } = await supabase.auth.getUser(token);

    // Get user from database (optional - for fresh user data)
    if (data?.user) {
      const user = await getUserById(data?.user.id);

      if (!user) {
        return res.status(STATUS_CODES.UNAUTHORIZED).json({
          success: false,
          message: "Invalid token. User not found.",
        });
      }

      // Check if user is active (if you have is_active field)
      if (user.is_active === false) {
        return res.status(403).json({
          success: false,
          message: "Account is deactivated. Please contact support.",
        });
      }

      // Add user to request object
      req.user = user;
    } else {
      if (error || !data?.user) {
        return res
          .status(STATUS_CODES.UNAUTHORIZED)
          .json({ message: AUTH_MESSAGES.UNAUTHORIZED });
      }
    }

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.json({ message: "Authentication failed", status: 401 });
  }
};

// Simple JWT verification without Supabase (if you're using your own JWT)
// export const authenticateJWTSimple = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     let token = req.cookies?.token;

//     if (!token) {
//       const authHeader = req.headers.authorization;
//       if (authHeader && authHeader.startsWith("Bearer ")) {
//         token = authHeader.substring(7);
//       }
//     }

//     if (!token) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     // Verify JWT token (you'll need JWT_SECRET in your env)
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };
