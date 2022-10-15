import { takeLatest, put, select, call } from "redux-saga/effects";
import _ from "lodash";
import uuid from "react-uuid";
import { fetch } from "@tauri-apps/api/http";
import { Body } from "@tauri-apps/api/http";
import { readBinaryFile } from "@tauri-apps/api/fs";
import { SEND_REQUEST, updateCommonAction } from "../modules/common";
import { createResponseAction } from "../modules/response";
import { buildFetchConfig } from "@/utils/request";

function* handleSendRequest({ requestId }) {
  try {
    yield put(updateCommonAction({ sendingRequest: true }));
    const request = yield select((store) =>
      _.get(store, `collectionItem.byId.${requestId}`)
    );

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
