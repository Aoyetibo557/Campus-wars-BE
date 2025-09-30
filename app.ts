import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import multer from "multer";

// import routes
import health_routes from "./routes/health_routes";
import user_routes from "./routes/user.routes";
import university_routes from "./routes/university.routes";
import game_routes from "./routes/game.routes";
import trivia_routes from "./routes/trivia.routes";
import auth_routes from "./routes/auth.routes";

const app = express();

app.use(morgan("combined")); //to log in the console as i develeop the requests that comes in
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());
app.use("/api/auth", auth_routes);
app.use("/api", health_routes);
app.use("/api/users", user_routes);
app.use("/api/university", university_routes);
app.use("/api/games", game_routes);
app.use("/api/trivia", trivia_routes);

// Error handling middleware for multer
app.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "File too large. Maximum size is 5MB.",
        });
      }

      if (error.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
          success: false,
          message: 'Unexpected field name. Use "avatar" as the field name.',
        });
      }
    }

    if (error.message === "Only image files are allowed!") {
      return res.status(400).json({
        success: false,
        message: "Only image files are allowed.",
      });
    }

    next(error);
  }
);

export default app;
