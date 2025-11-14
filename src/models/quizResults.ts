export type QuizResult = {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  submittedAt: string;
};

export type QuizResults = Record<string, QuizResult>;
export type QuizResultsMap = QuizResult[];

export type AllQuizResults = Record<string, QuizResult>;
export type AllQuizResultsMap = QuizResult[];
export type AllQuizResultsResponse = { allQuizResults: AllQuizResultsMap };
