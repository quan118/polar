import { expect, test } from "vitest";
import collectionItemReducer, {
  createCollectionItemAction,
  // deleteCollectionItemAction,
  updateCollectionItemAction,
} from "@/store/modules/collectionItem";

test("should add a collectionItem to store", () => {
  const previousState = {
    byId: {},
  };

  const action = createCollectionItemAction({
    id: "t2",
    type: "request",
    name: "login",
    method: "POST",
    header: [
      {
        key: "Content-Type",
        value: "application/json",
      },
    ],
    url: {
      raw: "http://httpbin.org/get?key1=value1&key2=value2",
      protocol: "http",
      host: ["httpbin", "org"],
      path: ["get"],
      query: [
        {
          key: "key1",
          value: "value1",
        },
        {
          key: "key2",
          value: "value2",
        },
      ],
    },
    auth: {
      type: "basic",
      basic: [
        {
          key: "password",
          value: "abc123",
          type: "string",
        },
        {
          key: "username",
          value: "quan",
          type: "string",
        },
      ],
    },
    body: {
      mode: "raw",
      raw: "Hello work",
      options: {
        raw: {
          language: "json",
        },
      },
    },
    response: ["r1", "r2"],
  });

  const nextState = {
    byId: {
      t2: {
        id: "t2",
        type: "request",
        name: "login",
        method: "POST",
        header: [
          {
            key: "Content-Type",
            value: "application/json",
          },
        ],
        url: {
          raw: "http://httpbin.org/get?key1=value1&key2=value2",
          protocol: "http",
          host: ["httpbin", "org"],
          path: ["get"],
          query: [
            {
              key: "key1",
              value: "value1",
            },
            {
              key: "key2",
              value: "value2",
            },
          ],
        },
        auth: {
          type: "basic",
          basic: [
            {
              key: "password",
              value: "abc123",
              type: "string",
            },
            {
              key: "username",
              value: "quan",
              type: "string",
            },
          ],
        },
        body: {
          mode: "raw",
          raw: "Hello work",
          options: {
            raw: {
              language: "json",
            },
          },
        },
        response: ["r1", "r2"],
      },
    },
  };

  expect(collectionItemReducer(previousState, action)).toEqual(nextState);
});

// test("should delete collectionItem from store", () => {
//   const previousState = {
//     byId: {
//       g0: {
//         id: "g0",
//         type: "group",
//         name: "login",
//         method: "POST",
//         response: [],
//         subGroups: ["g1"],
//       },
//       g1: {
//         id: "g1",
//         type: "group",
//         name: "login",
//         method: "POST",
//         response: [],
//         subGroups: ["g2"],
//       },
//       g2: {
//         id: "g2",
//         type: "group",
//         name: "login",
//         method: "POST",
//         response: [],
//         subGroups: ["g3"],
//       },
//       g3: {
//         id: "g3",
//         type: "group",
//         name: "login",
//         method: "POST",
//         response: [],
//         subGroups: [],
//       },
//     },
//   };
//   const action = deleteCollectionItemAction("g0");
//   const nextState = {
//     byId: {},
//   };

//   expect(collectionItemReducer(previousState, action)).toEqual(nextState);
// });

test("should update collectionItem name", () => {
  const previousState = {
    byId: {
      t2: {
        id: "t2",
        type: "request",
        name: "login",
        method: "POST",
        header: [
          {
            key: "Content-Type",
            value: "application/json",
          },
        ],
        url: {
          raw: "http://httpbin.org/get?key1=value1&key2=value2",
          protocol: "http",
          host: ["httpbin", "org"],
          path: ["get"],
          query: [
            {
              key: "key1",
              value: "value1",
            },
            {
              key: "key2",
              value: "value2",
            },
          ],
        },
        auth: {
          type: "basic",
          basic: [
            {
              key: "password",
              value: "abc123",
              type: "string",
            },
            {
              key: "username",
              value: "quan",
              type: "string",
            },
          ],
        },
        body: {
          mode: "raw",
          raw: "Hello work",
          options: {
            raw: {
              language: "json",
            },
          },
        },
        response: ["r1", "r2"],
      },
    },
  };
  const action = updateCollectionItemAction("t2", {
    id: "t2",
    type: "request",
    name: "login",
    method: "POST",
    header: [
      {
        key: "Content-Type",
        value: "application/json",
      },
    ],
    url: {
      raw: "http://httpbin.org/get?key1=value1&key2=value2&key3=value3",
      protocol: "http",
      host: ["httpbin", "org"],
      path: ["get"],
      query: [
        {
          key: "key1",
          value: "value2",
        },
        {
          key: "key2",
          value: "value2",
        },
        {
          key: "key3",
          value: "value3",
        },
      ],
    },
    auth: {
      type: "basic",
      basic: [
        {
          key: "password",
          value: "abc1234",
          type: "string",
        },
        {
          key: "username",
          value: "long",
          type: "string",
        },
      ],
    },
    body: {
      mode: "raw",
      raw: "Hello world",
      options: {
        raw: {
          language: "json",
        },
      },
    },
    response: ["r1", "r2"],
  });
  const nextState = {
    byId: {
      t2: {
        id: "t2",
        type: "request",
        name: "login",
        method: "POST",
        header: [
          {
            key: "Content-Type",
            value: "application/json",
          },
        ],
        url: {
          raw: "http://httpbin.org/get?key1=value1&key2=value2&key3=value3",
          protocol: "http",
          host: ["httpbin", "org"],
          path: ["get"],
          query: [
            {
              key: "key1",
              value: "value2",
            },
            {
              key: "key2",
              value: "value2",
            },
            {
              key: "key3",
              value: "value3",
            },
          ],
        },
        auth: {
          type: "basic",
          basic: [
            {
              key: "password",
              value: "abc1234",
              type: "string",
            },
            {
              key: "username",
              value: "long",
              type: "string",
            },
          ],
        },
        body: {
          mode: "raw",
          raw: "Hello world",
          options: {
            raw: {
              language: "json",
            },
          },
        },
        response: ["r1", "r2"],
      },
    },
  };

  expect(collectionItemReducer(previousState, action)).toEqual(nextState);
});
