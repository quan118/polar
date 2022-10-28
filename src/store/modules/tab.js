export const ADD_TAB = "ADD_TAB";
export const DELETE_TAB = "DELETE_TAB";
export const UPDATE_TAB = "UPDATE_TAB";
export const SYNC_TAB = "SYNC_TAB";

const defaultState = {
  tabs: [
    {
      id: "draft0",
      name: "request",
      parentId: "draft",
    },
  ],
};

export default function tabReducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_TAB: {
      const noId = !(action.payload.id.length > 0);
      let idExisted = false;
      state.tabs.map((item) => {
        if (action.payload.id == item.id) {
          idExisted = true;
        }
      });
      if (noId || idExisted) return state;

      state.tabs = [
        ...state.tabs,
        {
          id: action.payload.id,
          name: action.payload.name,
          parentId: action.payload.parentId,
        },
      ];
      return { tabs: [...state.tabs] };
    }

    case DELETE_TAB: {
      state.tabs = [
        ...state.tabs.filter((item) => {
          return (
            item.id != action.payload.id && item.parentId != action.payload.id
          );
        }),
      ];
      return { tabs: [...state.tabs] };
    }

    case SYNC_TAB: {
      console.log("action payload");
      console.log(action.payload);
      const tabs = [
        ...state.tabs.filter((item) => {
          console.log("ITEM:");
          console.log(item);
          return action.payload[item.id]?.id?.length > 0;
        }),
      ];

      return { tabs };
    }

    case UPDATE_TAB: {
      const noId = !(action.payload.id.length > 0);
      let idExisted = false;
      state.tabs.map((item) => {
        if (action.payload.id == item.id) {
          idExisted = true;
        }
      });
      if (noId || !idExisted) return state;

      let tabs = [...state.tabs];
      const objIndex = tabs.findIndex((obj) => obj.id == action.payload.id);
      tabs[objIndex].name = action.payload.name;

      return {
        tabs: [...tabs],
      };
    }

    default:
      return state;
  }
}

export const addTabAction = (payload) => ({
  type: ADD_TAB,
  payload,
});

export const deleteTabAction = (payload) => ({
  type: DELETE_TAB,
  payload,
});

export const updateTabAction = (payload) => ({
  type: UPDATE_TAB,
  payload,
});

export const syncTabAction = (payload) => ({
  type: SYNC_TAB,
  payload,
});
