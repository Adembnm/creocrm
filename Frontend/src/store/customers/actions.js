import * as TYPES from "./types";

// Get Customer
export const getCustomersRequest = (payload) => ({
  type: TYPES.GET_CUSTOMERS_REQUEST,
  payload,
});
export const getCustomersReceive = (payload) => ({
  type: TYPES.GET_CUSTOMERS_RECEIVE,
  payload,
});
//Get Customer
export const getCustomerRequest = (id) => ({
  type: TYPES.GET_CUSTOMER_REQUEST,
  id,
});
export const getCustomerReceive = (payload) => ({
  type: TYPES.GET_CUSTOMER_RECEIVE,
  payload,
});
//Add Customer
export const addCustomerRequest = (payload, navigate) => ({
  type: TYPES.ADD_CUSTOMER_REQUEST,
  payload,
  navigate,
});
export const addCustomerReceive = (payload) => ({
  type: TYPES.ADD_CUSTOMER_RECEIVE,
  payload,
});
//Edit Customer
export const editCustomerRequest = (payload, navigate) => ({
  type: TYPES.EDIT_CUSTOMER_REQUEST,
  payload,
  navigate,
});
export const editCustomerReceive = (payload) => ({
  type: TYPES.EDIT_CUSTOMER_RECEIVE,
  payload,
});
//Delete Customer
export const deleteCustomerRequest = (id) => ({
  type: TYPES.DELETE_CUSTOMER_REQUEST,
  id,
});
export const deleteCustomerReceive = (id) => ({
  type: TYPES.DELETE_CUSTOMER_RECEIVE,
  id,
});
//Get Customer Statistics
export const getCustomerStatisticsRequest = (payload) => ({
  type: TYPES.GET_CUSTOMERS_STATISTICS_REQUEST,
  payload,
});
export const getCustomerStatisticsReceive = (payload) => ({
  type: TYPES.GET_CUSTOMERS_STATISTICS_RECEIVE,
  payload,
});
//Get Customers List
export const getCustomersListRequest = (payload) => ({
  type: TYPES.GET_CUSTOMERS_LIST_REQUEST,
  payload,
});
export const getCustomersListReceive = (payload) => ({
  type: TYPES.GET_CUSTOMERS_LIST_RECEIVE,
  payload,
});
//Customer Change Status
export const customerChangeStatusRequest = (payload) => ({
  type: TYPES.CUSTOMER_CHANGE_STATUS_REQUEST,
  payload,
});
export const customerChangeStatusReceive = (payload) => ({
  type: TYPES.CUSTOMER_CHANGE_STATUS_RECEIVE,
  payload,
});
//Unpaid Customers list
export const getUnpaidCustomersListRequest = (payload) => ({
  type: TYPES.GET_UNPAID_CUSTOMERS_LIST_REQUEST,
  payload,
});
export const getUnpaidCustomersListReceive = (payload) => ({
  type: TYPES.GET_UNPAID_CUSTOMERS_LIST_RECEIVE,
  payload,
});
//SEND CUSTOM MAIL
export const sendCustomMailRequest = (payload) => ({
  type: TYPES.SEND_CUSTOM_MAIL_REQUEST,
  payload
})
export const sendCustomMailReceive = (payload) => ({
  type: TYPES.SEND_CUSTOM_MAIL_RECEIVE,
  payload
})
