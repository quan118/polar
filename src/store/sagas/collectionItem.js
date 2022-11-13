import { takeLatest, put, select } from "redux-saga/effects";
import { NEW_REQUEST_PAYLOAD } from "@/constants";
import {
  CREATE_NEW_REQUEST,
  DELETE_COLLECTION_ITEM,
  createRequestItemAction,
  updateCollectionItemByKeyPathLevel1,
  setCollectionItemByIdKey,
} from "../modules/collectionItem";
import {
  addTabAction,
  setCurrentTabAction,
  updateTabAction,
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
        ...collectionItemById[parentId].subGroups.filter(
          (item) => item !== groupId
        ),
      ],
      requests: [
        ...collectionItemById[parentId].requests.filter(
          (item) => item !== groupId
        ),
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

function* CollectionItemSaga() {
  yield takeLatest(CREATE_NEW_REQUEST, handleCreateNewRequest);
  yield takeLatest(DELETE_COLLECTION_ITEM, handleDeleteCollectionItem);
}

export default CollectionItemSaga;
