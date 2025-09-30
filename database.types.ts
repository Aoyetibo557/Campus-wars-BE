[?25l[?2004h
                                                                                                   
  >  1. qwdvmzyutqayvblxsblj [name: afrostyleszDB, org: sgkbziudvawktwumlqoa, region: us-east-1]   
    2. zijhrevsltprcfyayjku [name: stonks-backend-db, org: sgkbziudvawktwumlqoa, region: us-east-1]
    3. rkuwdxvecpwkziyululj [name: AfrostylesDB, org: sgkbziudvawktwumlqoa, region: us-west-1]     
    4. dzdwpnmzstktddkxedlw [name: campus_wars, org: sgkbziudvawktwumlqoa, region: us-east-1]      
    5. lrxtujynnwsjzpygsybj [name: wanderwith-prod, org: ljkrzxrzpjimwpmkaasa, region: us-east-1]  
                                                                                                   
                                                                                                   
                                                                                                   
                                                                                                   
                                                                                                   
                                                                                                   
                                                                                                   
    ↑/k up • ↓/j down • / filter • q quit • ? more                                                 
                                                                                                   [15A
                                                                                                    
    1. qwdvmzyutqayvblxsblj [name: afrostyleszDB, org: sgkbziudvawktwumlqoa, region: us-east-1]     
  >  2. zijhrevsltprcfyayjku [name: stonks-backend-db, org: sgkbziudvawktwumlqoa, region: us-east-1]
    3. rkuwdxvecpwkziyululj [name: AfrostylesDB, org: sgkbziudvawktwumlqoa, region: us-west-1]      
    4. dzdwpnmzstktddkxedlw [name: campus_wars, org: sgkbziudvawktwumlqoa, region: us-east-1]       
    5. lrxtujynnwsjzpygsybj [name: wanderwith-prod, org: ljkrzxrzpjimwpmkaasa, region: us-east-1]   
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
    ↑/k up • ↓/j down • / filter • q quit • ? more                                                  
                                                                                                    [15A
                                                                                                   
    1. qwdvmzyutqayvblxsblj [name: afrostyleszDB, org: sgkbziudvawktwumlqoa, region: us-east-1]    
    2. zijhrevsltprcfyayjku [name: stonks-backend-db, org: sgkbziudvawktwumlqoa, region: us-east-1]
  >  3. rkuwdxvecpwkziyululj [name: AfrostylesDB, org: sgkbziudvawktwumlqoa, region: us-west-1]    
    4. dzdwpnmzstktddkxedlw [name: campus_wars, org: sgkbziudvawktwumlqoa, region: us-east-1]      
    5. lrxtujynnwsjzpygsybj [name: wanderwith-prod, org: ljkrzxrzpjimwpmkaasa, region: us-east-1]  
                                                                                                   
                                                                                                   
                                                                                                   
                                                                                                   
                                                                                                   
                                                                                                   
                                                                                                   
    ↑/k up • ↓/j down • / filter • q quit • ? more                                                 
                                                                                                   [15A



    3. rkuwdxvecpwkziyululj [name: AfrostylesDB, org: sgkbziudvawktwumlqoa, region: us-west-1]     
  >  4. dzdwpnmzstktddkxedlw [name: campus_wars, org: sgkbziudvawktwumlqoa, region: us-east-1]     









[15A [J[2K[?2004l[?25h[?1002l[?1003l[?1006lexport type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      game_sessions: {
        Row: {
          ended_at: string | null
          game_id: string
          id: string
          score: number | null
          started_at: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          ended_at?: string | null
          game_id: string
          id?: string
          score?: number | null
          started_at?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          ended_at?: string | null
          game_id?: string
          id?: string
          score?: number | null
          started_at?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_sessions_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string | null
          password: string | null
          university_id: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id: string
          name?: string | null
          password?: string | null
          university_id?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string | null
          password?: string | null
          university_id?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
      session_questions: {
        Row: {
          answered: boolean | null
          answered_at: string | null
          external_id: string | null
          id: string
          is_correct: boolean | null
          order: number
          question_text: string
          session_id: string
        }
        Insert: {
          answered?: boolean | null
          answered_at?: string | null
          external_id?: string | null
          id?: string
          is_correct?: boolean | null
          order: number
          question_text: string
          session_id: string
        }
        Update: {
          answered?: boolean | null
          answered_at?: string | null
          external_id?: string | null
          id?: string
          is_correct?: boolean | null
          order?: number
          question_text?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_questions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "game_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      universities: {
        Row: {
          created_at: string | null
          id: string
          location: string | null
          logo_url: string | null
          name: string
          rank: string | null
          short_name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          location?: string | null
          logo_url?: string | null
          name: string
          rank?: string | null
          short_name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          location?: string | null
          logo_url?: string | null
          name?: string
          rank?: string | null
          short_name?: string | null
        }
        Relationships: []
      }
      university_points: {
        Row: {
          game_id: string | null
          id: string
          total_points: number | null
          university_id: string
          updated_at: string | null
        }
        Insert: {
          game_id?: string | null
          id?: string
          total_points?: number | null
          university_id: string
          updated_at?: string | null
        }
        Update: {
          game_id?: string | null
          id?: string
          total_points?: number | null
          university_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "university_points_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "university_points_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
      user_question_history: {
        Row: {
          correct: boolean | null
          game_id: string
          id: string
          question_text: string
          seen_at: string | null
          user_id: string
        }
        Insert: {
          correct?: boolean | null
          game_id: string
          id?: string
          question_text: string
          seen_at?: string | null
          user_id: string
        }
        Update: {
          correct?: boolean | null
          game_id?: string
          id?: string
          question_text?: string
          seen_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_question_history_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
