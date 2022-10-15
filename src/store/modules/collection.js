import { removeUndefinedKeys } from "@/utils/common";

export const CREATE_COLLECTION = "CREATE_COLLECTION";
export const DELETE_COLLECTION = "DELETE_COLLECTION";
export const UPDATE_COLLECTION = "UPDATE_COLLECTION";

const defaultState = {
  byId: {},
};

// const mockState = {
//   byId: {
//     c1: {
//       id: "c1",
//       name: "twitter",
//       type: "collection",
//       createdAt: "1663151889",
//       updatedAt: "1663151889",
//       icon: "twitter.svg",
//       items: ["t1", "t2"],
//     },
//   },
// };

export default function collectionReducer(state = defaultState, action) {
  switch (action.type) {
    case CREATE_COLLECTION: {
      const noId = !(action.payload.id.length > 0);
      const idExisted = !!state.byId[action.payload.id];
      if (noId || idExisted) return state;
      return {
        byId: {
          ...state.byId,
          [action.payload.id]: { ...action.payload, type: "collection" },
        },
      };
    }
    case DELETE_COLLECTION: {
      const noId = !(action.id.length > 0);
      if (noId) return state;
      delete state.byId[action.id];
      return {
        byId: {
          ...state.byId,
        },
      };
    }
    case UPDATE_COLLECTION: {
      const noId = !(action.id.length > 0);
      const idExisted = !!state.byId[action.id];
      if (noId || !idExisted) return state;
      removeUndefinedKeys(action.payload);

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
    default:
      return state;
  }
}

export const createCollectionAction = ({
  id,
  name,
  createdAt,
  updatedAt,
  icon,
  items,
}) => ({
  type: CREATE_COLLECTION,
  payload: {
    id,
    name,
    createdAt,
    updatedAt,
    icon,
    items,
  },
});

export const deleteCollectionAction = ({ id }) => ({
  type: DELETE_COLLECTION,
  id,
});

export const updateCollectionAction = ({
  id,
  name,
  createdAt,
  updatedAt,
  icon,
  items,
}) => ({
  type: UPDATE_COLLECTION,
  id,
  payload: {
    name,
    createdAt,
    updatedAt,
    icon,
    items,
  },
});
