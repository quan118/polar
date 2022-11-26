import { REHYDRATE } from "redux-persist";
export const CREATE_COLLECTION_ITEM = "CREATE_COLLECTION_ITEM";
export const CREATE_REQUEST_ITEM = "CREATE_REQUEST_ITEM";
export const SET_COLLECTION_ITEM_BY_ID_KEY = "SET_COLLECTION_ITEM_BY_ID_KEY";
export const UPDATE_COLLECTION_ITEM = "UPDATE_COLLECTION_ITEM";
export const UPDATE_COLLECTION_ITEM_QUERY = "UPDATE_COLLECTION_ITEM_QUERY";
export const UPDATE_COLLECTION_ITEM_HEADER = "UPDATE_COLLECTION_ITEM_HEADER";
export const UPDATE_COLLECTION_ITEM_AUTH_KEY =
  "UPDATE_COLLECTION_ITEM_AUTH_KEY"; // update a key in auth object of a collection item
export const UPDATE_COLLECTION_ITEM_BODY_KEY =
  "UPDATE_COLLECTION_ITEM_BODY_KEY"; // update a key in body object of collection item
export const UPDATE_COLLECTION_ITEM_URL_KEY = "UPDATE_COLLECTION_ITEM_URL_KEY";

export const UPDATE_COLLECTION_ITEM_BY_KEY_PATH_LEVEL_1 =
  "UPDATE_COLLECTION_ITEM_BY_KEY_PATH_LEVEL_1";

export const SET_EDIT_ITEM_ID = "SET_EDIT_ITEM_ID";

export const SAVE_REQUEST = "SAVE_REQUEST";

export const ADD_MULTIPLE_COLLECTION_ITEMS = "ADD_MULTIPLE_COLLECTION_ITEMS";

// actions handled by sagas
export const CREATE_NEW_REQUEST = "CREATE_NEW_REQUEST";
export const DELETE_COLLECTION_ITEM = "DELETE_COLLECTION_ITEM";
export const IMPORT_COLLECTION = "IMPORT_COLLECTION";

const defaultState = {
  byId: {
    drafts: {
      id: "drafts",
      type: "group",
      name: "drafts",
      subGroups: [],
      requests: [],
      //expanded: true,
      // items: ["draft0"],
      // collapse: true | false
    },
    // "draft-req0": {
    //   id: "draft-req0",
    //   type: "request",
    //   method: "GET",
    //   name: "Untitled Request",
    //   parentId: "drafts",
    //   header: [
    //     {
    //       id: "0",
    //       key: "",
    //       value: "",
    //       enabled: true,
    //     },
    //   ],
    //   url: {
    //     raw: "",
    //     protocol: "http",
    //     host: ["httpbin", "org"],
    //     path: ["get"],
    //     query: [
    //       {
    //         id: "0",
    //         key: "",
    //         value: "",
    //         enabled: true,
    //       },
    //     ],
    //   },
    //   body: {
    //     // mode: "raw", // raw | form-data | urlencoded | file
    //     raw: "",
    //     formdata: [
    //       {
    //         id: "0",
    //         key: "",
    //         value: "",
    //         enabled: true,
    //       },
    //     ],
    //     urlencoded: [
    //       {
    //         id: "0",
    //         key: "",
    //         value: "",
    //         enabled: true,
    //       },
    //     ],
    //     /*file: {
    //       src
    //     },
    //     */
    //     options: {
    //       raw: {
    //         language: "json",
    //       },
    //     },
    //   },
    // },
  },
  editItemId: "",
};

// const mockState = {
//   byId: {
//     t1: {
//       id: "t1",
//       type: "group", // group | request
//       name: "session",
//       createdAt: "1663151889",
//       updatedAt: "1663151889",
//       items: ["t2", "t3"],
//     },
//     t2: {
//       id: "t2",
//       type: "request",
//       name: "login",
//       method: "POST",
//       header: [
//         {
//           key: "Content-Type",
//           value: "application/json",
//         },
//       ],
//       url: {
//         raw: "http://httpbin.org/get?key1=value1&key2=value2",
//         protocol: "http",
//         host: ["httpbin", "org"],
//         path: ["get"],
//         query: [
//           {
//             key: "key1",
//             value: "value1",
//           },
//           {
//             key: "key2",
//             value: "value2",
//           },
//         ],
//       },
//       auth: {
//         type: "basic", // basic | bearer | apikey
//         basic: {
//            username: 'quan',
//            password: 'abc123'
//         },
//         /*
//         bearer: 'jsontoken',
//         apikey: {
//           in: 'query',
//           key: 'api-key',
//           value: 'abc123',
//         }

