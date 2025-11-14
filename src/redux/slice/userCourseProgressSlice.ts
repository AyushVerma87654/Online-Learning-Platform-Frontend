import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  UpdateUserCourseProgressPayload,
  UserCourseProgressPayload,
  UserCourseProgressResponse,
  UserCoursesProgress,
} from "../../models/userCoursesProgess";

export type UserCourseProgressState = {
  userCoursesProgress: UserCoursesProgress;
  loading: boolean;
  message: string;
};

const initialState: UserCourseProgressState = {
  userCoursesProgress: {},
  loading: false,
  message: "",
};

const userCourseProgressSlice = createSlice({
  name: "userCourseProgress",
  initialState,
  reducers: {
    getUserCourseProgressInitiated,
    getUserCourseProgressCompleted,
    getUserCourseProgressError,
    updateUserCourseProgressInitiated,
    updateUserCourseProgressCompleted,
    updateUserCourseProgressError,
  },
});

const { actions, reducer: userCourseProgressReducer } = userCourseProgressSlice;

export const {
  getUserCourseProgressInitiated: getUserCourseProgressInitiatedAction,
  getUserCourseProgressCompleted: getUserCourseProgressCompletedAction,
  getUserCourseProgressError: getUserCourseProgressErrorAction,
  updateUserCourseProgressInitiated: updateUserCourseProgressInitiatedAction,
  updateUserCourseProgressCompleted: updateUserCourseProgressCompletedAction,
  updateUserCourseProgressError: updateUserCourseProgressErrorAction,
} = actions;

export default userCourseProgressReducer;

function getUserCourseProgressInitiated(
  state: UserCourseProgressState,
  _action: PayloadAction<UserCourseProgressPayload>
) {
  state.loading = false;
}

function getUserCourseProgressCompleted(
  state: UserCourseProgressState,
  action: PayloadAction<UserCourseProgressResponse>
) {
  state.userCoursesProgress = {
    ...state.userCoursesProgress,
    [action.payload.userCourseProgress.id]: action.payload.userCourseProgress,
  };
  state.loading = false;
}

function getUserCourseProgressError(
  state: UserCourseProgressState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
  state.loading = false;
}

function updateUserCourseProgressInitiated(
  state: UserCourseProgressState,
  _action: PayloadAction<UpdateUserCourseProgressPayload>
) {
  state.loading = true;
}

function updateUserCourseProgressCompleted(
  state: UserCourseProgressState,
  action: PayloadAction<UserCourseProgressResponse>
) {
  state.userCoursesProgress = {
    ...state.userCoursesProgress,
    [action.payload.userCourseProgress.id]: action.payload.userCourseProgress,
  };
  state.loading = false;
}

function updateUserCourseProgressError(
  state: UserCourseProgressState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
  state.loading = false;
}
