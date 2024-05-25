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

export function* getUser() {
  try {
    const response = yield call(API.getUser);
    yield put(ACTIONS.getUserReceive(response.data));
  } catch (err) {
    console.log(err.response.data);
    dispatchSnackbarError(err.response?.data);
  }
}



export function* authSagas() {
  yield takeLatest(TYPES.LOGIN_REQUEST, login);
  yield takeLatest(TYPES.GET_USER_REQUEST, getUser);
  
}
