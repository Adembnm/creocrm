import { call, put, takeLatest } from "redux-saga/effects";
import * as APIS from "./apis";
import * as ACTIONS from "./actions";
import * as TYPES from "./types";
import {
  dispatchSnackbarError,
  dispatchSnackbarSuccess,
} from "../../utils/Shared";

//Get Customers
export function* getCustomersSaga({ payload }) {
  try {
    const { data, headers } = yield call(APIS.getCustomersRequest, payload);
    yield put(ACTIONS.getCustomersReceive({ data, headers }));
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Get Customer
export function* getCustomerSaga({ id }) {
  try {
    const { data } = yield call(APIS.getCustomerRequest, id);
    yield put(ACTIONS.getCustomerReceive(data));
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Add Customer
export function* addCustomerSaga({ payload, navigate }) {
  try {
    const { data } = yield call(APIS.addCustomerRequest, payload);
    yield put(ACTIONS.addCustomerReceive(data));
    dispatchSnackbarSuccess("success");
    setTimeout(() => {
      navigate('/crm/customers');
    }, 1000);
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Edit Customer
export function* editCustomerSaga({ payload, navigate }) {
  try {
    const { data } = yield call(APIS.editCustomerRequest, payload);
    yield put(ACTIONS.editCustomerReceive(data));
    dispatchSnackbarSuccess("success");
    setTimeout(() => {
      navigate('/crm/customers');
    }, 1000);
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Delete Customer
export function* deleteCustomerSaga({ id }) {
  try {
    yield call(APIS.deleteCustomerRequest, id);
    yield put(ACTIONS.deleteCustomerReceive(id));
    dispatchSnackbarSuccess("success");
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Get Customers Statistics
export function* getCustomersStatisticsSaga({ payload }) {
  try {
    const { data } = yield call(APIS.getCustomersStatisticsRequest, payload);
    yield put(ACTIONS.getCustomerStatisticsReceive(data));
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Get Customers List
export function* getCustomersListSaga({ payload }) {
  try {
    const { data } = yield call(APIS.getCustomersListRequest, payload);
    yield put(ACTIONS.getCustomersListReceive(data));
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Customer Change Status
export function* customerChangeStatusSaga({ payload }) {
  try {
    const { data } = yield call(APIS.customerChangeStatusRequest, payload);
    yield put(ACTIONS.customerChangeStatusReceive(data));
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Unpaid Customers list
export function* getUnpaidCustomersSaga({ payload }) {
  try {
    const { data } = yield call(APIS.getUnpaidCustomersRequest, payload);
    yield put(ACTIONS.getUnpaidCustomersListReceive(data));
  } catch (err) {
    console.log(err?.response?.data);
  }
}

//Send Custom Mail
export function* sendCustomMail({ payload }) {
  try {
    yield put(ACTIONS.sendCustomMailReceive(false));
    yield call(APIS.sendCustomMail, payload);
    yield put(ACTIONS.sendCustomMailReceive(true));
    dispatchSnackbarSuccess("success");
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

export function* customersSagas() {
  yield takeLatest(TYPES.GET_CUSTOMERS_REQUEST, getCustomersSaga);
  yield takeLatest(TYPES.GET_CUSTOMER_REQUEST, getCustomerSaga);
  yield takeLatest(TYPES.ADD_CUSTOMER_REQUEST, addCustomerSaga);
  yield takeLatest(TYPES.EDIT_CUSTOMER_REQUEST, editCustomerSaga);
  yield takeLatest(TYPES.DELETE_CUSTOMER_REQUEST, deleteCustomerSaga);
  yield takeLatest(TYPES.GET_CUSTOMERS_STATISTICS_REQUEST, getCustomersStatisticsSaga);
  yield takeLatest(TYPES.GET_CUSTOMERS_LIST_REQUEST, getCustomersListSaga);
  yield takeLatest(TYPES.CUSTOMER_CHANGE_STATUS_REQUEST, customerChangeStatusSaga);
  yield takeLatest(TYPES.GET_UNPAID_CUSTOMERS_LIST_REQUEST, getUnpaidCustomersSaga);
  yield takeLatest(TYPES.SEND_CUSTOM_MAIL_REQUEST, sendCustomMail);
}


