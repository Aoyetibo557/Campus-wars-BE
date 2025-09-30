import { supabase } from "../config/db";

// sign up user
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    throw new Error(error.message);
  }
  return data; // This returns { user, session }
};

// sign in user
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const refreshToken = async (refreshToken: string) => {
  const {
    data: { session },
    error: refreshError,
  } = await supabase.auth.refreshSession({ refresh_token: refreshToken });

  if (refreshError || !session) {
    throw refreshError || new Error("Failed to refresh session");
  }

  return session;
};
