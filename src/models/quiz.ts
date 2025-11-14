export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
};

export type Quiz = {
  id: string;
  courseId: string;
  moduleId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  createdAt: string;
  updatedAt: string;
};

export type Quizzes = Record<string, Quiz>;
export type QuizzesMap = Quiz[];

export type SubmitQuizPayload = {
  answers: Record<string, string>;
  quizId: string;
  userId: string;
};
