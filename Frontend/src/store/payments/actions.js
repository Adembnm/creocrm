import * as TYPES from "./types";
//Payments
// Get Payments
export const getPaymentsRequest = (payload) => ({
  type: TYPES.GET_PAYMENTS_REQUEST,
  payload,
});
export const getPaymentsReceive = (payload) => ({
  type: TYPES.GET_PAYMENTS_RECEIVE,
  payload,
});
//Get Payment
export const getPaymentRequest = (payload) => ({
  type: TYPES.GET_PAYMENT_REQUEST,
  payload,
});
export const getPaymentReceive = (payload) => ({
  type: TYPES.GET_PAYMENT_RECEIVE,
  payload,
});
//Create Payment
export const createPaymentRequest = (payload, navigate) => ({
  type: TYPES.CREATE_PAYMENT_REQUEST,
  payload,
  navigate,
});
export const createPaymentReceive = (payload) => ({
  type: TYPES.CREATE_PAYMENT_RECEIVE,
  payload,
});
//Update Payment
export const updatePaymentRequest = (payload, navigate) => ({
  type: TYPES.UPDATE_PAYMENT_REQUEST,
  payload,
  navigate,
});
export const updatePaymentReceive = (payload) => ({
  type: TYPES.UPDATE_PAYMENT_RECEIVE,
  payload,
});
//Delete Payment
export const deletePaymentRequest = (payload) => ({
  type: TYPES.DELETE_PAYMENT_REQUEST,
  payload,
});
export const deletePaymentReceive = (payload) => ({
  type: TYPES.DELETE_PAYMENT_RECEIVE,
  payload,
});
//Refund Payment
export const refundPaymentRequest = (payload, navigate) => ({
  type: TYPES.REFUND_PAYMENT_REQUEST,
  payload,
  navigate,
});
export const refundPaymentReceive = (payload) => ({
  type: TYPES.REFUND_PAYMENT_RECEIVE,
  payload,
});