import { call, put, takeLatest } from "redux-saga/effects";
import * as APIS from "./apis";
import * as ACTIONS from "./actions";
import * as TYPES from "./types";
import {
  dispatchSnackbarError,
  dispatchSnackbarSuccess,
} from "../../utils/Shared";

//Orders
//Get Orders
export function* getOrdersSaga({ payload }) {
  try {
    const { data, headers } = yield call(APIS.getOrdersRequest, payload);
    yield put(ACTIONS.getOrdersReceive({data, headers}));
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Get Order
export function* getOrderSaga({ payload }) {
  try {
    const { data } = yield call(APIS.getOrderRequest, payload);
    yield put(ACTIONS.getOrderReceive(data));
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Create Order
export function* createOrderSaga({ payload, navigate }) {
  try {
    const { data } = yield call(APIS.createOrderRequest, payload);
    yield put(ACTIONS.createOrderReceive(data));
    dispatchSnackbarSuccess("success");
    setTimeout(() => {
      navigate('/crm/orders');
    } , 1000);
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Update Order
export function* updateOrderSaga({ payload, navigate }) {
  try {
    const { data } = yield call(APIS.updateOrderRequest, payload);
    yield put(ACTIONS.updateOrderReceive(data));
    dispatchSnackbarSuccess("success");
    setTimeout(() => {
      navigate('/crm/orders');
    } , 1000);
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Delete Order
export function* deleteOrderSaga({ id }) {
  try {
    yield call(APIS.deleteOrderRequest, id);
    yield put(ACTIONS.deleteOrderReceive(id));
    dispatchSnackbarSuccess("success");
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

// Accept Order
export function* acceptOrderSaga({ payload }) {
  try {
    const { data } = yield call(APIS.acceptOrderRequest, payload);
    yield put(ACTIONS.acceptOrderReceive(data));
    dispatchSnackbarSuccess("success");
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

// Reject Order
export function* rejectOrderSaga({ payload }) {
  try {
    const { data } = yield call(APIS.rejectOrderRequest, payload);
    yield put(ACTIONS.rejectOrderReceive(data));
    dispatchSnackbarSuccess("success");
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

// List Customers
export function* listCustomersSaga() {
  try {
    const { data } = yield call(APIS.getListCustomersRequest);
    yield put(ACTIONS.getListCustomersReceive(data));
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Get Customer Orders
export function* getCustomerOrdersSaga({ payload }) {
  try {
    const { data } = yield call(APIS.getCustomerOrdersRequest, payload);
    yield put(ACTIONS.getCustomerOrdersReceive(data));
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

//Get Orders Statistics
export function* getOrdersStatisticsSaga({ payload }) {
  try {
    const { data } = yield call(APIS.getOrdersStatisticsRequest, payload);
    yield put(ACTIONS.getOrdersStatisticsReceive(data));
  } catch (err) {
    console.log(err?.response?.data);
    dispatchSnackbarError(err.response?.data);
  }
}

export function* ordersSagas() {
  yield takeLatest(TYPES.GET_ORDERS_REQUEST, getOrdersSaga);
  yield takeLatest(TYPES.GET_ORDER_REQUEST, getOrderSaga);
  yield takeLatest(TYPES.CREATE_ORDER_REQUEST, createOrderSaga);
  yield takeLatest(TYPES.UPDATE_ORDER_REQUEST, updateOrderSaga);
  yield takeLatest(TYPES.DELETE_ORDER_REQUEST, deleteOrderSaga);
  yield takeLatest(TYPES.ACCEPT_ORDER_REQUEST, acceptOrderSaga);
  yield takeLatest(TYPES.REJECT_ORDER_REQUEST, rejectOrderSaga);
  yield takeLatest(TYPES.GET_LIST_CUSTOMERS_REQUEST, listCustomersSaga);
  yield takeLatest(TYPES.GET_CUSTOMER_ORDERS_REQUEST, getCustomerOrdersSaga);
  yield takeLatest(TYPES.GET_ORDERS_STATISTICS_REQUEST, getOrdersStatisticsSaga);
}


