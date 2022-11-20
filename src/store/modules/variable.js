import { CREATE_ENV, CREATE_ENV_VAR } from "./environment";

export const CREATE_VARIABLE = "CREATE_VARIABLE";
export const UPDATE_VARIABLE = "UPDATE_VARIABLE";
export const SET_VARIABLE = "SET_VARIABLE";
export const DELETE_VARIABLES = "DELETE_VARIABLES";

export const SET_VAR_PROPERTIES_LEVEL_1 = "SET_VAR_PROPERTIES_LEVEL_1";

// actions handled by redux
export const DELETE_VARIABLE = "DELETE_VARIABLE";

const defaultState = {
  byId: {},
};

// const mockState = {
//   byId: {
//     1: {
//       id: "1",
//       environmentId: "global",
//       name: "base_url",
//       type: "default", // default | secret
//       initialValue: "",
//       currentValue: "",
//     },
//   },
// };

export default function variableReducer(state = defaultState, action) {
  switch (action.type) {
    case CREATE_ENV: {
      if (!Array.isArray(action.payload.variables)) {
        return state;
      }

      action.payload.variables.forEach((varId) => {
        state.byId[varId] = {
          id: varId,
          environmentId: action.payload.id,
          name: "",
          type: "default",
          initialValue: "",
          currentValue: "",
        };
      });

      return {
        ...state,
        byId: { ...state.byId },
      };
    }
    case CREATE_ENV_VAR:
    case CREATE_VARIABLE: {
      const noId = !(action.payload.id.length > 0);
      const idExisted = !!state.byId[action.payload.id];
      if (noId || idExisted) return state;

      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        },
      };
    }
    case UPDATE_VARIABLE: {
      state.byId[action.id] = {
        ...state.byId[action.id],
        ...action.payload,
      };
      return state;
    }
    case SET_VARIABLE: {
      state.byId[action.id] = action.payload;
      return state;
    }
    case DELETE_VARIABLE: {
      delete state.byId[action.id];
      return { ...state };
    }
    case DELETE_VARIABLES: {
      action.ids?.forEach((id) => delete state.byId[id]);
      return { ...state };
    }
    case SET_VAR_PROPERTIES_LEVEL_1: {
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
    default:
      return state;
  }
}

export const createVariableAction = (payload) => ({
  type: CREATE_VARIABLE,
  payload,
});

export const updateVariableAction = (id, payload) => ({
  type: UPDATE_VARIABLE,
  id,
  payload,
});

export const setVariableAction = (id, payload) => ({
  type: SET_VARIABLE,
  id,
  payload,
});

export const deleteVariableAction = (id) => ({
  type: DELETE_VARIABLE,
  id,
});

export const deleteVariablesAction = (ids) => ({
  type: DELETE_VARIABLES,
  ids,
});

export const setVarPropertiesLevel1Action = (id, key, payload) => ({
  type: SET_VAR_PROPERTIES_LEVEL_1,
  id,
  key,
  payload,
});
