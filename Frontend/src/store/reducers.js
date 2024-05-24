import { combineReducers } from "redux";
import auth from "./auth/reducer";
import users from "./users/reducer";
import loader from "./loader/reducer";
import snackbar from "./snackbar/reducer";
import customers from "./customers/reducer";
import services from "./services/reducer";
import orders from "./orders/reducer";
import payments from "./payments/reducer";
import appointments from "./appointments/reducer";
export default combineReducers({
  snackbar,
  loader,
  auth,
  users,
  customers,
  services,
  orders,
  payments,
  appointments
});
