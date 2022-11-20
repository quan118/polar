import { takeLatest, put, select } from "redux-saga/effects";
import {
  DELETE_ALL_VARS_OF_ENV,
  DELETE_ENV_VAR,
  DELETE_ENV_AND_RELATED_VARS,
  setEnvPropertyLevel1Action,
  deleteEnvAction,
} from "@/store/modules/environment";
import {
  deleteVariablesAction,
  deleteVariableAction,
} from "@/store/modules/variable";

function* handleDeleteAllVarsOfEnv({ id }) {
  try {
    const variables = yield select(
      (store) => store.environment.byId[id]?.variables
    );
    yield put(setEnvPropertyLevel1Action(id, "variables", []));
    yield put(deleteVariablesAction(variables));
  } catch (error) {
    console.log(error);
  }
}

function* handleDeleteEnvVar({ varId }) {
  try {
    const envId = yield select(
      (store) => store.variable.byId[varId]?.environmentId
    );
    const envVars = yield select(
      (store) => store.environment.byId[envId]?.variables
    );
    yield put(
      setEnvPropertyLevel1Action(
        envId,
        "variables",
        envVars.filter((id) => id !== envId)
      )
    );
    yield put(deleteVariableAction(varId));
  } catch (error) {
    console.log(error);
  }
}

function* handleDeleteEnvAndRelatedVars({ id }) {
  try {
    const variables = yield select(
      (store) => store.environment.byId[id]?.variables
    );
    yield put(deleteEnvAction(id));
    yield put(deleteVariablesAction(variables));
  } catch (error) {
    console.log(error);
  }
}

function* EnvironmentSaga() {
  yield takeLatest(DELETE_ALL_VARS_OF_ENV, handleDeleteAllVarsOfEnv);
  yield takeLatest(DELETE_ENV_VAR, handleDeleteEnvVar);
  yield takeLatest(DELETE_ENV_AND_RELATED_VARS, handleDeleteEnvAndRelatedVars);
}

export default EnvironmentSaga;
