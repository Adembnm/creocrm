import { axiosInstance } from "../../network";
//Orders
//Get Orders
export const getOrdersRequest = async (payload) => {
  return await axiosInstance.get(`api/orders`, { params: payload });
}
//Get Order
export const getOrderRequest = async (payload) => {
  return await axiosInstance.get(`api/orders/${payload}`);
}
//Create Order
export const createOrderRequest = async (payload) => {
  return await axiosInstance.post(`api/orders`, payload);
} 
//Update Order
export const updateOrderRequest = async (payload) => {
  return await axiosInstance.patch(`api/orders/${payload.id}`, payload);
}
//Delete Order
export const deleteOrderRequest = async (id) => {
  return await axiosInstance.delete(`api/orders/${id}`);
}
//Accept Order
export const acceptOrderRequest = async (payload) => {
  return await axiosInstance.put(`api/orders/${payload.id}/accept`, payload);
}
//Reject Order
export const rejectOrderRequest = async (payload) => {
  return await axiosInstance.put(`api/orders/${payload.id}/reject`, payload);
}
//List Customers
export const getListCustomersRequest = async () => {
  return await axiosInstance.get('api/customers/listNames');
}
//Get Customer Orders
export const getCustomerOrdersRequest = async (payload) => {
  return await axiosInstance.get(`api/orders/customer/${payload}`);
}
//Get Orders statistics
export const getOrdersStatisticsRequest = async (payload) => {
  return await axiosInstance.get(`api/orders/statistics`, { params: payload });
}