import { expect, test } from "vitest";
import collectionReducer, {
  createCollectionAction,
  deleteCollectionAction,
  updateCollectionAction,
} from "../../../src/store/modules/collection";

test("should add a collection to store", () => {
  const previousState = {
    byId: {},
  };
  const action = createCollectionAction({
    id: "c1",
    name: "twitter",
    createdAt: "1663151889",
    updatedAt: "1663151889",
    icon: "twitter.svg",
    items: [],
  });
  const nextState = {
    byId: {
      c1: {
        id: "c1",
        name: "twitter",
        type: "collection",
        createdAt: "1663151889",
        updatedAt: "1663151889",
        icon: "twitter.svg",
        items: [],
      },
    },
  };

  expect(collectionReducer(previousState, action)).toEqual(nextState);
});

test("should delete collection from store", () => {
  const previousState = {
    byId: {
      c1: {
        id: "c1",
        name: "twitter",
        type: "collection",
        createdAt: "1663151889",
        updatedAt: "1663151889",
        icon: "twitter.svg",
        items: [],
      },
    },
  };
  const action = deleteCollectionAction({
    id: "c1",
  });
  const nextState = {
    byId: {},
  };

  expect(collectionReducer(previousState, action)).toEqual(nextState);
});

test("should update collection name", () => {
  const previousState = {
    byId: {
      c1: {
        id: "c1",
        name: "twitter",
        type: "collection",
        createdAt: "1663151889",
        updatedAt: "1663151889",
        icon: "twitter.svg",
        items: [],
      },
    },
  };
  const action = updateCollectionAction({
    id: "c1",
    name: "facebook",
  });
  const nextState = {
    byId: {
      c1: {
        id: "c1",
        name: "facebook",
        type: "collection",
        createdAt: "1663151889",
        updatedAt: "1663151889",
        icon: "twitter.svg",
        items: [],
      },
    },
  };

  expect(collectionReducer(previousState, action)).toEqual(nextState);
});
