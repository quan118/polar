export const CREATE_ENV = "CREATE_ENV";
export const DELETE_ENV = "DELETE_ENV";
export const UPDATE_ENV = "UPDATE_ENV";
export const CREATE_ENV_VAR = "CREATE_ENV_VAR";

export const SET_ENV_PROPERTIES_LEVEL_1 = "SET_ENV_PROPERTIES_LEVEL_1";

// actions handled by sagas
export const ADD_NEW_ENV = "ADD_NEW_ENV";
export const DELETE_ALL_VARS_OF_ENV = "DELETE_ALL_VARS_OF_ENV";
export const DELETE_ENV_VAR = "DELETE_ENV_VAR";
export const DELETE_ENV_AND_RELATED_VARS = "DELETE_ENV_AND_RELATED_VARS";

const defaultState = {
  byId: {
    global: {
      id: "global",
      name: "Global",
      // variables: ['id1', 'id2']
    },
  },
};
export default function envReducer(state = defaultState, action) {
  switch (action.type) {
    case CREATE_ENV: {
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
    case DELETE_ENV: {
      const noId = !(action.id.length > 0);
      const idExisted = !!state.byId[action.id];
      if (noId || !idExisted) return state;
      delete state.byId[action.id];
      return {
        ...state,
        byId: { ...state.byId },
      };
    }
    case UPDATE_ENV: {
      const noId = !(action.id.length > 0);
      const idExisted = !!state.byId[action.id];
      if (noId || !idExisted) return state;
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            ...action.payload,
          },
        },
      };
    }
    case CREATE_ENV_VAR: {
      const noId = !(action.id.length > 0);
      const idExisted = !!state.byId[action.id];
      if (noId || !idExisted) return state;

      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            variables: [
              ...(state.byId[action.id].variables || []),
              action.payload.id,
            ],
          },
        },
      };
    }

    case SET_ENV_PROPERTIES_LEVEL_1: {
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
export const createEnvAction = (payload) => ({
  type: CREATE_ENV,
  payload,
});
export const deleteEnvAction = (id) => ({
  type: DELETE_ENV,
  id,
});
export const updateEnvAction = (id, payload) => ({
  type: UPDATE_ENV,
  id,
  payload,
});
export const createEnvVarAction = (id, payload) => ({
  type: CREATE_ENV_VAR,
  id,
  payload,
});
export const deleteEnvVarAction = (varId) => ({
  type: DELETE_ENV_VAR,
  varId,
});

export const deleteAllVarsOfEnvAction = (id) => ({
  type: DELETE_ALL_VARS_OF_ENV,
  id,
});

export const setEnvPropertyLevel1Action = (id, key, payload) => ({
  type: SET_ENV_PROPERTIES_LEVEL_1,
  id,
  key,
  payload,
});

export const addNewEnvAction = (id, name, varId) => ({
  type: ADD_NEW_ENV,
  id,
  name,
  varId,
});

export const deleteEnvAndRelatedVarsAction = (id) => ({
  type: DELETE_ENV_AND_RELATED_VARS,
  id,
});
