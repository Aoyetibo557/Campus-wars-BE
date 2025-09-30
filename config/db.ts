import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_KEY } from "./index";
import { Database } from "../types/supabase";

//TODO: Update the database gen file when done and use it as type for the supabase client <Database>
export const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!);
