import SaveRequestDialog from "./SaveRequestDialog";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { CREATE_COLLECTION_ITEM } from "@/store/modules/collectionItem";
import { EDIT_ITEM_ID } from "@/store/modules/common";

const mockedState = {
  collectionItem: {
    byId: {
      twitter: {
        id: "twitter",
        type: "group",
        name: "Twitter API",
        subGroups: ["twitter-auth", "twitter-tweet"],
      },
      "twitter-auth": {
        id: "twitter-auth",
        parentId: "twitter",
        type: "group",
        name: "Twitter Auth",
      },
      "twitter-tweet": {
        id: "twitter-tweet",
        parentId: "twitter",
        type: "group",
        name: "Twitter Tweet",
      },
      facebook: {
        id: "facebook",
        type: "group",
        name: "Facebook API",
        subGroups: [
          "facebook-auth",
          "facebook-posts",
          "facebook-friends",
          "facebook-ads",
          "facebook-reels",
        ],
      },
      "facebook-auth": {
        id: "facebook-auth",
        parentId: "facebook",
        type: "group",
        name: "Facebook Auth",
      },
      "facebook-posts": {
        id: "facebook-posts",
        parentId: "facebook",
        type: "group",
        name: "Facebook Posts",
      },
      "facebook-friends": {
        id: "facebook-friends",
        parentId: "facebook",
        type: "group",
        name: "Facebook Friends",
      },
      "facebook-ads": {
        id: "facebook-ads",
        parentId: "facebook",
        type: "group",
        name: "Facebook Ads",
      },
      "facebook-reels": {
        id: "facebook-reels",
        parentId: "facebook",
        type: "group",
        name: "Facebook Reels",
      },
    },
  },
  common: {},
};

const mockedReducer =
  (initState) =>
  (state = initState, action) => {
    switch (action.type) {
      case CREATE_COLLECTION_ITEM: {
        const collectionItemById = {
          ...state.collectionItem.byId,
          [action.payload.id]: { ...action.payload },
        };

        if (action.parentId?.length > 0) {
          collectionItemById[action.parentId] = {
            ...state.collectionItem.byId[action.parentId],
            subGroups: [
              ...state.collectionItem.byId[action.parentId].subGroups,
              action.payload.id,
            ],
          };
        }

        return {
          ...state,
          collectionItem: {
            byId: collectionItemById,
          },
        };
      }
      case EDIT_ITEM_ID: {
        return {
          ...state,
          common: {
            ...state.common,
            editItemId: action.editItemId,
          },
        };
      }
      default:
        return state;
    }
  };

const MockStore = ({ initialState, children }) => (
  <Provider store={createStore(mockedReducer(initialState))}>
    {children}
  </Provider>
);

export default {
  title: "Example/SaveRequestDialog",
  component: SaveRequestDialog,
};

const Template = (args) => <SaveRequestDialog {...args} />;

export const Default = Template.bind({});

Default.args = {};

Default.decorators = [
  (Story) => (
    <MockStore initialState={mockedState}>
      <Story />
    </MockStore>
  ),
];
