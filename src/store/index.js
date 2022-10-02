import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import * as reducers from "./modules";
import rootSaga from "./sagas";

const combinedReducers = combineReducers(reducers);

const rootReducer = (state, action) => combinedReducers(state, action);

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const sagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
