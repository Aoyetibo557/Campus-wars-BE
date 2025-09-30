"use strict";
// message constants types to be used across the app
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_PRODUCTION = exports.IS_DEVELOPMENT = exports.JWT_SECRET = exports.COOKIE_OPTIONS = exports.ROLES = exports.STATUS_CODES = exports.MESSAGE_TYPES = exports.AUTH_MESSAGES = void 0;
exports.AUTH_MESSAGES = {
    UNAUTHORIZED: "Unauthorized",
    FORBIDDEN: "Forbidden",
    NOT_FOUND: "Not Found",
    INVALID_CREDENTIALS: "Invalid email or password",
    USER_NOT_FOUND: "User not found",
    EMAIL_ALREADY_EXISTS: "Email already exists",
    PASSWORD_RESET_SENT: "Password reset email sent",
    PASSWORD_RESET_SUCCESS: "Password reset successful",
    ACCOUNT_VERIFIED: "Account verified successfully",
    INTERNAL_SERVER_ERROR: "Internal server error",
    MISSING_USERNAME: "Username is required",
};
exports.MESSAGE_TYPES = {
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning",
    INFO: "info",
};
exports.STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};
exports.ROLES = {
    ADMIN: "admin",
    USER: "user",
    GUEST: "guest",
};
exports.COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 week
};
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.IS_DEVELOPMENT = process.env.NODE_ENV === "development";
exports.IS_PRODUCTION = process.env.NODE_ENV === "production";
