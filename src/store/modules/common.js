export const UPDATE_COMMON = "UPDATE_COMMON";
export const SEND_REQUEST = "SEND_REQUEST";
export const CURRENT_REQUEST_ID = "CURRENT_REQUEST_ID";
export const EDIT_ITEM_ID = "EDIT_ITEM_ID";
export const CURRENT_LIB_ID = "CURRENT_LIB_ID";

const defaultState = {
  sendingRequest: false,
  responseId: undefined,
  responseStatus: undefined, // success | failed | undefined
  currentRequestId: "draft0", // current requestId
  editItemId: "",
  currentLibId: "1",
};

export default function commonReducer(state = defaultState, action) {
  switch (action.type) {
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
