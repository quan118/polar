import { takeLatest, put, select, call } from "redux-saga/effects";
import _ from "lodash";
import uuid from "react-uuid";
import { fetch } from "@tauri-apps/api/http";
import { Body } from "@tauri-apps/api/http";
import { readBinaryFile } from "@tauri-apps/api/fs";
import { SEND_REQUEST, updateCommonAction } from "../modules/common";
import { createResponseAction } from "../modules/response";
import { buildFetchConfig, processVariables } from "@/utils/request";

const buildNameToVariablesMapping = (
  variables,
  environment,
  variablesByName
) => {
  const output = { ...variablesByName };
  environment?.variables?.forEach((varId) => {
    const varName = variables[varId].name;
    if (Array.isArray(output[varName])) {
      output[varName].push(variables[varId]);
    } else {
      output[varName] = [variables[varId]];
    }
  });

  return output;
};

function* handleSendRequest({ requestId }) {
  try {
    yield put(updateCommonAction({ sendingRequest: true }));

    // build variables mapping
    const currentEnvId = yield select((store) => store.common.currentEnvId);
    const variables = yield select((store) => store.variable.byId);
    let nameToVariables = {};
    if (currentEnvId) {
      const currentEnv = yield select(
        (store) => store.environment.byId[currentEnvId]
      );
      nameToVariables = buildNameToVariablesMapping(
        variables,
        currentEnv,
        nameToVariables
      );
    }

    if (currentEnvId !== "global") {
      const globalEnv = yield select((store) => store.environment.byId.global);
      nameToVariables = buildNameToVariablesMapping(
        variables,
        globalEnv,
        nameToVariables
      );
    }

    console.log("name to variables");
    console.log(nameToVariables);

    //
    let request = yield select((store) =>
      _.get(store, `tab.byId.${requestId}`)
    );

    console.log("request before process variables:");
    console.log(request);

    request = processVariables(request, nameToVariables);

    console.log("request after process variables:");
    console.log(request);

    // prepend https if needed
    // const tokens = request.url.raw.split("//");
    // if (tokens.length < 2 || !tokens[0].toLowerCase().startsWith("http")) {
    //   yield put(
    //     updateTabItemByKeyPathLevel2Action(
    //       requestId,
    //       "url",
    //       "raw",
    //       "https://" + request.url.raw
    //     )
    //   );

    //   request = yield select((store) => _.get(store, `tab.byId.${requestId}`));
    // }

    const fetchConfig = buildFetchConfig(request);

    if (fetchConfig.body?.type === "File") {
      const contents = yield call(
        readBinaryFile,
        fetchConfig.body.payload.file
      );
      fetchConfig.body = Body.bytes(contents);
    }

    const response = yield call(fetch, fetchConfig.url, fetchConfig);
    const responseId = uuid();

    yield put(
      createResponseAction({
        id: responseId,
        requestId,
        name: "",
        originalRequest: {}, // TODO: Update this field
        status: `${response.status} ${response.ok ? "OK" : ""}`,
        code: response.status,
        header: Object.keys(response.headers).map((key) => ({
          [key]: response.headers[key],
        })),
        cookie: [],
        body: response.data,
      })
    );

    yield put(
      updateCommonAction({
        responseId,
        responseStatus: "success",
      })
    );
  } catch (error) {
    console.log("handleSendRequest exception");
    console.log(error);

    updateCommonAction({
      responseStatus: "failed",
    });
  } finally {
    yield put(updateCommonAction({ sendingRequest: false }));
  }
}

function* CommonSaga() {
  yield takeLatest(SEND_REQUEST, handleSendRequest);
  // yield takeLatest(GET_APP_VERSION, handleGetAppVersion);
  // yield takeLatest(UPLOAD_LOG_TO_APPCENTER, handleUploadLogAppCenter);
}

export default CommonSaga;
