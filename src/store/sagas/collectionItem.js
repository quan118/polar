import { takeLatest, put, select, call } from "redux-saga/effects";
import { readTextFile } from "@tauri-apps/api/fs";
import uuid from "react-uuid";
import { Collection } from "postman-collection";
import { NEW_REQUEST_PAYLOAD } from "@/constants";
import {
  CREATE_NEW_REQUEST,
  DELETE_COLLECTION_ITEM,
  SAVE_REQUEST_TO_COLLECTION,
  createRequestItemAction,
  updateCollectionItemByKeyPathLevel1,
  setCollectionItemByIdKey,
  IMPORT_COLLECTION,
  addMultipleCollectionItemsAction,
  saveRequestAction,
  SELECT_REQUEST,
} from "../modules/collectionItem";
import {
  addTabAction,
  setCurrentTabAction,
  updateTabAction,
  updateTabByIdAction,
} from "../modules/tab";
import { setCurrentRequestIdAction } from "../modules/common";

function* handleCreateNewRequest({ requestId, requestName, parentId }) {
  try {
    // update collectionItem
    const payload = {
      ...NEW_REQUEST_PAYLOAD,
      id: requestId,
      name: requestName,
      parentId,
    };

    yield put(createRequestItemAction(payload, parentId));

    // add a tab
    yield put(addTabAction(payload));

    //
    yield put(setCurrentRequestIdAction(requestId));

    yield put(setCurrentTabAction(requestId));

    yield put(updateCollectionItemByKeyPathLevel1(parentId, "expanded", true));
    // if (parentId !== "drafts") {
    //   yield put(updateCollectionItemCollapseKey(parentId, true));
    //   yield put(setEditItemIdAction(requestId));
    // }
  } catch (error) {
    console.log("error:", error);
    // alert("something wrong");
    // dialog()
  }
}

const deleteSubGroup = (collectionItemById, groupId) => {
  const noId = groupId;
  if (!noId) return collectionItemById;
  // delete requests
  collectionItemById[groupId]?.requests?.forEach((requestId) => {
    delete collectionItemById[requestId];
  });

  // delete sub groups
  collectionItemById[groupId]?.subGroups?.forEach((g) => {
    deleteSubGroup(collectionItemById, g);
  });

  // delete parent
  const parentId = collectionItemById[groupId]?.parentId;
  if (parentId) {
    collectionItemById[parentId] = {
      ...collectionItemById[parentId],
      subGroups: [
        ...(Array.isArray(collectionItemById[parentId].subGroups)
          ? collectionItemById[parentId].subGroups.filter(
              (item) => item !== groupId
            )
          : []),
      ],
      requests: [
        ...(Array.isArray(collectionItemById[parentId].requests)
          ? collectionItemById[parentId].requests.filter(
              (item) => item !== groupId
            )
          : []),
      ],
    };
  }
  // delete itself
  delete collectionItemById[groupId];
  return collectionItemById;
};

function* handleDeleteCollectionItem({ id }) {
  try {
    const collectionItemById = yield select(
      (store) => store.collectionItem.byId
    );
    const parentId = collectionItemById[id]?.parentId;

    // delete requests
    collectionItemById[id]?.requests?.forEach(
      (reqId) => delete collectionItemById[reqId]
    );

    // delete sub groups
    collectionItemById[id]?.subGroups?.forEach((groupId) =>
      deleteSubGroup(collectionItemById, groupId)
    );

    // update parent
    if (parentId) {
      collectionItemById[parentId] = {
        ...collectionItemById[parentId],
        subGroups: [
          ...collectionItemById[parentId].subGroups.filter(
            (itemId) => itemId != id
          ),
        ],
        requests: [
          ...collectionItemById[parentId].requests.filter(
            (itemId) => itemId != id
          ),
        ],
      };
    }

    // delete itself
    delete collectionItemById[id];

    // update tab
    const tabById = yield select((store) => store.tab.byId);
    let tabByArrayIds = yield select((store) => store.tab.byArrayIds);
    const nonExistedIds = [];

    tabByArrayIds.forEach((reqId) => {
      if (!collectionItemById[reqId]) {
        nonExistedIds.push(reqId);
      }
    });

    nonExistedIds.forEach((reqId) => delete tabById[reqId]);

    tabByArrayIds = tabByArrayIds.filter(
      (reqId) => !nonExistedIds.includes(reqId)
    );

    let currentTabId = yield select((store) => store.tab.currentTabId);
    if (tabByArrayIds.indexOf(currentTabId) < 0) {
      if (tabByArrayIds.length > 0) {
        currentTabId = tabByArrayIds[tabByArrayIds.length - 1];
      } else {
        currentTabId = undefined;
      }
    }

    yield put(
      updateTabAction({
        byId: tabById,
        byArrayIds: tabByArrayIds,
        currentTabId,
      })
    );

    // update current request id
    yield put(setCurrentRequestIdAction(currentTabId));

    // apply changes to collectionItem
    yield put(setCollectionItemByIdKey({ ...collectionItemById }));
  } catch (error) {
    console.log(error);
  }
}

