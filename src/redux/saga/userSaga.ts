import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  authCompletedAction,
  authErrorAction,
  fetchMeInitiatedAction,
  loginInitiatedAction,
  logoutCompletedAction,
  logoutErrorAction,
  logoutInitiatedAction,
  paymentCompletedAction,
  paymentErrorAction,
  paymentInitiatedAction,
  signupInitiatedAction,
} from "../slice/userSlice";
import {
  AuthCompletedResponse,
  LoginPayload,
  SignupPayload,
} from "../../models/user";
import { ResponsePayload } from "../../models/response";
import {
  fetchAllUsers,
  fetchMe,
  loginUser,
  logoutUser,
  payment,
  signupUser,
} from "../../api/user";
import { AllUsersResponse } from "../../models/admin";
import {
  getAllUsersCompletedAction,
  getAllUsersErrorAction,
  getAllUsersInitiatedAction,
} from "../slice/adminSlice";

function* signup(action: PayloadAction<SignupPayload>): Generator {
  try {
    const response = (yield call(
      signupUser,
      action.payload
    )) as ResponsePayload<AuthCompletedResponse>;
    yield put(authCompletedAction(response.responseDetails));
  } catch (error: any) {
    yield put(authErrorAction({ error: error.message }));
  }
}

function* login(action: PayloadAction<LoginPayload>): Generator {
  try {
    const response = (yield call(
      loginUser,
      action.payload
    )) as ResponsePayload<AuthCompletedResponse>;
    yield put(authCompletedAction(response.responseDetails));
  } catch (error: any) {
    yield put(authErrorAction({ error: error.message }));
  }
}

function* fetchme(): Generator {
  try {
    const response = (yield call(
      fetchMe
    )) as ResponsePayload<AuthCompletedResponse>;
    yield put(authCompletedAction(response.responseDetails));
  } catch (error: any) {
    yield put(authErrorAction({ error: error.message }));
  }
}

function* logout(): Generator {
  try {
    const response = (yield call(logoutUser)) as ResponsePayload<{
      message: string;
    }>;
    yield put(logoutCompletedAction(response.responseDetails));
  } catch (error: any) {
    yield put(logoutErrorAction({ error: error.message }));
  }
}

function* getAllUsers(): Generator {
  try {
    const response = (yield call(
      fetchAllUsers
    )) as ResponsePayload<AllUsersResponse>;
    yield put(getAllUsersCompletedAction(response.responseDetails));
  } catch (error: any) {
    yield put(getAllUsersErrorAction({ error: error.message }));
  }
}

function* makePayments(): Generator {
  try {
    const response = (yield call(payment)) as ResponsePayload<{
      url: string;
      message: string;
    }>;
    window.open(response.responseDetails.url, "_blank", "noopener,noreferrer");
    yield put(paymentCompletedAction(response.responseDetails));
  } catch (error: any) {
    yield put(paymentErrorAction({ error: error.message }));
  }
}

function* userSaga() {
  yield takeEvery(signupInitiatedAction, signup);
  yield takeEvery(loginInitiatedAction, login);
  yield takeEvery(fetchMeInitiatedAction, fetchme);
  yield takeEvery(logoutInitiatedAction, logout);
  yield takeEvery(getAllUsersInitiatedAction, getAllUsers);
  yield takeEvery(paymentInitiatedAction, makePayments);
}

export default userSaga;