//         */
//       },
// body: {
//   mode: "raw", // raw | form-data | urlencoded | file
//   raw: "Hello work",
//   /*
//   formdata: [{key, value, type}],
//   urlencoded: [{key, value, type}],
//   file: {
//     src
//   },
//   */
//   options: {
//     raw: {
//       language: "json",
//     },
//   },
// },
//       response: ["r1", "r2"],
//     },
//   },
// };

export const deleteSubGroup = (collectionItemById, groupId) => {
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

export default function collectionItemReducer(state = defaultState, action) {
  switch (action.type) {
    case REHYDRATE: {
      return {
        ...state,
        ...action?.payload?.collectionItem,
      };
    }
    case CREATE_COLLECTION_ITEM: {
      const noId = !(action.payload.id.length > 0);
      const idExisted = !!state.byId[action.payload.id];
      if (noId || idExisted) return state;

      const byId = {
        ...state.byId,
        [action.payload.id]: { ...action.payload },
      };

      if (action.parentId?.length > 0) {
        byId[action.parentId] = {
          ...state.byId[action.parentId],
          subGroups: [
            ...state.byId[action.parentId].subGroups,
            action.payload.id,
          ],
        };
      }

      return { byId };
    }

    case CREATE_REQUEST_ITEM: {
      const noId = !(action.payload.id.length > 0);
      const idExisted = !!state.byId[action.payload.id];
      if (noId || idExisted) return state;

      const byId = {
        ...state.byId,
        [action.payload.id]: { ...action.payload },
      };

      if (action.parentId?.length > 0) {
        byId[action.parentId] = {
          ...state.byId[action.parentId],
          requests: [
            ...state.byId[action.parentId].requests,
            action.payload.id,
          ],
        };
      }

      return { byId };
    }

    case UPDATE_COLLECTION_ITEM: {
      const noId = !(action.id.length > 0);
      const idExisted = !!state.byId[action.id];
      if (noId || !idExisted) return state;

      return {
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            ...action.payload,
          },
        },
      };
    }
    case UPDATE_COLLECTION_ITEM_QUERY: {
      const noId = !(action.id.length > 0);
      const idExisted = !!state.byId[action.id];
      if (noId || !idExisted) return state;

      return {
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            url: {
              ...state.byId[action.id].url,
              query: action.payload,
            },
          },
        },
      };
    }
    case UPDATE_COLLECTION_ITEM_HEADER: {
      const noId = !(action.id.length > 0);
      const idExisted = !!state.byId[action.id];
      if (noId || !idExisted) return state;

      return {
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            header: action.payload,
          },
        },
      };
    }
    case UPDATE_COLLECTION_ITEM_AUTH_KEY: {
      const noId = !(action.id.length > 0);
      const idExisted = !!state.byId[action.id];
      if (noId || !idExisted) return state;

      return {
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            auth: {
              ...state.byId[action.id].auth,
              [action.key]: action.payload,
            },
          },
        },
      };
    }
    case UPDATE_COLLECTION_ITEM_BODY_KEY: {
      const noId = !(action.id.length > 0);
      const idExisted = !!state.byId[action.id];
      if (noId || !idExisted) return state;

      return {
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            body: {
              ...state.byId[action.id].body,
              [action.key]: action.payload,
            },
          },
        },
      };
    }
    case UPDATE_COLLECTION_ITEM_URL_KEY: {
      const noId = !(action.id.length > 0);
      const idExisted = !!state.byId[action.id];
      if (noId || !idExisted) return state;

      return {
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            url: {
              ...state.byId[action.id].url,
              [action.key]: action.payload,
            },
          },
        },
      };
    }
    case UPDATE_COLLECTION_ITEM_BY_KEY_PATH_LEVEL_1: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            [action.key]: action.payload,
          },
        },
      };
    }

    case SET_EDIT_ITEM_ID: {
      return {
        ...state,
        editItemId: action.editItemId,
      };
    }
    case SAVE_REQUEST: {
      const byId = state.byId;

      // syncing collection items
      Object.keys(action.dirties).forEach((id) => {
        if (action.dirties[id] === "rename") {
          byId[id].name = action.data[id].name;
        } else if (action.dirties[id] === "new") {
          byId[id] = { ...action.data[id] };
        }
      });

      byId[action.requestId] = { ...action.tab };
      byId[action.requestId].name = action.requestName;
      byId[action.requestId].parentId = action.parentId;

      // save request

      if (action.parentId !== action.tab.parentId) {
        if (Array.isArray(byId[action.parentId].requests)) {
          byId[action.parentId].requests.push(action.requestId);
        } else {
          byId[action.parentId].requests = [action.requestId];
        }

        byId[action.tab.parentId].requests = byId[
          action.tab.parentId
        ].requests.filter((id) => id !== action.requestId);
      }

      return { ...state, byId: { ...byId } };
    }
    case SET_COLLECTION_ITEM_BY_ID_KEY: {
      return {
        ...state,
        byId: action.payload,
      };
    }
    case ADD_MULTIPLE_COLLECTION_ITEMS: {
      return {
        ...state,
        byId: {
          ...state.byId,
          ...action.payload,
        },
      };
    }
    default:
      return state;
  }
}

