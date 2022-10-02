export const CREATE_COLLECTION_ITEM = "CREATE_COLLECTION_ITEM";
export const DELETE_COLLECTION_ITEM = "DELETE_COLLECTION_ITEM";
export const UPDATE_COLLECTION_ITEM = "UPDATE_COLLECTION_ITEM";
export const UPDATE_COLLECTION_ITEM_QUERY = "UPDATE_COLLECTION_ITEM_QUERY";
export const UPDATE_COLLECTION_ITEM_HEADER = "UPDATE_COLLECTION_ITEM_HEADER";
export const UPDATE_COLLECTION_ITEM_AUTH_KEY =
  "UPDATE_COLLECTION_ITEM_AUTH_KEY"; // update a key in auth object of a collection item
export const UPDATE_COLLECTION_ITEM_BODY_KEY =
  "UPDATE_COLLECTION_ITEM_BODY_KEY"; // update a key in body object of collection item
export const UPDATE_COLLECTION_ITEM_URL_KEY = "UPDATE_COLLECTION_ITEM_URL_KEY";

const defaultState = {
  byId: {
    drafts: {
      id: "drafts",
      type: "group",
      name: "drafts",
      items: ["draft0"],
    },
    draft0: {
      id: "draft0",
      type: "request",
      method: "GET",
    },
  },
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
//       body: {
//         mode: "raw", // raw | form-data | urlencoded | file
//         raw: "Hello work",
//         /*
//         formdata: [{key, value, type}],
//         urlencoded: [{key, value, type}],
//         file: {
//           src
//         },
//         */
//         options: {
//           raw: {
//             language: "json",
//           },
//         },
//       },
//       response: ["r1", "r2"],
//     },
//   },
// };

export default function collectionItemReducer(state = defaultState, action) {
  switch (action.type) {
    case CREATE_COLLECTION_ITEM: {
      const noId = !(action.payload.id.length > 0);
      const idExisted = !!state.byId[action.payload.id];
      if (noId || idExisted) return state;
      return {
        byId: {
          ...state.byId,
          [action.payload.id]: { ...action.payload },
        },
      };
    }
    case DELETE_COLLECTION_ITEM: {
      const noId = !(action.id.length > 0);
      if (noId) return state;
      delete state.byId[action.id];
      return {
        byId: {
          ...state.byId,
        },
      };
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
    default:
      return state;
  }
}

export const createCollectionItemAction = (payload) => ({
  type: CREATE_COLLECTION_ITEM,
  payload,
});

export const deleteCollectionItemAction = ({ id }) => ({
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
