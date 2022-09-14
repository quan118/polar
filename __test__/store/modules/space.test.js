import { expect, test } from "vitest";
import spaceReducer, {
  createSpaceAction,
  deleteSpaceAction,
  updateSpaceAction,
} from "../../../src/store/modules/space";

test("should add a space to store", () => {
  const previousState = {
    byId: {},
    byArray: [],
  };
  const action = createSpaceAction({
    id: "s1",
    name: "work",
    createdAt: "123456",
    updatedAt: "123456",
    icon: "work.svg",
    collections: [],
  });
  const nextState = {
    byId: {
      s1: {
        id: "s1",
        name: "work",
        type: "space",
        createdAt: "123456",
        updatedAt: "123456",
        icon: "work.svg",
        collections: [],
      },
    },
    byArray: ["s1"],
  };

  expect(spaceReducer(previousState, action)).toEqual(nextState);
});

test("should delete space from store", () => {
  const previousState = {
    byId: {
      s1: {
        id: "s1",
        name: "work",
        type: "space",
        createdAt: "123456",
        updatedAt: "123456",
        icon: "work.svg",
        collections: [],
      },
    },
    byArray: ["s1"],
  };
  const action = deleteSpaceAction({
    id: "s1",
  });
  const nextState = {
    byId: {},
    byArray: [],
  };

  expect(spaceReducer(previousState, action)).toEqual(nextState);
});

test("should update space name", () => {
  const previousState = {
    byId: {
      s1: {
        id: "s1",
        name: "work",
        type: "space",
        createdAt: "123456",
        updatedAt: "123456",
        icon: "work.svg",
        collections: [],
      },
    },
    byArray: ["s1"],
  };
  const action = updateSpaceAction({
    id: "s1",
    name: "home",
  });
  const nextState = {
    byId: {
      s1: {
        id: "s1",
        name: "home",
        type: "space",
        createdAt: "123456",
        updatedAt: "123456",
        icon: "work.svg",
        collections: [],
      },
    },
    byArray: ["s1"],
  };

  expect(spaceReducer(previousState, action)).toEqual(nextState);
});
