import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AllUsers,
  AllUsersResponse,
  UsersCoursesProgressForAdmin,
  UsersCoursesProgressForAdminResponse,
} from "../../models/admin";

export type AdminState = {
  allUsers: AllUsers;
  allUsersProgress: UsersCoursesProgressForAdmin;
  loading: boolean;
  message: string;
};

const initialState: AdminState = {
  allUsers: {},
  allUsersProgress: {},
  loading: false,
  message: "",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    getAllUsersInitiated,
    getAllUsersCompleted,
    getAllUsersError,
    getAllUsersProgressInitiated,
    getAllUsersProgressCompleted,
    getAllUsersProgressError,
  },
});

const { actions, reducer: adminReducer } = adminSlice;

export const {
  getAllUsersInitiated: getAllUsersInitiatedAction,
  getAllUsersCompleted: getAllUsersCompletedAction,
  getAllUsersError: getAllUsersErrorAction,
  getAllUsersProgressInitiated: getAllUsersProgressInitiatedAction,
  getAllUsersProgressCompleted: getAllUsersProgressCompletedAction,
  getAllUsersProgressError: getAllUsersProgressErrorAction,
} = actions;

export default adminReducer;

function getAllUsersInitiated(state: AdminState) {
  state.loading = true;
}

function getAllUsersCompleted(
  state: AdminState,
  action: PayloadAction<AllUsersResponse>
) {
  state.loading = false;
  action.payload.allUsers.forEach((user) => {
    state.allUsers = { ...state.allUsers, [user.id]: user };
  });
}

function getAllUsersError(
  state: AdminState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
  state.loading = false;
}

function getAllUsersProgressInitiated(state: AdminState) {
  state.loading = true;
}

function getAllUsersProgressCompleted(
  state: AdminState,
  action: PayloadAction<UsersCoursesProgressForAdminResponse>
) {
  state.loading = false;
  action.payload.allUsersProgress.forEach((userProgress) => {
    state.allUsersProgress = {
      ...state.allUsersProgress,
      [userProgress.id]: userProgress,
    };
  });
}

function getAllUsersProgressError(
  state: AdminState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
  state.loading = false;
}
