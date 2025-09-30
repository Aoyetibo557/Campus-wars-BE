import { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../app";

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Adapt Express app to Vercel serverless function
  app(req as any, res as any);
}
