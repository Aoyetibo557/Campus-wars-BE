// we will use dotenv to manage environment variables
import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 4000;
export const SUPABASE_URL = process.env.SUPABASE_URL || "";
export const SUPABASE_KEY = process.env.SUPABASE_KEY || "";
