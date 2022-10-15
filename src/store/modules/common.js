export const UPDATE_COMMON = "UPDATE_COMMON";
export const SEND_REQUEST = "SEND_REQUEST";
export const CURRENT_REQUEST_ID = "CURRENT_REQUEST_ID";
const defaultState = {
  sendingRequest: false,
  responseId: undefined,
  responseStatus: undefined, // success | failed | undefined
  currentRequestId: "draft0", // current requestId
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
