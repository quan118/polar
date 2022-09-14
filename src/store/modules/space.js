import { removeUndefinedKeys } from "../../utils/common";

export const CREATE_SPACE = "CREATE_SPACE";
export const DELETE_SPACE = "DELETE_SPACE";
export const UPDATE_SPACE = "UPDATE_SPACE";

const defaultState = {
  byId: {},
  byArray: [],
};

const mockState = {
  byId: {
    s1: {
      id: "s1",
      name: "work",
      type: "space",
      createdAt: "1663151888",
      updatedAt: "1663151888",
      icon: "work.svg",
      collections: ["c1", "c2"],
    },
    s2: {
      id: "s2",
      name: "home",
      type: "space",
      createdAt: "1663151889",
      updatedAt: "1663151889",
      icon: "home.svg",
      collections: ["c3"],
    },
  },
  byArray: ["s2", "s1"],
};

export default function spaceReducer(state = defaultState, action) {
  switch (action.type) {
    case CREATE_SPACE: {
      const noId = !(action?.payload?.id?.length > 0);
      const idExisted = !!state.byId[action?.payload?.id];
      if (noId || idExisted) return state;
      return {
        byId: {
          ...state.byId,
          [action.payload.id]: { ...action.payload, type: "space" },
        },
        byArray: [...state.byArray, action.payload.id],
      };
    }
    case DELETE_SPACE: {
      const noId = !(action?.id?.length > 0);
      if (noId) return state;
      delete state.byId[action.id];
      return {
        byId: {
          ...state.byId,
        },
        byArray: state.byArray.filter((id) => id !== action.id),
      };
    }
    case UPDATE_SPACE: {
      const noId = !(action?.id?.length > 0);
      const idExisted = !!state.byId[action?.id];
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
        byArray: state.byArray,
      };
    }
    default:
      return state;
  }
}

export const createSpaceAction = ({
  id,
  name,
  createdAt,
  updatedAt,
  icon,
  collections,
}) => ({
  type: CREATE_SPACE,
  payload: {
    id,
    name,
    createdAt,
    updatedAt,
    icon,
    collections,
  },
});

export const deleteSpaceAction = ({ id }) => ({
  type: DELETE_SPACE,
  id,
});

export const updateSpaceAction = ({
  id,
  name,
  createdAt,
  updatedAt,
  icon,
  collections,
}) => ({
  type: UPDATE_SPACE,
  id,
  payload: {
    name,
    createdAt,
    updatedAt,
    icon,
    collections,
  },
});
