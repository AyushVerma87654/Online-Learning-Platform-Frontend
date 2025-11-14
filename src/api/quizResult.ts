import instance from "./axios";

export const fetchQuizResult = async (data: {
  userId: string;
  quizId: string;
}) =>
  instance
    .get(`/quiz-result/${data.userId}/${data.quizId}`)
    .then((res) => res.data);

export const fetchAllQuizResults = async () =>
  instance.get("/all-quiz-results").then((res) => res.data);
