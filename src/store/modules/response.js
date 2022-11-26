import { REHYDRATE } from "redux-persist";

export const CREATE_RESPONSE = "CREATE_RESPONSE";
export const DELETE_RESPONSE = "DELETE_RESPONSE";
export const UPDATE_RESPONSE = "UPDATE_RESPONSE";

const defaultState = {
  byId: {},
};

// const mockState = {
//   byId: {
//     r1: {
//       id: "r1",
//       requestId: "t2",
//       name: "response test",
//       originalRequest: {},
//       status: "200 OK",
//       code: 200,
//       header: [
//         {
//           key: "Content-Type",
//           value: "application/json",
//         },
//       ],
//       cookie: [],
//       body: "",
//     },
//   },
// };

export default function responseReducer(state = defaultState, action) {
  switch (action.type) {
    case REHYDRATE: {
      return {
        ...state,
        ...action?.payload?.response,
      };
    }
    case CREATE_RESPONSE: {
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
    case DELETE_RESPONSE: {
      const noId = !(action.id.length > 0);
      if (noId) return state;
      delete state.byId[action.id];
      return {
        byId: {
          ...state.byId,
        },
      };
    }
    case UPDATE_RESPONSE: {
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
    default:
      return state;
  }
}

export const createResponseAction = (payload) => ({
  type: CREATE_RESPONSE,
  payload,
});

export const deleteResponseAction = ({ id }) => ({
  type: DELETE_RESPONSE,
  id,
});

export const updateResponseAction = (id, payload) => ({
  type: UPDATE_RESPONSE,
  id,
  payload,
});
