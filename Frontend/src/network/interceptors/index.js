import store from "../../store";
import { handleLoader } from "../../store/loader/actions";

export const isHandlerEnabled = (config = {}) => {
  return config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled
    ? false
    : true;
};

export const requestHandler = request => {
  if (isHandlerEnabled(request)) {
    store.dispatch(handleLoader(true));
  }
  return request;
};

export const successHandler = response => {
  if (isHandlerEnabled(response)) {
    store.dispatch(handleLoader(false));
  }
  return response;
};

export const errorHandler = error => {
  if (isHandlerEnabled(error.config)) {
    store.dispatch(handleLoader(false));
  }
  return Promise.reject({ ...error });
};
