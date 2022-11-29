import { REHYDRATE } from "redux-persist";

export const ADD_TAB = "ADD_TAB";
export const DELETE_TAB = "DELETE_TAB";
export const UPDATE_TAB = "UPDATE_TAB";
export const SYNC_TAB = "SYNC_TAB";

export const SET_CURRENT_TAB = "SET_CURRENT_TAB";
export const UPDATE_TAB_BY_ID = "UPDATE_TAB_BY_ID";
export const UPDATE_TAB_URL_KEY = "UPDATE_TAB_URL_KEY";
export const UPDATE_TAB_DIRTY_KEY = "UPDATE_TAB_DIRTY_KEY";
export const UPDATE_TAB_ITEM_BY_KEY_PATH_LEVEL_1 =
  "UPDATE_TAB_ITEM_BY_KEY_PATH_LEVEL_1";
export const UPDATE_TAB_ITEM_BY_KEY_PATH_LEVEL_2 =
  "UPDATE_TAB_ITEM_BY_KEY_PATH_LEVEL_2";

const defaultState = {
  byId: {},
  byArrayIds: [],
  // byArray: [],
  // currentTabId: "draft-req0",
};

export default function tabReducer(state = defaultState, action) {
  switch (action.type) {
    case REHYDRATE: {
      return {
        ...state,
        ...action?.payload?.tab,
      };
    }
    case ADD_TAB: {
      const noId = !(action.payload.id.length > 0);
      const idExisted = !!state.byId[action.payload.id];

      if (noId || idExisted) return state;

      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: { ...action.payload },
        },
        byArrayIds: [...state.byArrayIds, action.payload.id],
      };
    }

    case DELETE_TAB: {
      const newArrayIds = state.byArrayIds.filter((id) => id !== action.id);
      delete state.byId[action.id];
      return { ...state, byArrayIds: newArrayIds };
    }

    case SYNC_TAB: {
      const byId = state.byId;
      let byArrayIds = state.byArrayIds;
      const nonExistedIds = [];
      byArrayIds.forEach((id) => {
        if (!action.payload[id]) {
          nonExistedIds.push(id);
        }
      });

      nonExistedIds.forEach((id) => delete byId[id]);
      byArrayIds = byArrayIds.filter((id) => !nonExistedIds.includes(id));

      return {
        ...state,
        byId,
        byArrayIds,
      };
    }

    case UPDATE_TAB: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case SET_CURRENT_TAB: {
      return {
        ...state,
        currentTabId: action.tabId,
      };
    }
    case UPDATE_TAB_BY_ID: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            ...action.payload,
            dirty: action.dirty,
          },
        },
      };
    }
    case UPDATE_TAB_URL_KEY: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            url: {
              ...state.byId[action.id].url,
              [action.key]: action.payload,
            },
            dirty: action.dirty,
          },
        },
      };
    }
    case UPDATE_TAB_DIRTY_KEY: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            dirty: action.dirty,
          },
        },
      };
    }
    case UPDATE_TAB_ITEM_BY_KEY_PATH_LEVEL_1: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            [action.key]: action.payload,
            dirty: action.dirty,
          },
        },
      };
    }
    case UPDATE_TAB_ITEM_BY_KEY_PATH_LEVEL_2: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            [action.key1]: {
              ...state.byId[action.id][action.key1],
              [action.key2]: action.payload,
            },
            dirty: action.dirty,
          },
        },
      };
    }
    default:
      return state;
  }
}

export const addTabAction = (payload) => ({
  type: ADD_TAB,
  payload,
});

export const deleteTabAction = (id) => ({
  type: DELETE_TAB,
  id,
});

export const updateTabAction = (payload) => ({
  type: UPDATE_TAB,
  payload,
});

export const syncTabAction = (payload) => ({
  type: SYNC_TAB,
  payload,
});

export const setCurrentTabAction = (tabId) => ({
  type: SET_CURRENT_TAB,
  tabId,
});

export const updateTabByIdAction = (id, payload, dirty = true) => ({
  type: UPDATE_TAB_BY_ID,
  id,
  payload,
  dirty,
});

export const updateTabUrlKeyAction = (id, key, payload, dirty = true) => ({
  type: UPDATE_TAB_URL_KEY,
  id,
  key,
  payload,
  dirty,
});

export const updateTabDirtyKeyAction = (id, dirty) => ({
  type: UPDATE_TAB_DIRTY_KEY,
  id,
  dirty,
});

export const updateTabItemByKeyPathLevel1Action = (
  id,
  key,
  payload,
  dirty = true
) => ({
  type: UPDATE_TAB_ITEM_BY_KEY_PATH_LEVEL_1,
  id,
  key,
  payload,
  dirty,
});

export const updateTabItemByKeyPathLevel2Action = (
  id,
  key1,
  key2,
  payload,
  dirty = true
) => ({
  type: UPDATE_TAB_ITEM_BY_KEY_PATH_LEVEL_2,
  id,
  key1,
  key2,
  payload,
  dirty,
});
