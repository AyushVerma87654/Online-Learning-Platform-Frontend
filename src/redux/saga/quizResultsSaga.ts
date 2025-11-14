import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllQuizResultsCompletedAction,
  getAllQuizResultsErrorAction,
  getAllQuizResultsInitiatedAction,
  getQuizResultsByQuizIdCompletedAction,
  getQuizResultsByQuizIdErrorAction,
  getQuizResultsByQuizIdInitiatedAction,
} from "../slice/quizResultsSlice";
import { ResponsePayload } from "../../models/response";
import {
  AllQuizResultsResponse,
  QuizResultsMap,
} from "../../models/quizResults";
import { fetchAllQuizResults, fetchQuizResult } from "../../api/quizResult";

function* getQuizResult(
  action: PayloadAction<{ userId: string; quizId: string }>
): Generator {
  try {
    const data = (yield call(
      fetchQuizResult,
      action.payload
    )) as any as ResponsePayload<{
      quizResults: QuizResultsMap;
    }>;
    yield put(getQuizResultsByQuizIdCompletedAction(data.responseDetails));
  } catch (error: any) {
    yield put(getQuizResultsByQuizIdErrorAction(error));
  }
}

function* getAllQuizResults(): Generator {
  try {
    const data = (yield call(
      fetchAllQuizResults
    )) as any as ResponsePayload<AllQuizResultsResponse>;
    yield put(getAllQuizResultsCompletedAction(data.responseDetails));
  } catch (error: any) {
    yield put(getAllQuizResultsErrorAction(error));
  }
}

function* quizResultsSaga() {
  yield takeEvery(getQuizResultsByQuizIdInitiatedAction, getQuizResult);
  yield takeEvery(getAllQuizResultsInitiatedAction, getAllQuizResults);
}

export default quizResultsSaga;
