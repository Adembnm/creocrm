import { call, put, takeLatest } from "redux-saga/effects";
import * as APIS from "./apis";
import * as ACTIONS from "./actions";
import * as TYPES from "./types";
import {
  dispatchSnackbarError,
  dispatchSnackbarSuccess,
} from "../../utils/Shared";

//Appointments
//Get Appointments
export function* getAppointmentsSaga({ payload }) {
  try {
    const { data, headers } = yield call(APIS.getAppointmentsRequest, payload);
    yield put(ACTIONS.getAppointmentsReceive({data, headers}));
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Get Appointment
export function* getAppointmentSaga({ payload }) {
  try {
    const { data } = yield call(APIS.getAppointmentRequest, payload);
    yield put(ACTIONS.getAppointmentReceive(data));
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Create Appointment
export function* createAppointmentSaga({ payload, navigate }) {
  try {
    const { data } = yield call(APIS.createAppointmentRequest, payload);
    yield put(ACTIONS.createAppointmentReceive(data));
    dispatchSnackbarSuccess("success");
    setTimeout(() => {
      navigate('/crm/appointments');
    } , 1000);
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Update Appointment
export function* updateAppointmentSaga({ payload, navigate }) {
  try {
    const { data } = yield call(APIS.updateAppointmentRequest, payload);
    yield put(ACTIONS.updateAppointmentReceive(data));
    dispatchSnackbarSuccess("success");
    setTimeout(() => {
      navigate('/crm/appointments');
    } , 1000);
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Delete Appointment
export function* deleteAppointmentSaga({ id }) {
  try {
    yield call(APIS.deleteAppointmentRequest, id);
    yield put(ACTIONS.deleteAppointmentReceive(id));
    dispatchSnackbarSuccess("success");
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Get List Customers
export function* getListCustomersSaga({ payload }) {
  try {
    const { data, headers } = yield call(APIS.listCustomersRequest, payload);
    yield put(ACTIONS.listCustomersReceive({data, headers}));
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Get Next Appointment
export function* getNextAppointmentSaga({ payload }) {
  try {
    const { data } = yield call(APIS.getNextAppointmentRequest, payload);
    yield put(ACTIONS.getNextAppointmentReceive(data));
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

export function* appointmentsSagas() {
  yield takeLatest(TYPES.GET_APPOINTMENTS_REQUEST, getAppointmentsSaga);
  yield takeLatest(TYPES.GET_APPOINTMENT_REQUEST, getAppointmentSaga);
  yield takeLatest(TYPES.CREATE_APPOINTMENT_REQUEST, createAppointmentSaga);
  yield takeLatest(TYPES.UPDATE_APPOINTMENT_REQUEST, updateAppointmentSaga);
  yield takeLatest(TYPES.DELETE_APPOINTMENT_REQUEST, deleteAppointmentSaga);
  yield takeLatest(TYPES.LIST_CUSTOMERS_REQUEST, getListCustomersSaga);
  yield takeLatest(TYPES.GET_NEXT_APPOINTMENT_REQUEST, getNextAppointmentSaga);
}


