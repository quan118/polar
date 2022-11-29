import { applyMiddleware, createStore, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "remote-redux-devtools";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import * as reducers from "./modules";
import rootSaga from "./sagas";

const persistConfig = {
  key: "root",
  storage,
  timeout: 0,
  blacklist: ["response"],
};

const combinedReducers = combineReducers(reducers);

const rootReducer = (state, action) => combinedReducers(state, action);

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeWithDevTools({
  realtime: true,
  host: "localhost",
  port: 8000,
})(applyMiddleware(sagaMiddleware));

const store = createStore(persistReducer(persistConfig, rootReducer), enhancer);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default store;
