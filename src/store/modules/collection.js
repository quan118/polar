export const CREATE_COLLECTION = "CREATE_COLLECTION";
export const DELETE_COLLECTION = "DELETE_COLLECTION";
export const UPDATE_COLLECTION = "UPDATE_COLLECTION";

const defaultState = {
  byId: {},
};

const mockState = {
  byId: {
    c1: {
      id: "c1",
      name: "twitter",
      type: "collection",
      createdAt: "1663151889",
      updatedAt: "1663151889",
      icon: "twitter.svg",
      items: ["t1", "t2"],
    },
  },
};

export default function collectionReducer(state = defaultState, action) {
  switch (action.type) {
    case CREATE_COLLECTION: {
      // TODO:
      return state;
    }
    case DELETE_COLLECTION: {
      // TODO:
      return state;
    }
    case UPDATE_COLLECTION: {
      // TODO:
      return state;
    }
    default:
      return state;
  }
}

export const createCollectionAction = ({
  id,
  name,
  createdAt,
  updatedAt,
  icon,
  items,
}) => ({
  type: CREATE_COLLECTION,
  payload: {
    id,
    name,
    createdAt,
    updatedAt,
    icon,
    items,
  },
});

export const deleteCollectionAction = ({ id }) => ({
  type: DELETE_COLLECTION,
  id,
});

export const updateCollectionAction = ({
  id,
  name,
  createdAt,
  updatedAt,
  icon,
  items,
}) => ({
  type: UPDATE_COLLECTION,
  id,
  payload: {
    name,
    createdAt,
    updatedAt,
    icon,
    items,
  },
});
