export const UPDATE_COMMON = "UPDATE_COMMON";
export const SEND_REQUEST = "SEND_REQUEST";

const defaultState = {
  sendingRequest: false,
  responseId: undefined,
  responseStatus: undefined, // success | failed | undefined
};

export default function commonReducer(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_COMMON: {
      return {
        ...state,
        ...action.payload,
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
