import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { selectedCourseIdSelector } from "./courseSelector";
import { Quiz } from "../../models/quiz";

export const quizStateSelector = (state: AppState) => state.quiz;

export const quizzesSelector = createSelector(
  [quizStateSelector],
  (state) => state.quizzes
);

export const quizzesMapSelector = createSelector([quizzesSelector], (quizzes) =>
  Object.values(quizzes)
);

export const selectedQuizIdSelector = createSelector(
  [quizStateSelector],
  (state) => state.selectedQuizId
);

export const selectedQuizSelector = createSelector(
  [quizzesSelector, selectedQuizIdSelector],
  (quizzes, selectedQuizId) => quizzes[selectedQuizId]
);

export const selectedCourseModuleIdQuizzesEntitySelector = createSelector(
  [quizzesMapSelector, selectedCourseIdSelector],
  (quizzes, selectedCourseId) => {
    let quizzesEntity: Record<string, Quiz> = {};
    quizzes.forEach((quiz) => {
      if (quiz.courseId === selectedCourseId)
        quizzesEntity = { ...quizzesEntity, [quiz.moduleId]: quiz };
    });
    return quizzesEntity;
  }
);

export const selectedCourseQuizzesMapSelector = createSelector(
  [selectedCourseModuleIdQuizzesEntitySelector],
  (quizzes) => Object.values(quizzes)
);

export const quizLoadingSelector = createSelector(
  [quizStateSelector],
  (state) => state.loading
);

export const quizMessageSelector = createSelector(
  [quizStateSelector],
  (state) => state.message
);
