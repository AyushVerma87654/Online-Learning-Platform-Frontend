import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { ResponsePayload } from "../../models/response";
import {
  fetchAllUsersCoursesProgress,
  fetchProgress,
  updateProgress,
} from "../../api/progress";
import {
  UserCourseProgressPayload,
  UserCourseProgressResponse,
} from "../../models/userCoursesProgess";
import {
  updateUserCourseProgressInitiatedAction,
  updateUserCourseProgressCompletedAction,
  updateUserCourseProgressErrorAction,
  getUserCourseProgressCompletedAction,
  getUserCourseProgressErrorAction,
  getUserCourseProgressInitiatedAction,
} from "../slice/userCourseProgressSlice";
import { UsersCoursesProgressForAdminResponse } from "../../models/admin";
import {
  getAllUsersProgressCompletedAction,
  getAllUsersProgressErrorAction,
  getAllUsersProgressInitiatedAction,
} from "../slice/adminSlice";

function* getUserCourseProgress(
  action: PayloadAction<UserCourseProgressPayload>
): Generator {
  try {
    const response = (yield call(
      fetchProgress,
      action.payload
    )) as ResponsePayload<UserCourseProgressResponse>;
    yield put(getUserCourseProgressCompletedAction(response.responseDetails));
  } catch (error: any) {
    yield put(getUserCourseProgressErrorAction({ error: error.message }));
  }
}

function* updateUserCourseProgress(action: PayloadAction<any>): Generator {
  try {
    const response = (yield call(
      updateProgress,
      action.payload
    )) as ResponsePayload<UserCourseProgressResponse>;
    yield put(
      updateUserCourseProgressCompletedAction(response.responseDetails)
    );
  } catch (error: any) {
    yield put(updateUserCourseProgressErrorAction({ error: error.message }));
  }
}

function* getAllUsersProgress(): Generator {
  try {
    const response = (yield call(
      fetchAllUsersCoursesProgress
    )) as ResponsePayload<UsersCoursesProgressForAdminResponse>;
    yield put(getAllUsersProgressCompletedAction(response.responseDetails));
  } catch (error: any) {
    yield put(getAllUsersProgressErrorAction({ error: error.message }));
  }
}

function* userCourseProgressSaga() {
  yield takeEvery(getUserCourseProgressInitiatedAction, getUserCourseProgress);
  yield takeEvery(
    updateUserCourseProgressInitiatedAction,
    updateUserCourseProgress
  );
  yield takeEvery(getAllUsersProgressInitiatedAction, getAllUsersProgress);
}

export default userCourseProgressSaga;
