import { supabase } from "../config/db";
import type { Profile, Game, GameSession } from "../types/database";

// create new game
export const createGame = async (
  name: string,
  slug: string,
  description: string
) => {
  const { data, error } = await supabase
    .from("games")
    .insert([{ name, slug, description, is_active: true }])
    .select();

  if (error) {
    throw error;
  }

  return data[0];
};

// update game data
export const updateGame = async (updates: Partial<Game>) => {
  const { data, error } = await supabase
    .from("games")
    .update(updates)
    .eq("id", updates.id)
    .select();

  if (error) {
    throw error;
  }

  return data[0] || null;
};

// delete game data
export const deleteGame = async (id: string) => {
  const { data, error } = await supabase.from("games").delete().eq("id", id);
  if (error) {
    throw error;
  }
  return data ? data[0] : null;
};

//get game by id
export const getGameById = async (id: string) => {
  const { data, error } = await supabase
    .from("games")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

//get all games
export const getAllGames = async () => {
  const { data, error } = await supabase.from("games").select("*");

  if (error) {
    throw error;
  }
  return data;
};
