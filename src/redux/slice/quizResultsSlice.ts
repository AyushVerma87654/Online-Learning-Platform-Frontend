import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AllQuizResultsResponse,
  QuizResult,
  QuizResults,
  QuizResultsMap,
} from "../../models/quizResults";

export type QuizResultsState = {
  quizResults: QuizResults;
  loading: boolean;
  message: string;
};

const initialState: QuizResultsState = {
  quizResults: {},
  loading: false,
  message: "",
};

const quizResultsSlice = createSlice({
  name: "quizResults",
  initialState,
  reducers: {
    getQuizResultsByQuizIdInitiated,
    getQuizResultsByQuizIdCompleted,
    getQuizResultsByQuizIdError,
    submittedQuizResult,
    getAllQuizResultsInitiated,
    getAllQuizResultsCompleted,
    getAllQuizResultsError,
  },
});

const { actions, reducer: quizResultsReducer } = quizResultsSlice;

export const {
  getQuizResultsByQuizIdInitiated: getQuizResultsByQuizIdInitiatedAction,
  getQuizResultsByQuizIdCompleted: getQuizResultsByQuizIdCompletedAction,
  getQuizResultsByQuizIdError: getQuizResultsByQuizIdErrorAction,
  submittedQuizResult: submittedQuizResultAction,
  getAllQuizResultsInitiated: getAllQuizResultsInitiatedAction,
  getAllQuizResultsCompleted: getAllQuizResultsCompletedAction,
  getAllQuizResultsError: getAllQuizResultsErrorAction,
} = actions;

export default quizResultsReducer;

function getQuizResultsByQuizIdInitiated(
  state: QuizResultsState,
  _action: PayloadAction<{ userId: string; quizId: string }>
) {
  state.loading = true;
}

function getQuizResultsByQuizIdCompleted(
  state: QuizResultsState,
  action: PayloadAction<{ quizResults: QuizResultsMap }>
) {
  let quizResults = {};
  action.payload.quizResults.forEach((quizResult) => {
    quizResults = { ...quizResults, [quizResult.id]: quizResult };
  });
  state.quizResults = {
    ...state.quizResults,
    ...quizResults,
  };
  state.loading = false;
}

function getQuizResultsByQuizIdError(
  state: QuizResultsState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
  state.loading = false;
}

function submittedQuizResult(
  state: QuizResultsState,
  action: PayloadAction<{ quizResult: QuizResult }>
) {
  state.quizResults = {
    ...state.quizResults,
    [action.payload.quizResult.id]: action.payload.quizResult,
  };
}

function getAllQuizResultsInitiated(state: QuizResultsState) {
  state.loading = true;
}

function getAllQuizResultsCompleted(
  state: QuizResultsState,
  action: PayloadAction<AllQuizResultsResponse>
) {
  action.payload.allQuizResults.forEach((quizResult) => {
    state.quizResults = { ...state.quizResults, [quizResult.id]: quizResult };
  });
  state.loading = false;
}

function getAllQuizResultsError(
  state: QuizResultsState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
  state.loading = false;
}
