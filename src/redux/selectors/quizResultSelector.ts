import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { selectedQuizIdSelector } from "./quizSelector";

export const quizResultStateSelector = (state: AppState) => state.quizResult;

export const quizResultsSelector = createSelector(
  [quizResultStateSelector],
  (state) => state.quizResults
);

export const quizResultsMapSelector = createSelector(
  [quizResultsSelector],
  (quizResults) => Object.values(quizResults)
);

export const selectedQuizResultsSelector = createSelector(
  [quizResultsMapSelector, selectedQuizIdSelector],
  (quizResults, selectedQuizId) =>
    quizResults.filter((quizResult) => {
      if (quizResult.quizId === selectedQuizId) return quizResult;
    })
);

export const selectedQuizLatestResultSelector = createSelector(
  [selectedQuizResultsSelector],
  (quizResults) =>
    quizResults?.sort(
      (a, b) =>
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    )[0]
);

export const selectedQuizScoreSelector = createSelector(
  [selectedQuizLatestResultSelector],
  (quizResult) => quizResult?.score
);
