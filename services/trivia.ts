import { fetchTriviaQuestions, normalizeTriviaQuestion } from "./openTriviaApi";
import {
  createGameSession,
  saveSessionQuestion,
  updateSessionAnswer,
  finalizeGameSession,
} from "../models/trivia";

export const startTriviaSession = async (
  userId: string,
  gameId: string,
  amount = 5
) => {
  const session = await createGameSession(userId, gameId);
  const questions = await fetchTriviaQuestions(amount);

  for (let i = 0; i < questions.length; i++) {
    await saveSessionQuestion(
      session.id,
      questions[i]?.question ?? "",
      questions[i]?.id ?? "",
      i + 1,
      questions[i]?.correct_answer ?? ""
    );
  }

  return { session, questions };
};

export const submitTriviaAnswer = async (
  questionId: string,
  selectedAnswer: string
) => {
  return await updateSessionAnswer(questionId, selectedAnswer);
};

export const endTriviaSession = async (
  sessionId: string,
  userId: string,
  gameId: string,
  universityId: string
) => {
  return await finalizeGameSession(sessionId, userId, gameId, universityId);
};
