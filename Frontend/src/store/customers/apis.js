import { axiosInstance } from "../../network";

//Get Customers
export const getCustomersRequest = async (payload) => {
  return await axiosInstance.get(`api/customers`, { params: payload });
}
//Get Customer
export const getCustomerRequest = async (id) => {
  return await axiosInstance.get(`api/customers/${id}`);
}
//Add Customer
export const addCustomerRequest = async (payload) => {
  return await axiosInstance.post(`api/customers`, payload);
}
//Edit Customer
export const editCustomerRequest = async (payload) => {
  return await axiosInstance.patch(`api/customers/${payload.id}`, payload);
}
//Delete Customer
export const deleteCustomerRequest = async (id) => {
  return await axiosInstance.delete(`api/customers/${id}`);
}
//Get Customers Statistics
export const getCustomersStatisticsRequest = async (payload) => {
  return await axiosInstance.get(`api/customers/statistics`, { params: payload });
}
//Get Customers List
export const getCustomersListRequest = async (payload) => {
  return await axiosInstance.get(`api/customers/list`, { params: payload });
}
//Customer Change Status
export const customerChangeStatusRequest = async (payload) => {
  return await axiosInstance.patch(`api/customers/${payload.id}/change-status`, payload);
}
//Unpaid Customers list
export const getUnpaidCustomersRequest = async (payload) => {
  return await axiosInstance.get(`api/customers/unpaid`, { params: payload });
}
//send custom mail
export const sendCustomMail = async (payload) => {
  return await axiosInstance.post(`api/customers/sendMail`, payload);
}