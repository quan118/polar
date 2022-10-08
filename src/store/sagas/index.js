import { fork } from "@redux-saga/core/effects";
import CommonSaga from "./common";

export default function* rootSaga() {
  yield fork(CommonSaga);
}
