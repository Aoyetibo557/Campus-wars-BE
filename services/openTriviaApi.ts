// src/services/openTriviaApi.ts
import axios from "axios";

export interface TriviaQuestion {
  id: string;
  category: string;
  type: "multiple" | "boolean";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const BASE_URL = "https://opentdb.com/api.php";

// Fetch trivia questions
export const fetchTriviaQuestions = async (
  amount: number = 10,
  category?: number,
  difficulty?: "easy" | "medium" | "hard",
  type?: "multiple" | "boolean"
): Promise<TriviaQuestion[]> => {
  try {
    const params: Record<string, string | number> = { amount };

    if (category) params.category = category;
    if (difficulty) params.difficulty = difficulty;
    if (type) params.type = type;

    const response = await axios.get(BASE_URL, { params });

    if (response.data.response_code !== 0) {
      throw new Error("Failed to fetch trivia questions");
    }

    return response.data.results;
  } catch (error) {
    console.error("Error fetching trivia questions:", error);
    throw error;
  }
};

// Example: normalize a question into your session_questions structure
export const normalizeTriviaQuestion = (q: TriviaQuestion) => {
  return {
    question_text: q.question,
    correct_answer: q.correct_answer,
    options: shuffleArray([q.correct_answer, ...q.incorrect_answers]),
  };
};

// Helper to shuffle options so correct answer isn’t always in same spot
const shuffleArray = <T>(array: T[]): T[] => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};
