import { call, put, takeLatest } from "redux-saga/effects";
import * as APIS from "./apis";
import * as ACTIONS from "./actions";
import * as TYPES from "./types";
import {
  dispatchSnackbarError,
  dispatchSnackbarSuccess,
} from "../../utils/Shared";

//Payments
//Get Payments
export function* getPaymentsSaga({ payload }) {
  try {
    const { data, headers } = yield call(APIS.getPaymentsRequest, payload);
    yield put(ACTIONS.getPaymentsReceive({data, headers}));
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Get Payment
export function* getPaymentSaga({ payload }) {
  try {
    const { data } = yield call(APIS.getPaymentRequest, payload);
    yield put(ACTIONS.getPaymentReceive(data));
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Create Payment
export function* createPaymentSaga({ payload, navigate }) {
  try {
    const { data } = yield call(APIS.createPaymentRequest, payload);
    yield put(ACTIONS.createPaymentReceive(data));
    dispatchSnackbarSuccess("success");
    setTimeout(() => {
      navigate('/crm/payments');
    } , 1000);
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Update Payment
export function* updatePaymentSaga({ payload, navigate }) {
  try {
    const { data } = yield call(APIS.updatePaymentRequest, payload);
    yield put(ACTIONS.updatePaymentReceive(data));
    dispatchSnackbarSuccess("success");
    setTimeout(() => {
      navigate('/crm/payments');
    } , 1000);
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Delete Payment
export function* deletePaymentSaga({ payload }) {
  try {
    yield call(APIS.deletePaymentRequest, payload);
    yield put(ACTIONS.deletePaymentReceive(payload));
    dispatchSnackbarSuccess("success");
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Refund Payment
export function* refundPaymentSaga({ payload, navigate }) {
  try {
    const { data } = yield call(APIS.refundPaymentRequest, payload);
    yield put(ACTIONS.refundPaymentReceive(data));
    dispatchSnackbarSuccess("success");
    setTimeout(() => {
      navigate('/crm/payments');
    } , 1000);
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

export function* paymentsSagas() {
  yield takeLatest(TYPES.GET_PAYMENTS_REQUEST, getPaymentsSaga);
  yield takeLatest(TYPES.GET_PAYMENT_REQUEST, getPaymentSaga);
  yield takeLatest(TYPES.CREATE_PAYMENT_REQUEST, createPaymentSaga);
  yield takeLatest(TYPES.UPDATE_PAYMENT_REQUEST, updatePaymentSaga);
  yield takeLatest(TYPES.DELETE_PAYMENT_REQUEST, deletePaymentSaga);
  yield takeLatest(TYPES.REFUND_PAYMENT_REQUEST, refundPaymentSaga);
}


