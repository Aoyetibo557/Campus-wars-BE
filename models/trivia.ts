import { supabase } from "../config/db";
import type { GameSession } from "../types/database";

export const createGameSession = async (userId: string, gameId: string) => {
  const { data, error } = await supabase
    .from("game_sessions")
    .insert([
      {
        user_id: userId,
        game_id: gameId,
        started_at: new Date(),
        status: "active",
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const saveSessionQuestion = async (
  sessionId: string,
  questionText: string,
  externalId: string,
  order: number,
  correctAnswer: string
) => {
  const { data, error } = await supabase
    .from("session_questions")
    .insert([
      {
        session_id: sessionId,
        question_text: questionText,
        external_id: externalId,
        order,
        correct_answer: correctAnswer,
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const updateSessionAnswer = async (
  questionId: string,
  selectedAnswer: string
) => {
  // fetch correct answer
  const { data: question, error: fetchError } = await supabase
    .from("session_questions")
    .select("correct_answer")
    .eq("id", questionId)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  const isCorrect = question.correct_answer === selectedAnswer;

  // update with user’s answer
  const { data, error } = await supabase
    .from("session_questions")
    .update({
      answered: true,
      is_correct: isCorrect,
      answered_at: new Date(),
      selected_answer: selectedAnswer,
    })
    .eq("id", questionId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return { ...data, isCorrect };
};

export const finalizeGameSession = async (
  sessionId: string,
  userId: string,
  gameId: string,
  universityId: string
) => {
  // count correct answers
  const { data: answers, error: answersError } = await supabase
    .from("session_questions")
    .select("is_correct")
    .eq("session_id", sessionId);

  if (answersError) throw new Error(answersError.message);

  const score = answers.filter((a) => a.is_correct).length;

  // update session score
  const { error: updateError } = await supabase
    .from("game_sessions")
    .update({ score, ended_at: new Date(), status: "completed" })
    .eq("id", sessionId);

  if (updateError) throw new Error(updateError.message);

  // increment university points
  const { data: uniPoints, error: fetchPointsError } = await supabase
    .from("university_points")
    .select("id, total_points")
    .eq("university_id", universityId)
    .eq("game_id", gameId)
    .maybeSingle();

  if (fetchPointsError) throw new Error(fetchPointsError.message);

  if (uniPoints) {
    await supabase
      .from("university_points")
      .update({
        total_points: uniPoints.total_points + score,
        updated_at: new Date(),
      })
      .eq("id", uniPoints.id);
  } else {
    await supabase
      .from("university_points")
      .insert([
        { university_id: universityId, game_id: gameId, total_points: score },
      ]);
  }

  return { sessionId, score };
};
