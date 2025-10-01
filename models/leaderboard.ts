import { supabase } from "../config/db";
import type { UniversityPoint, Profile } from "../types/database";

export const getTopLeaderboardData = async (university_id: string) => {
  const { data, error } = await supabase.rpc("get_leaderboards", {
    user_university_id: university_id,
  });

  if (error) {
    throw error;
  }
  return data;
};
