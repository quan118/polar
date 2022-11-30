import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import * as reducers from "./modules";
import rootSaga from "./sagas";
import { createLogger } from "redux-logger";

const DEBUG = import.meta.env.TAURI_DEBUG;

const logger = createLogger({
  diff: true,
  duration: true,
});

const persistConfig = {
  key: "root",
  storage,
  timeout: 0,
  blacklist: ["response"],
};

const combinedReducers = combineReducers(reducers);

const rootReducer = (state, action) => combinedReducers(state, action);

const sagaMiddleware = createSagaMiddleware();

let middlewares = [sagaMiddleware];

if (DEBUG) {
  middlewares = [...middlewares, logger];
}

const enhancer = compose(applyMiddleware(...middlewares));

const store = createStore(persistReducer(persistConfig, rootReducer), enhancer);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default store;
