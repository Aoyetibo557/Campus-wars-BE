import { supabase } from "../config/db";
import type { Profile } from "../types/database";
import bcrypt from "bcryptjs";
import { signUp } from "./auth";

// create a new user (profiles table)
export const createUser = async (email: string, password: string) => {
  const genSalt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, genSalt);

  // sign up user in supabase auth
  const { user: authUser, session } = await signUp(email, password);

  if (!authUser) {
    throw new Error("Failed to create user in Supabase Auth");
  }

  const { data, error } = await supabase
    .from("profiles")
    .insert([{ id: authUser.id, email, password: hashedPassword }])
    .select();

  if (error) {
    throw error;
  }

  return { user: data[0], session };
};

// get user by id with university data
export const getUserById = async (id: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
      *,
      university:universities(*)
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// get all users
export const getAllUsers = async () => {
  const { data, error } = await supabase.from("profiles").select("*");
  if (error) {
    throw error;
  }
  return data;
};

// get user by email
export const getUserByEmail = async (email: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email);

  if (error) {
    throw error;
  }

  return data.length > 0 ? (data[0] as Profile) : null;
};

// update user
export const updateUser = async (id: string, updates: Partial<Profile>) => {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", id)
    .select(
      `
      *,
      university:universities(*)
    `
    )
    .single();

  if (error) {
    throw error;
  }

  return data || null;
};

// delete user
export const deleteUser = async (id: string) => {
  const { data, error } = await supabase.from("profiles").delete().eq("id", id);
  if (error) {
    throw error;
  }
  return data ? data[0] : null;
};

//update user password
export const updateUserPassword = async (id: string, newPassword: string) => {
  const genSalt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, genSalt);

  const { data, error } = await supabase
    .from("profiles")
    .update({ password: hashedPassword })
    .eq("id", id)
    .select();

  if (error) {
    throw error;
  }

  return data[0];
};

// check if username is available
export const isUsernameAvailable = async (username: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 is "not found" error, which means username is available
    throw error;
  }

  return !data; // returns true if username is available (no data found)
};

// upload/update user avatar
export const uploadUserAvatar = async (
  id: string,
  file: Buffer | Uint8Array | File,
  fileName: string,
  contentType: string
) => {
  try {
    // Upload file to Supabase Storage
    const filePath = `avatars/${id}/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("user-avatars") // Make sure this bucket exists in your Supabase storage
      .upload(filePath, file, {
        contentType,
        // upsert: true, // Replace if file already exists
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get public URL for the uploaded file
    const {
      data: { publicUrl },
    } = supabase.storage.from("user-avatars").getPublicUrl(filePath);

    // Update user's avatar_url in the database
    const { data, error } = await supabase
      .from("profiles")
      .update({
        avatar_url: publicUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select();

    if (error) {
      throw error;
    }

    return {
      user: data[0],
      avatar_url: publicUrl,
    };
  } catch (error) {
    console.error("Avatar upload failed:", error);
    throw new Error("Failed to upload avatar");
  }
};

// deactivate user account (soft delete)
export const deactivateUser = async (id: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      is_active: false,
      deactivated_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select();

  if (error) {
    throw error;
  }

  // Optionally, also disable the user in Supabase Auth
  try {
    // Note: This requires admin privileges
    const { error: authError } = await supabase.auth.admin.updateUserById(id, {
      user_metadata: { is_active: false },
    });

    if (authError) {
      console.warn("Failed to deactivate user in Supabase Auth:", authError);
    }
  } catch (authError) {
    console.warn("Auth deactivation failed:", authError);
  }

  return data[0];
};

// reactivate user account
export const reactivateUser = async (email: string, password: string) => {
  // First, verify the user credentials
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }

  if (user.is_active) {
    throw new Error("Account is already active");
  }

  // // Verify password
  // const isValidPassword = await bcrypt.compare(password, user?.password);
  // if (!isValidPassword) {
  //   throw new Error("Invalid credentials");
  // }

  // Reactivate the account
  const { data, error } = await supabase
    .from("profiles")
    .update({
      is_active: true,
      deactivated_at: null,
      reactivated_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)
    .select();

  if (error) {
    throw error;
  }

  // Reactivate in Supabase Auth as well
  try {
    const { error: authError } = await supabase.auth.admin.updateUserById(
      user.id,
      { user_metadata: { is_active: true } }
    );

    if (authError) {
      console.warn("Failed to reactivate user in Supabase Auth:", authError);
    }
  } catch (authError) {
    console.warn("Auth reactivation failed:", authError);
  }

  return data[0];
};

export const getUserSessions = async (userId: string) => {
  const { data, error } = await supabase
    .from("game_sessions")
    .select("id, started_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data || [];
};
