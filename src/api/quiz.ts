import { SubmitQuizPayload } from "../models/quiz";
import instance from "./axios";
import { Quiz } from "../models/quiz";

export const fetchQuizByCourseId = async (courseId: string) =>
  instance.get(`/quiz/${courseId}`).then((res) => res.data);

export const submitQuiz = async (data: SubmitQuizPayload) =>
  instance.post("/quiz/submit", data).then((res) => res.data);

export const addQuiz = async (quiz: Quiz) =>
  instance.post(`/quiz/${quiz.courseId}`, { quiz }).then((res) => res.data);

export const editQuiz = async (quiz: Quiz) =>
  instance.put(`/quiz/${quiz.id}`, { quiz }).then((res) => res.data);

export const deleteQuiz = async (id: string) =>
  instance.delete(`/quiz/${id}`).then((res) => res.data);
