import { REHYDRATE } from "redux-persist";

export const UPDATE_COMMON = "UPDATE_COMMON";
export const SEND_REQUEST = "SEND_REQUEST";
export const CURRENT_REQUEST_ID = "CURRENT_REQUEST_ID";
export const EDIT_ITEM_ID = "EDIT_ITEM_ID";
export const CURRENT_LIB_ID = "CURRENT_LIB_ID";
export const CURRENT_ENV_ID = "CURRENT_ENV_ID";
export const EDIT_ENV_ID = "EDIT_ENV_ID";

const defaultState = {
  sendingRequest: false,
  responseId: undefined,
  responseStatus: undefined, // success | failed | undefined
  currentRequestId: "draft0", // current requestId
  editItemId: "",
  currentLibId: "1",
  currentEnvId: "global",
  editEnvId: "",
};

export default function commonReducer(state = defaultState, action) {
  switch (action.type) {
    case REHYDRATE: {
      return {
        ...state,
        ...action?.payload?.common,
      };
    }
    case UPDATE_COMMON: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case CURRENT_REQUEST_ID: {
      return {
        ...state,
        currentRequestId: action.currentRequestId,
      };
    }
    case CURRENT_LIB_ID: {
      return {
        ...state,
        currentLibId: action.currentLibId,
      };
    }
    case EDIT_ITEM_ID: {
      return {
        ...state,
        editItemId: action.editItemId,
      };
    }
    case CURRENT_ENV_ID: {
      return {
        ...state,
        currentEnvId: action.currentEnvId,
      };
    }
    case EDIT_ENV_ID: {
      return {
        ...state,
        editEnvId: action.editEnvId,
      };
    }

    default:
      return state;
  }
}

export const updateCommonAction = (payload) => ({
  type: UPDATE_COMMON,
  payload,
});

export const sendRequestAction = (requestId) => ({
  type: SEND_REQUEST,
  requestId,
});

export const setCurrentRequestIdAction = (requestId) => ({
  type: CURRENT_REQUEST_ID,
  currentRequestId: requestId,
});

export const setEditItemIdAction = (itemId) => ({
  type: EDIT_ITEM_ID,
  editItemId: itemId,
});

export const setCurrentLibIdAction = (libId) => ({
  type: CURRENT_LIB_ID,
  currentLibId: libId,
});

export const setCurrentEnvIdAction = (envId) => ({
  type: CURRENT_ENV_ID,
  currentEnvId: envId,
});

export const setEditEnvIdAction = (envId) => ({
  type: EDIT_ENV_ID,
  editEnvId: envId,
});
