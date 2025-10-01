// Base types for common fields
export type BaseEntity = {
  id: string;
  created_at: string;
  updated_at?: string;
};

// User-related types
export type User = BaseEntity & {
  email: string;
  password: string;
  username: string;
  avatar_url?: string;
};

export type Game = BaseEntity & {
  name: string;
  slug: string;
  description?: string;
  is_active?: boolean;
  // Relations
  game_sessions?: GameSession[];
};

export type Profile = BaseEntity & {
  id: string;
  username: string;
  university_id: string;
  avatar_url?: string;
  is_active?: boolean;
  deactivated_at?: string;
  reactivated_at?: string;
  // Relations
  user?: User;
  university?: University;
};

// University types
export type University = BaseEntity & {
  name: string;
  short_name?: string;
  logo_url?: string;
  location?: string;
  rank?: number;
  // Relations
  profiles?: Profile[];
  games?: Game[];
  university_points?: UniversityPoint[];
  game_sessions?: GameSession[];
};

export type GameSession = BaseEntity & {
  user_id: string;
  game_id: string;
  university_id: string;
  started_at: string;
  ended_at?: string;
  score: number;
  status: "active" | "completed" | "abandoned";
  // Relations
  user?: User;
  game?: Game;
  university?: University;
  session_questions?: SessionQuestion[];
};

// Question types
export type SessionQuestion = BaseEntity & {
  session_id: string;
  external_id: string;
  question_text: string;
  order: number;
  answered: boolean;
  is_correct?: boolean;
  // Relations
  session?: GameSession;
  user_question_history?: UserQuestionHistory[];
};

export type UserQuestionHistory = BaseEntity & {
  user_id: string;
  question_text: string;
  game_id: string;
  seen_at: string;
  correct: boolean;
  // Relations
  user?: User;
  game?: Game;
};

export type UserQuestionHistory = BaseEntity & {
  user_id: string;
  question_text: string;
  game_id: string;
  seen_at: string;
  correct: boolean;
  // Relations
  user?: User;
  game?: Game;
};

// Points and scoring types
export type UniversityPoint = BaseEntity & {
  university_id: string;
  game_id: string;
  total_points: number;
  updated_at: string;
  // Relations
  university?: University;
  game?: Game;
};

export type UserStats = {
  total_games: number;
  total_score: number;
  avg_score: number;
  best_score: number;
  battles_won?: number;
  university_rank: number;
  current_streak: number;
  best_streak: number;
  favourite_game: string;
  games_by_type: Record<string, number>;
  recent_sessions: GameSession[];
};

export type {
  User,
  Profile,
  UserStats,
  University,
  Game,
  GameSession,
  UserQuestionHistory,
  UniversityPoint,
};
