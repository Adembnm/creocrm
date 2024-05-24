import { call, put, takeLatest } from "redux-saga/effects";
import * as APIS from "./apis";
import * as ACTIONS from "./actions";
import * as TYPES from "./types";
import {
  dispatchSnackbarError,
  dispatchSnackbarSuccess,
} from "../../utils/Shared";

//Get Users
export function* getUsersSaga({ payload }) {
  try {
    const { data, headers } = yield call(APIS.getUsersRequest, payload);
    yield put(ACTIONS.getUsersReceive({data, headers}));
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Get UserData
export function* getUserDataSaga({ id }) {
  try {
    const { data } = yield call(APIS.getUserDataRequest, id);
    yield put(ACTIONS.getUserDataReceive(data));
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Add User
export function* addUserSaga({ payload, navigate }) {
  try {
    const { data } = yield call(APIS.addUserRequest, payload);
    yield put(ACTIONS.addUserReceive(data));
    dispatchSnackbarSuccess("success");
    setTimeout(() => {
      navigate('/users');
    } , 1000);
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Edit User
export function* editUserSaga({ payload, navigate }) {
  try {
    const { data } = yield call(APIS.editUserRequest, payload);
    yield put(ACTIONS.editUserReceive(data));
    dispatchSnackbarSuccess("success");
    setTimeout(() => {
      navigate('/users');
    } , 1000);
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Delete User
export function* deleteUserSaga({ id }) {
  try {
    yield call(APIS.deleteUserRequest, id);
    yield put(ACTIONS.deleteUserReceive(id));
    dispatchSnackbarSuccess("success");
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Get Users Statistics
export function* getUsersStatisticsSaga({ payload }) {
  try {
    const { data } = yield call(APIS.getUsersStatisticsRequest, payload);
    yield put(ACTIONS.getUsersStatisticsReceive(data));
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

export function* usersSagas() {
  yield takeLatest(TYPES.GET_USERS_REQUEST, getUsersSaga);
  yield takeLatest(TYPES.GET_USER_DATA_REQUEST, getUserDataSaga);
  yield takeLatest(TYPES.ADD_USER_REQUEST, addUserSaga);
  yield takeLatest(TYPES.EDIT_USER_REQUEST, editUserSaga);
  yield takeLatest(TYPES.DELETE_USER_REQUEST, deleteUserSaga);
  yield takeLatest(TYPES.GET_USERS_STATISTICS_REQUEST, getUsersStatisticsSaga);
}


