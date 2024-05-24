import * as TYPES from "./types";
//Orders
// Get Orders
export const getOrdersRequest = (payload) => ({
  type: TYPES.GET_ORDERS_REQUEST,
  payload,
});
export const getOrdersReceive = (payload) => ({
  type: TYPES.GET_ORDERS_RECEIVE,
  payload,
});
//Get Pre Order
export const getOrderRequest = (payload) => ({
  type: TYPES.GET_ORDER_REQUEST,
  payload,
});
export const getOrderReceive = (payload) => ({
  type: TYPES.GET_ORDER_RECEIVE,
  payload,
});
//Create Pre Order
export const createOrderRequest = (payload, navigate) => ({
  type: TYPES.CREATE_ORDER_REQUEST,
  payload,
  navigate,
});
export const createOrderReceive = (payload) => ({
  type: TYPES.CREATE_ORDER_RECEIVE,
  payload,
});
//Update Order
export const updateOrderRequest = (payload, navigate) => ({
  type: TYPES.UPDATE_ORDER_REQUEST,
  payload,
  navigate,
});
export const updateOrderReceive = (payload) => ({
  type: TYPES.UPDATE_ORDER_RECEIVE,
  payload,
});
//Delete Order
export const deleteOrderRequest = (id) => ({
  type: TYPES.DELETE_ORDER_REQUEST,
  id,
});
export const deleteOrderReceive = (id) => ({
  type: TYPES.DELETE_ORDER_RECEIVE,
  id,
});
//Accept Order
export const acceptOrderRequest = (payload) => ({
  type: TYPES.ACCEPT_ORDER_REQUEST,
  payload,
});
export const acceptOrderReceive = (payload) => ({
  type: TYPES.ACCEPT_ORDER_RECEIVE,
  payload,
});
//Reject Order
export const rejectOrderRequest = (payload) => ({
  type: TYPES.REJECT_ORDER_REQUEST,
  payload,
});
export const rejectOrderReceive = (payload) => ({
  type: TYPES.REJECT_ORDER_RECEIVE,
  payload,
});
//List Customers
export const getListCustomersRequest = () => ({
  type: TYPES.GET_LIST_CUSTOMERS_REQUEST,
});
export const getListCustomersReceive = (payload) => ({
  type: TYPES.GET_LIST_CUSTOMERS_RECEIVE,
  payload,
});
//Get Customer Orders
export const getCustomerOrdersRequest = (payload) => ({
  type: TYPES.GET_CUSTOMER_ORDERS_REQUEST,
  payload,
});
export const getCustomerOrdersReceive = (payload) => ({
  type: TYPES.GET_CUSTOMER_ORDERS_RECEIVE,
  payload,
});
//Get Orders Statistics
export const getOrdersStatisticsRequest = (payload) => ({
  type: TYPES.GET_ORDERS_STATISTICS_REQUEST,
  payload,
});
export const getOrdersStatisticsReceive = (payload) => ({
  type: TYPES.GET_ORDERS_STATISTICS_RECEIVE,
  payload,
});