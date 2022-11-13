import { fork } from "@redux-saga/core/effects";
import CommonSaga from "./common";
import CollectionItemSaga from "./collectionItem";

export default function* rootSaga() {
  yield fork(CommonSaga);
  yield fork(CollectionItemSaga);
}