const handleImportRequest = (item, parent, payload) => {
  payload[parent.id].requests.push(item.id);
  payload[item.id] = {
    id: item.id,
    type: "request",
    method: item.request.method,
    name: item.name,
    parentId: parent.id,
  };
  const request = item.request;
  // header
  if (request.headers) {
    payload[item.id].header = request.headers.map((e) => ({
      id: uuid(),
      key: e.key,
      value: e.value,
      enabled: !e.disabled,
    }));
  }
  // url
  if (request.url) {
    payload[item.id].url = {
      raw: `${
        request.url.protocol
      }://${request.url.getRemote()}/${request.url.getPath(true)}`,
      query: request.url.query.map((e) => ({
        id: uuid(),
        key: e.key,
        value: e.value,
        enabled: !e.disabled,
      })),
    };
  }

  // auth
  if (
    request.auth &&
    ["basic", "bearer", "apikey"].includes(request.auth.type)
  ) {
    payload[item.id].auth = {
      type: request.auth.type,
    };

    if (request.auth.type === "basic") {
      payload[item.id].auth.basic = {
        username: request.auth.parameters().find((e) => e.key === "username")
          ?.value,
        password: request.auth.parameters().find((e) => e.key === "password")
          ?.value,
      };
    } else if (request.auth.type === "bearer") {
      payload[item.id].auth.bearer = request.auth
        .parameters()
        .find((e) => e.key === "token").value;
    } else if (request.auth.type === "apikey") {
      payload[item.id].auth.apikey = {
        key: request.auth.apikey.find((e) => e.key === "key")?.value,
        value: request.auth.apikey.find((e) => e.key === "value")?.value,
      };

      if (request.auth.apikey.find((e) => e.key === "in")?.value === "query") {
        payload[item.id].auth.apikey.in = "query";
      }
    }
  }

  // body
  if (request.body) {
    payload[item.id].body = {
      mode: request.body.mode,
    };

    if (request.body.raw) {
      payload[item.id].body.raw = request.body.raw;
    }

    // formdata
    if (request.body.formdata) {
      payload[item.id].body.formdata = request.body.formdata.map((e) => ({
        id: uuid(),
        key: e.key,
        value: e.value,
        enabled: !e.disabled,
      }));
    }

    // urlencoded
    if (request.body.urlencoded) {
      payload[item.id].body.urlencoded = request.body.urlencoded.map((e) => ({
        id: uuid(),
        key: e.key,
        value: e.value,
        enabled: !e.disabled,
      }));
    }

    // file
    if (request.body.file) {
      payload[item.id].body.file = request.body.file;
    }

    // options
    if (request.body.options) {
      payload[item.id].body.optionsn = request.body.options;
    }
  }

  return payload;
};

const handleImportGroup = (group, parent, payload) => {
  payload[group.id] = {
    id: group.id,
    type: "group",
    name: group.name,
    requests: [],
    subGroups: [],
    parentId: parent.id,
  };
  payload[parent.id].subGroups.push(group.id);
  group.items.each((item) => {
    if (item.request) {
      payload = handleImportRequest(item, group, payload);
    } else {
      payload = handleImportGroup(item, group, payload);
    }
  });

  return payload;
};

function* handleImportCollection({ filepath }) {
  try {
    const data = yield call(readTextFile, filepath);
    const collection = new Collection(JSON.parse(data));

    let payload = {
      [collection.id]: {
        id: collection.id,
        type: "group",
        name: collection.name,
        requests: [],
        subGroups: [],
      },
    };

    collection.items.each((item) => {
      if (item.request) {
        payload = handleImportRequest(item, collection, payload);
      } else {
        payload = handleImportGroup(item, collection, payload);
      }
    });

    yield put(addMultipleCollectionItemsAction(payload));
  } catch (e) {
    console.log(e);
  }
}

function* handleSaveRequestToCollection({
  requestId,
  requestName,
  parentId,
  dirties,
  localState,
  tab,
  saveAs,
}) {
  try {
    yield put(
      saveRequestAction(
        requestId,
        requestName,
        parentId,
        dirties,
        localState,
        tab,
        saveAs
      )
    );

    if (saveAs) {
      yield handleSelectRequest({ requestId });
    } else {
      yield put(
        updateTabByIdAction(requestId, { parentId, name: requestName })
      );
    }

    yield put(updateCollectionItemByKeyPathLevel1(parentId, "expanded", true));
  } catch (e) {
    console.log(e);
  }
}

function* handleSelectRequest({ requestId }) {
  try {
    yield put(setCurrentRequestIdAction(requestId));

    const request = yield select(
      (store) => store.collectionItem.byId[requestId]
    );
    yield put(addTabAction(request));

    yield put(setCurrentTabAction(requestId));
  } catch (e) {
    console.log(e);
  }
}

function* CollectionItemSaga() {
  yield takeLatest(CREATE_NEW_REQUEST, handleCreateNewRequest);
  yield takeLatest(DELETE_COLLECTION_ITEM, handleDeleteCollectionItem);
  yield takeLatest(IMPORT_COLLECTION, handleImportCollection);
  yield takeLatest(SAVE_REQUEST_TO_COLLECTION, handleSaveRequestToCollection);
  yield takeLatest(SELECT_REQUEST, handleSelectRequest);
}

export default CollectionItemSaga;
