import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quiz, Quizzes, SubmitQuizPayload } from "../../models/quiz";

export type QuizState = {
  quizzes: Quizzes;
  selectedQuizId: string;
  loading: boolean;
  message: string;
};

const initialState: QuizState = {
  quizzes: {},
  selectedQuizId: "",
  loading: false,
  message: "",
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    addQuizInitiated,
    addQuizCompleted,
    addQuizError,
    editQuizInitiated,
    editQuizCompleted,
    editQuizError,
    deleteQuizInitiated,
    deleteQuizCompleted,
    deleteQuizError,
    getQuizByIdInitiated,
    getQuizByIdCompleted,
    getQuizByIdError,
    submitQuizInitiated,
    submitQuizCompleted,
    submitQuizError,
  },
});

const { actions, reducer: quizReducer } = quizSlice;

export const {
  addQuizInitiated: addQuizInitiatedAction,
  addQuizCompleted: addQuizCompletedAction,
  addQuizError: addQuizErrorAction,
  editQuizInitiated: editQuizInitiatedAction,
  editQuizCompleted: editQuizCompletedAction,
  editQuizError: editQuizErrorAction,
  deleteQuizInitiated: deleteQuizInitiatedAction,
  deleteQuizCompleted: deleteQuizCompletedAction,
  deleteQuizError: deleteQuizErrorAction,
  getQuizByIdInitiated: getQuizByIdInitiatedAction,
  getQuizByIdCompleted: getQuizByIdCompletedAction,
  getQuizByIdError: getQuizByIdErrorAction,
  submitQuizInitiated: submitQuizInitiatedAction,
  submitQuizCompleted: submitQuizCompletedAction,
  submitQuizError: submitQuizErrorAction,
} = actions;

export default quizReducer;

function addQuizInitiated(state: QuizState, _action: PayloadAction<Quiz>) {
  state.loading = true;
}

function addQuizCompleted(
  state: QuizState,
  action: PayloadAction<{ quiz: Quiz }>
) {
  state.loading = false;
  state.quizzes = {
    ...state.quizzes,
    [action.payload.quiz.id]: action.payload.quiz,
  };
}

function addQuizError(
  state: QuizState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function editQuizInitiated(state: QuizState, _action: PayloadAction<Quiz>) {
  state.loading = true;
}

function editQuizCompleted(
  state: QuizState,
  action: PayloadAction<{ quiz: Quiz }>
) {
  state.loading = false;
  state.quizzes = {
    ...state.quizzes,
    [action.payload.quiz.id]: action.payload.quiz,
  };
}

function editQuizError(
  state: QuizState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function deleteQuizInitiated(state: QuizState, _action: PayloadAction<string>) {
  state.loading = true;
}

function deleteQuizCompleted(
  state: QuizState,
  _action: PayloadAction<{ id: string; message: string }>
) {
  state.loading = false;
}

function deleteQuizError(
  state: QuizState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function getQuizByIdInitiated(state: QuizState, action: PayloadAction<string>) {
  state.selectedQuizId = action.payload;
  state.loading = true;
}

function getQuizByIdCompleted(
  state: QuizState,
  action: PayloadAction<{ quiz: Quiz }>
) {
  state.quizzes = {
    ...state.quizzes,
    [action.payload.quiz.id]: action.payload.quiz,
  };
  state.loading = false;
}

function getQuizByIdError(
  state: QuizState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function submitQuizInitiated(
  state: QuizState,
  _action: PayloadAction<SubmitQuizPayload>
) {
  state.loading = true;
}

function submitQuizCompleted(
  state: QuizState,
  action: PayloadAction<{ message: string }>
) {
  state.message = action.payload.message;
  state.loading = false;
}

function submitQuizError(
  state: QuizState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
  state.loading = false;
}
