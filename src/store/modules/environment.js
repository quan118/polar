export const CREATE_ENV = "CREATE_ENV";
export const DELETE_ENV = "DELETE_ENV";
export const UPDATE_ENV = "UPDATE_ENV";
export const CREATE_ENV_VAR = "CREATE_ENV_VAR";
export const DELETE_ENV_VAR = "DELETE_ENV_VAR";
export const UPDATE_ENV_VAR = "UPDATE_ENV_VAR";

const defaultState = {
  env: {
    global: {
      id: "global",
      name: "Global",
      variables: [
        {
          id: "g0",
          variable: "google",
          value: "http://google.com",
        },
        {
          id: "g1",
          variable: "youtube",
          value: "http://youtube.com",
        },
      ],
    },
    env1: {
      id: "env1",
      name: "Env1",
      variables: [
        {
          id: "v1",
          variable: "facebook",
          value: "https://facebook.com",
        },
      ],
    },
  },
};
export default function envReducer(state = defaultState, action) {
  switch (action.type) {
    case CREATE_ENV: {
      const noId = !(action.payload.id.length > 0);
      const idExisted = !!state.env[action.payload.id];
      if (noId || idExisted) return state;
      const env = {
        ...state.env,
        [action.payload.id]: { ...action.payload },
      };
      return { env };
    }
    case DELETE_ENV: {
      const noId = !(action.id.length > 0);
      const idExisted = !!state.env[action.id];
      if (noId || !idExisted) return state;
      delete state.env[action.id];
      return {
        env: {
          ...state.env,
        },
      };
    }
    case UPDATE_ENV: {
      const noId = !(action.id.length > 0);
      const idExisted = !!state.env[action.id];
      if (noId || !idExisted) return state;
      const tmp = {
        env: {
          ...state.env,
          [action.id]: {
            ...state.env[action.id],
            ...action.payload,
          },
        },
      };

      return tmp;
    }
    case CREATE_ENV_VAR: {
      const noId = !(action.id.length > 0);
      const idExisted = !!state.env[action.id];
      if (noId || !idExisted) return state;
      const env = {
        env: {
          ...state.env,
          [action.id]: {
            ...state.env[action.id],
            variables: [...state.env[action.id].variables, action.payload],
          },
        },
      };

      return env;
    }
    case DELETE_ENV_VAR: {
      const noId = !(action.pid.length > 0);
      const idExisted = !!state.env[action.pid];
      if (noId || !idExisted) return state;
      const variables = [
        ...state.env[action.pid].variables.filter((item) => {
          return item.id !== action.id;
        }),
      ];
      return {
        env: {
          ...state.env,
          [action.pid]: { ...state.env[action.pid], variables: variables },
        },
      };
    }
    case UPDATE_ENV_VAR: {
      const noId = !(action.pid.length > 0);
      const idExisted = !!state.env[action.pid];
      if (noId || !idExisted) return state;

      const env = {
        env: {
          ...state.env,
          [action.pid]: {
            ...state.env[action.pid],
            variables: action.payload,
          },
        },
      };

      return env;
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
export const deleteEnvVarAction = (pid, id) => ({
  type: DELETE_ENV_VAR,
  pid,
  id,
});
export const updateEnvVarAction = (pid, payload) => ({
  type: UPDATE_ENV_VAR,
  pid,
  payload,
});
