import { all } from "redux-saga/effects";
import { authSagas } from "./auth/sagas";
import { usersSagas } from "./users/sagas";
import { customersSagas } from "./customers/sagas";
import { servicesSagas } from "./services/sagas";
import { ordersSagas } from "./orders/sagas";
import { paymentsSagas } from "./payments/sagas";
import { appointmentsSagas } from "./appointments/sagas";

export function* watchSagas() {
  yield all([
    authSagas(),
    usersSagas(),
    customersSagas(),
    servicesSagas(),
    ordersSagas(),
    paymentsSagas(),
    appointmentsSagas()
  ]);
}
