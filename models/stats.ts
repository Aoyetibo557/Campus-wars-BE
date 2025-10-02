import { supabase } from "../config/db";
import type { Profile, UserStats } from "../types/database";

export const getTotalPoints = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("total_points")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data?.total_points || 0;
};

export const getGamesPlayed = async (userId: string) => {
  const { data, error } = await supabase
    .from("game_sessions")
    .select("id", { count: "exact" })
    .eq("user_id", userId);

  if (error) throw error;
  return data?.length || 0;
};

export const getFavoriteGame = async (userId: string) => {
  const { data, error } = await supabase
    .from("game_sessions")
    .select("game_id")
    .eq("user_id", userId);

  if (error) throw error;

  if (!data || data.length === 0) return null;

  const gameCounts: Record<string, number> = {};
  data.forEach((session) => {
    gameCounts[session.game_id] = (gameCounts[session.game_id] || 0) + 1;
  });

  if (Object.keys(gameCounts).length === 0) return null;

  const favoriteGameId = Object.keys(gameCounts).reduce((a, b) =>
    (gameCounts[a] ?? 0) > (gameCounts[b] ?? 0) ? a : b
  );

  // fetch game name
  const { data: game, error: gameErr } = await supabase
    .from("games")
    .select("name")
    .eq("id", favoriteGameId)
    .single();

  if (gameErr) throw gameErr;
  return game?.name || null;
};

export const getCorrectAnswers = async (userId: string) => {
  const { data, error } = await supabase
    .from("session_questions")
    .select("is_correct, session_id")
    .eq("is_correct", true);

  if (error) throw error;

  // join to game_sessions to filter only this user
  const { data: sessions, error: sessionErr } = await supabase
    .from("game_sessions")
    .select("id")
    .eq("user_id", userId);

  if (sessionErr) throw sessionErr;

  const userSessionIds = sessions.map((s) => s.id);
  return data.filter((q) => userSessionIds.includes(q.session_id)).length;
};

export async function getUserUniversity(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("university_id")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data?.university_id || null;
}

export async function isCampusChampion(userId: string) {
  // Step 1: get user's university
  const universityId = await getUserUniversity(userId);
  if (!universityId) return false;

  // Step 2: get leaderboard (rank universities by total points)
  const { data, error } = await supabase
    .from("university_points")
    .select("university_id, total_points");

  if (error) throw error;
  if (!data || data.length === 0) return false;

  // Aggregate total points per university
  const leaderboard: Record<string, number> = {};
  data.forEach((row) => {
    leaderboard[row.university_id] =
      (leaderboard[row.university_id] || 0) + row.total_points;
  });

  // Rank by points
  const sorted = Object.entries(leaderboard).sort((a, b) => b[1] - a[1]);
  const top10 = sorted.slice(0, 10).map(([id]) => id);

  return top10.includes(universityId);
}
