import { call, put, takeLatest } from "redux-saga/effects";
import * as APIS from "./apis";
import * as ACTIONS from "./actions";
import * as TYPES from "./types";
import {
  dispatchSnackbarError,
  dispatchSnackbarSuccess,
} from "../../utils/Shared";

//Services
//Get Services
export function* getServicesSaga({ payload }) {
  try {
    const { data, headers } = yield call(APIS.getServicesRequest, payload);
    yield put(ACTIONS.getServicesReceive({data, headers}));
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Get Service
export function* getServiceSaga({ payload }) {
  try {
    const { data } = yield call(APIS.getServiceRequest, payload);
    yield put(ACTIONS.getServiceReceive(data));
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Create Service
export function* createServiceSaga({ payload, navigate }) {
  try {
    const { data } = yield call(APIS.createServiceRequest, payload);
    yield put(ACTIONS.createServiceReceive(data));
    dispatchSnackbarSuccess("success");
    setTimeout(() => {
      navigate('/crm/services');
    } , 1000);
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Update Service
export function* updateServiceSaga({ payload, navigate }) {
  try {
    const { data } = yield call(APIS.updateServiceRequest, payload);
    yield put(ACTIONS.updateServiceReceive(data));
    dispatchSnackbarSuccess("success");
    setTimeout(() => {
      navigate('/crm/services');
    } , 1000);
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Delete Service
export function* deleteServiceSaga({ id }) {
  try {
    yield call(APIS.deleteServiceRequest, id);
    yield put(ACTIONS.deleteServiceReceive(id));
    dispatchSnackbarSuccess("success");
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

export function* servicesSagas() {
  yield takeLatest(TYPES.GET_SERVICES_REQUEST, getServicesSaga);
  yield takeLatest(TYPES.GET_SERVICE_REQUEST, getServiceSaga);
  yield takeLatest(TYPES.CREATE_SERVICE_REQUEST, createServiceSaga);
  yield takeLatest(TYPES.UPDATE_SERVICE_REQUEST, updateServiceSaga);
  yield takeLatest(TYPES.DELETE_SERVICE_REQUEST, deleteServiceSaga);
}


