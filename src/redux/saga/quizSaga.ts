import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { ResponsePayload } from "../../models/response";
import { Quiz, SubmitQuizPayload } from "../../models/quiz";
import {
  addQuiz,
  deleteQuiz,
  editQuiz,
  fetchQuizByCourseId,
  submitQuiz,
} from "../../api/quiz";
import {
  addQuizCompletedAction,
  addQuizErrorAction,
  addQuizInitiatedAction,
  deleteQuizCompletedAction,
  deleteQuizErrorAction,
  deleteQuizInitiatedAction,
  editQuizCompletedAction,
  editQuizErrorAction,
  editQuizInitiatedAction,
  getQuizByIdCompletedAction,
  getQuizByIdErrorAction,
  getQuizByIdInitiatedAction,
  submitQuizErrorAction,
  submitQuizInitiatedAction,
} from "../slice/quizSlice";
import { submittedQuizResultAction } from "../slice/quizResultsSlice";
import { QuizResult } from "../../models/quizResults";

function* addingQuiz(action: PayloadAction<Quiz>): Generator {
  try {
    const data = (yield call(
      addQuiz,
      action.payload
    )) as any as ResponsePayload<{ quiz: Quiz }>;
    yield put(addQuizCompletedAction(data.responseDetails));
  } catch (error: any) {
    console.log("error", error);
    yield put(addQuizErrorAction(error));
  }
}

function* editingQuiz(action: PayloadAction<Quiz>): Generator {
  try {
    const data = (yield call(
      editQuiz,
      action.payload
    )) as any as ResponsePayload<{ quiz: Quiz }>;
    yield put(editQuizCompletedAction(data.responseDetails));
  } catch (error: any) {
    console.log("error", error);
    yield put(editQuizErrorAction(error));
  }
}

function* deletingQuiz(action: PayloadAction<string>): Generator {
  try {
    const data = (yield call(
      deleteQuiz,
      action.payload
    )) as any as ResponsePayload<{ id: string; message: string }>;
    yield put(deleteQuizCompletedAction(data.responseDetails));
  } catch (error: any) {
    console.log("error", error);
    yield put(deleteQuizErrorAction(error));
  }
}

function* fetchingQuizByCourseId(action: PayloadAction<string>): Generator {
  try {
    const data = (yield call(
      fetchQuizByCourseId,
      action.payload
    )) as any as ResponsePayload<{ quiz: Quiz }>;
    yield put(getQuizByIdCompletedAction(data.responseDetails));
  } catch (error: any) {
    console.log("error", error);
    yield put(getQuizByIdErrorAction(error));
  }
}

function* quizSubmit(action: PayloadAction<SubmitQuizPayload>): Generator {
  try {
    const data = (yield call(
      submitQuiz,
      action.payload
    )) as any as ResponsePayload<{ quizResult: QuizResult }>;
    yield put(submittedQuizResultAction(data.responseDetails));
  } catch (error: any) {
    console.log("error", error);
    yield put(submitQuizErrorAction(error));
  }
}

function* quizSaga() {
  yield takeEvery(addQuizInitiatedAction, addingQuiz);
  yield takeEvery(editQuizInitiatedAction, editingQuiz);
  yield takeEvery(deleteQuizInitiatedAction, deletingQuiz);
  yield takeEvery(getQuizByIdInitiatedAction, fetchingQuizByCourseId);
  yield takeEvery(submitQuizInitiatedAction, quizSubmit);
}

export default quizSaga;
