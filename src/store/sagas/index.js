import { fork } from "@redux-saga/core/effects";
import CommonSaga from "./common";
import CollectionItemSaga from "./collectionItem";
import EnvironmentSaga from "./environment";

export default function* rootSaga() {
  yield fork(CommonSaga);
  yield fork(CollectionItemSaga);
  yield fork(EnvironmentSaga);
}
