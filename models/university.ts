import { supabase } from "../config/db";
import type { University } from "../types/database";

// Create new university
export const createUniversity = async (
  university: Omit<University, "id" | "created_at">
) => {
  const { data, error } = await supabase
    .from("universities")
    .insert([university])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Get university by ID
export const getUniversityById = async (id: string) => {
  const { data, error } = await supabase
    .from("universities")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

// Get all universities (you’ll need this for dropdowns, lists, etc.)
export const getAllUniversities = async () => {
  const { data, error } = await supabase
    .from("universities")
    .select("*")
    .order("rank", { ascending: true });

  if (error) throw error;
  return data;
};

// Update university
export const updateUniversity = async (
  id: string,
  updates: Partial<Omit<University, "id" | "created_at">>
) => {
  const { data, error } = await supabase
    .from("universities")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Delete university
export const deleteUniversity = async (id: string) => {
  const { data, error } = await supabase
    .from("universities")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};
