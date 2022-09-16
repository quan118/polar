import { expect, test } from "vitest";
import responseReducer, {
  createResponseAction,
  deleteResponseAction,
  updateResponseAction,
} from "../../../src/store/modules/response";

test("should add a response to store", () => {
  const previousState = {
    byId: {},
  };
  const action = createResponseAction({
    id: "r1",
    requestId: "t2",
    name: "response test",
    originalRequest: {},
    status: "200 OK",
    code: 200,
    header: [
      {
        key: "Content-Type",
        value: "application/json",
      },
    ],
    cookie: [],
    body: "",
  });
  const nextState = {
    byId: {
      r1: {
        id: "r1",
        requestId: "t2",
        name: "response test",
        originalRequest: {},
        status: "200 OK",
        code: 200,
        header: [
          {
            key: "Content-Type",
            value: "application/json",
          },
        ],
        cookie: [],
        body: "",
      },
    },
  };

  expect(responseReducer(previousState, action)).toEqual(nextState);
});
test("should delete response from store", () => {
  const previousState = {
    byId: {
      r1: {
        id: "r1",
        requestId: "t2",
        name: "response test",
        originalRequest: {},
        status: "200 OK",
        code: 200,
        header: [
          {
            key: "Content-Type",
            value: "application/json",
          },
        ],
        cookie: [],
        body: "",
      },
    },
  };
  const action = deleteResponseAction({
    id: "r1",
  });
  const nextState = {
    byId: {},
  };

  expect(responseReducer(previousState, action)).toEqual(nextState);
});

test("should update response name", () => {
  const previousState = {
    byId: {
      r1: {
        id: "r1",
        requestId: "t2",
        name: "response test",
        originalRequest: {},
        status: "200 OK",
        code: 200,
        header: [
          {
            key: "Content-Type",
            value: "application/json",
          },
        ],
        cookie: [],
        body: "",
      },
    },
  };
  const action = updateResponseAction("r1", {
    id: "r1",
    requestId: "t3",
    name: "response test 2",
    originalRequest: {},
    status: "200 OK",
    code: 200,
    header: [
      {
        key: "Content-Type",
        value: "application/json",
      },
    ],
    cookie: [],
    body: "hello",
  });
  const nextState = {
    byId: {
      r1: {
        id: "r1",
        requestId: "t3",
        name: "response test 2",
        originalRequest: {},
        status: "200 OK",
        code: 200,
        header: [
          {
            key: "Content-Type",
            value: "application/json",
          },
        ],
        cookie: [],
        body: "hello",
      },
    },
  };

  expect(responseReducer(previousState, action)).toEqual(nextState);
});