export const createCollectionItemAction = (payload, parentId) => ({
  type: CREATE_COLLECTION_ITEM,
  parentId,
  payload,
});

export const createRequestItemAction = (payload, parentId) => ({
  type: CREATE_REQUEST_ITEM,
  parentId,
  payload,
});

export const deleteCollectionItemAction = (id) => ({
  type: DELETE_COLLECTION_ITEM,
  id,
});

export const updateCollectionItemAction = (id, payload) => ({
  type: UPDATE_COLLECTION_ITEM,
  id,
  payload,
});

export const updateCollectionItemQueryAction = (id, payload) => ({
  type: UPDATE_COLLECTION_ITEM_QUERY,
  id,
  payload,
});

export const updateCollectionItemHeaderAction = (id, payload) => ({
  type: UPDATE_COLLECTION_ITEM_HEADER,
  id,
  payload,
});

export const updateCollectionItemAuthKeyAction = (id, key, payload) => ({
  type: UPDATE_COLLECTION_ITEM_AUTH_KEY,
  id,
  key,
  payload,
});

export const updateCollectionItemBodyKeyAction = (id, key, payload) => ({
  type: UPDATE_COLLECTION_ITEM_BODY_KEY,
  id,
  key,
  payload,
});

export const updateCollectionItemUrlKeyAction = (id, key, payload) => ({
  type: UPDATE_COLLECTION_ITEM_URL_KEY,
  id,
  key,
  payload,
});

export const setEditItemIdAction = (itemId) => ({
  type: SET_EDIT_ITEM_ID,
  editItemId: itemId,
});

export const createNewRequestAction = (requestId, requestName, parentId) => ({
  type: CREATE_NEW_REQUEST,
  requestId,
  requestName,
  parentId,
});

export const saveRequestAction = (
  requestId,
  requestName,
  parentId,
  dirties,
  data,
  tab
) => ({
  type: SAVE_REQUEST,
  requestId,
  requestName,
  parentId,
  dirties,
  data,
  tab,
});

export const updateCollectionItemByKeyPathLevel1 = (id, key, payload) => ({
  type: UPDATE_COLLECTION_ITEM_BY_KEY_PATH_LEVEL_1,
  id,
  key,
  payload,
});

export const setCollectionItemByIdKey = (payload) => ({
  type: SET_COLLECTION_ITEM_BY_ID_KEY,
  payload,
});

export const importCollectionAction = (filepath) => ({
  type: IMPORT_COLLECTION,
  filepath,
});

export const addMultipleCollectionItemsAction = (payload) => ({
  type: ADD_MULTIPLE_COLLECTION_ITEMS,
  payload,
});
