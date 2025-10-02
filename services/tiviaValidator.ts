import { supabase } from "../config/db";

export interface SubmittedAnswer {
  external_id: string;
  question: string;
  correct_answer: string;
  user_answer: string;
  difficulty: string;
  is_correct: boolean;
  selected_answer: string;
  category: string;
}

export const validateTriviaGame = async (
  userId: string,
  universityId: string,
  gameId: string,
  createdAt: string,
  answers: SubmittedAnswer[]
) => {
  let score = 0;

  // Re-check answers and tally score
  answers.forEach((a) => {
    if (a.user_answer === a.correct_answer) {
      score += 1;
    }
  });

  // Save game session
  const { data: session, error: sessionError } = await supabase
    .from("game_sessions")
    .insert({
      user_id: userId,
      game_id: gameId,
      score,
      status: "completed",
      ended_at: new Date(),
      created_at: createdAt,
    })
    .select()
    .single();

  if (sessionError) throw sessionError;

  // Save each question in session_questions
  const sessionQuestions = answers.map((a, index) => ({
    session_id: session.id,
    external_id: a.external_id || `trivia-${new Date()}-${index}`,
    question_text: a.question,
    order: index + 1,
    correct_answer: a.correct_answer,
    is_correct: a.is_correct,
    selected_answer: a.user_answer,
  }));

  const { error: sqError } = await supabase
    .from("session_questions")
    .insert(sessionQuestions);

  if (sqError) throw sqError;

  // update session score
  const { error: updateError } = await supabase
    .from("game_sessions")
    .update({ score, ended_at: new Date(), status: "completed" })
    .eq("id", session.id);

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

  return { session, score };
};
