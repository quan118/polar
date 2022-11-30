import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
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

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const sagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const store = createStore(persistReducer(persistConfig, rootReducer), enhancer);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default store;
