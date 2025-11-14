import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthCompletedResponse,
  LoginPayload,
  SignupPayload,
  User,
  UserRole,
} from "../../models/user";

export type UserState = {
  user: User;
  isLoggedIn: boolean;
  accessToken: string;
  loading: boolean;
  message: string;
};

const initialState: UserState = {
  user: {
    id: "",
    name: "",
    email: "",
    role: UserRole.STUDENT,
    isPremiumUser: false,
    paidAt: "",
    planValidTill: "",
    createdAt: "",
    updatedAt: "",
  },
  isLoggedIn: false,
  accessToken: "",
  loading: false,
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signupInitiated,
    authCompleted,
    authError,
    loginInitiated,
    fetchMeInitiated,
    logoutInitiated,
    logoutCompleted,
    logoutError,

    paymentInitiated,
    paymentCompleted,
    paymentError,
  },
});

const { actions, reducer: userReducer } = userSlice;

export const {
  signupInitiated: signupInitiatedAction,
  authCompleted: authCompletedAction,
  authError: authErrorAction,
  loginInitiated: loginInitiatedAction,
  fetchMeInitiated: fetchMeInitiatedAction,
  logoutInitiated: logoutInitiatedAction,
  logoutCompleted: logoutCompletedAction,
  logoutError: logoutErrorAction,
  paymentInitiated: paymentInitiatedAction,
  paymentCompleted: paymentCompletedAction,
  paymentError: paymentErrorAction,
} = actions;

export default userReducer;

function signupInitiated(
  state: UserState,
  _action: PayloadAction<SignupPayload>
) {
  state.loading = true;
}

function authCompleted(
  state: UserState,
  action: PayloadAction<AuthCompletedResponse>
) {
  state.loading = false;
  state.user = action.payload.user;
  state.isLoggedIn = true;
  state.accessToken = action.payload.accessToken;
}

function authError(state: UserState, action: PayloadAction<{ error: string }>) {
  state.loading = false;
  state.message = action.payload.error;
}

function loginInitiated(
  state: UserState,
  _action: PayloadAction<LoginPayload>
) {
  state.loading = true;
}

function fetchMeInitiated(state: UserState) {
  state.loading = true;
}

function logoutInitiated(state: UserState) {
  state.loading = true;
}

function logoutCompleted(
  _state: UserState,
  action: PayloadAction<{ message: string }>
) {
  return { ...initialState, message: action.payload.message };
}

function logoutError(
  state: UserState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
  state.loading = false;
}

function paymentInitiated(state: UserState) {
  state.loading = true;
}

function paymentCompleted(
  state: UserState,
  action: PayloadAction<{ message: string }>
) {
  state.message = action.payload.message;
  state.loading = false;
}

function paymentError(
  state: UserState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
  state.loading = false;
}
