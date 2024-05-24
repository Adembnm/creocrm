import { axiosInstance } from "../../network";
//Payments
//Get Payments
export const getPaymentsRequest = async (payload) => {
  return await axiosInstance.get(`api/payments`, { params: payload });
}
//Get Payment
export const getPaymentRequest = async (payload) => {
  return await axiosInstance.get(`api/payments/${payload}`);
}
//Create Payment
export const createPaymentRequest = async (payload) => {
  return await axiosInstance.post(`api/payments`, payload);
} 
//Update Payment
export const updatePaymentRequest = async (payload) => {
  return await axiosInstance.patch(`api/payments/${payload.id}`, payload);
}
//Delete Payment
export const deletePaymentRequest = async (id) => {
  return await axiosInstance.delete(`api/payments/${id}`);
}
//Refund Payment
export const refundPaymentRequest = async (payload) => {
  return await axiosInstance.post(`api/payments/refund`, payload);
}
