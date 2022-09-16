import { expect, test } from "vitest";
import {
  buildFetchConfig,
  handleAuth,
  handleBody,
} from "../../src/utils/request";

test("should handle basic auth successfully", () => {
  const requestConfig = {
    method: "GET",
    url: {
      raw: "https://httpbin.org/basic-auth",
    },
    auth: {
      type: "basic",
      basic: {
        username: "quan",
        password: "abc123",
      },
    },
  };
  const initialFetchConfig = {
    method: "GET",
    url: "https://httpbin.org/basic-auth",
  };
  const expectedFetchConfig = {
    method: "GET",
    url: "https://httpbin.org/basic-auth",
    headers: [{ key: "Authorization", value: "Basic cXVhbjphYmMxMjM=" }],
    query: [],
  };
  const newFetchConfig = handleAuth(requestConfig, initialFetchConfig);
  expect(newFetchConfig).toEqual(expectedFetchConfig);
});

test("should handle bearer auth successfully", () => {
  const requestConfig = {
    method: "GET",
    url: {
      raw: "https://httpbin.org/basic-auth",
    },
    auth: {
      type: "bearer",
      bearer: "jsontoken",
    },
  };
  const initialFetchConfig = {
    method: "GET",
    url: "https://httpbin.org/basic-auth",
  };
  const expectedFetchConfig = {
    method: "GET",
    url: "https://httpbin.org/basic-auth",
    headers: [{ key: "Authorization", value: "Bearer jsontoken" }],
    query: [],
  };
  const newFetchConfig = handleAuth(requestConfig, initialFetchConfig);
  expect(newFetchConfig).toEqual(expectedFetchConfig);
});

test("should handle apikey auth successfully", () => {
  // TODO: should write test cases for `in query` and `in params`.
  // See postman collection format for more information:
  // https://schema.postman.com/collection/json/v2.1.0/draft-07/docs/index.html
});

test("should handle raw body successfully", () => {
  // text body
  const requestConfig = {
    method: "GET",
    url: {
      raw: "https://httpbin.org/basic-auth",
    },
    body: {
      mode: "raw",
      raw: "Hello Postpone",
    },
  };
  const initialFetchConfig = {
    method: "GET",
    url: "https://httpbin.org/basic-auth",
    headers: [{ key: "Authorization", value: "Basic cXVhbjphYmMxMjM=" }],
  };
  const expectedFetchConfig = {
    method: "GET",
    url: "https://httpbin.org/basic-auth",
    headers: [
      { key: "Authorization", value: "Basic cXVhbjphYmMxMjM=" },
      { key: "Content-Type", value: "text/plain" },
    ],
  };
  const newFetchConfig = handleBody(requestConfig, initialFetchConfig);
  expect(newFetchConfig).toEqual(expectedFetchConfig);

  // TODO: json

  // TODO: xml

  // TODO: yaml
});

test("should handle form-data body successfully", () => {});

test("should handle urlencoded body successfully", () => {});

test("should handle file body successfully", () => {});

test("should handle a request with basic auth + raw body successfully", () => {
  const requestConfig = {
    method: "GET",
    url: {
      raw: "https://httpbin.org/basic-auth",
    },
    auth: {
      type: "basic",
      basic: {
        username: "quan",
        password: "abc123",
      },
    },
    body: {
      mode: "raw",
      raw: "Hello Postpone",
    },
  };
  const expectedFetchConfig = {
    method: "GET",
    url: "https://httpbin.org/basic-auth",
    headers: [
      { key: "Authorization", value: "Basic cXVhbjphYmMxMjM=" },
      { key: "Content-Type", value: "text/plain" },
    ],
    query: [],
  };
  const newFetchConfig = buildFetchConfig(requestConfig);
  expect(newFetchConfig).toEqual(expectedFetchConfig);
});
