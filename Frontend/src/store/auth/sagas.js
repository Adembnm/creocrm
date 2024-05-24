import { call, put, takeLatest } from "redux-saga/effects";
import * as API from "./api";
import * as ACTIONS from "./actions";
import * as TYPES from "./types";
import {
  dispatchSnackbarError,
  dispatchSnackbarSuccess,
} from "../../utils/Shared";

// Login
export function* login({ payload }) {
  try {
    const response = yield call(API.login, payload);
    yield put(ACTIONS.loginReceive(response.data));
    if (response?.status === 200) {
      localStorage.setItem("user", JSON.stringify(response?.data?.user));
      localStorage.setItem("token", response?.data?.token);
    }
  } catch (err) {
    console.log(err);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatchSnackbarError(err?.response?.data);
  }
}

export function* forgetPassword({ payload }) {
  try {
    const response = yield call(API.forgetPassword, payload);
    yield put(ACTIONS.forgetPasswordReceive(response.data));
    dispatchSnackbarSuccess("success");
  } catch (err) {
    console.log(err.response.data);
    dispatchSnackbarError(err.response?.data);
  }
}

export function* resetPassword({ payload }) {
  try {
    const response = yield call(API.resetPassword, payload);
    yield put(ACTIONS.resetPasswordReceive(response.data));
    if (response?.status === 200) {
      localStorage.setItem("reset_password", true);
    }
  } catch (err) {
    console.log(err.response.data);
    dispatchSnackbarError(err.response?.data);
  }
}

export function* forcePassword({ payload }) {
  try {
    yield call(API.forcePassword, payload);
    yield put(ACTIONS.forcePasswordReceive());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // dispatchSnackbarSuccess("success");
  } catch (err) {
    console.log(err?.response?.data);
   // dispatchSnackbarError(err?.response?.data);
  }
}

export function* getUser() {
  try {
    const response = yield call(API.getUser);
    yield put(ACTIONS.getUserReceive(response.data));
  } catch (err) {
    console.log(err.response.data);
    dispatchSnackbarError(err.response?.data);
  }
}

export function* logout() {
  try {
    yield put(ACTIONS.logoutReceive());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } catch (err) {
    console.log(err.response.data);
    dispatchSnackbarError(err.response?.data);
  }
}

export function* authSagas() {
  yield takeLatest(TYPES.LOGIN_REQUEST, login);
  yield takeLatest(TYPES.FORGET_PASSWORD_REQUEST, forgetPassword);
  yield takeLatest(TYPES.RESET_PASSWORD_REQUEST, resetPassword);
  yield takeLatest(TYPES.FORCE_PASSWORD_REQUEST, forcePassword);
  yield takeLatest(TYPES.GET_USER_REQUEST, getUser);
  yield takeLatest(TYPES.LOGOUT_REQUEST, logout);
}
