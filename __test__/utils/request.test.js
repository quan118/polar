import { expect, test } from "vitest";
import { buildFetchConfig, handleAuth, handleBody } from "@/utils/request";
import { Body } from "@tauri-apps/api/http";

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
    headers: {
      Authorization: "Basic cXVhbjphYmMxMjM=",
    },
    query: {},
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
    headers: { Authorization: "Bearer jsontoken" },
    query: {},
  };
  const newFetchConfig = handleAuth(requestConfig, initialFetchConfig);
  expect(newFetchConfig).toEqual(expectedFetchConfig);
});

test("should handle apikey auth successfully", () => {
  // TODO: should write test cases for `in query` and `in params`.
  // See postman collection format for more information:
  // https://schema.postman.com/collection/json/v2.1.0/draft-07/docs/index.html

  const requestConfig_in_header = {
    method: "GET",
    url: {
      raw: "https://httpbin.org/basic-auth",
    },
    auth: {
      type: "apikey",
      in: "header",
      apikey: {
        key: "X-API-Key",
        value: "abcd1234",
      },
    },
  };

  const initialFetchConfig = {
    method: "GET",
    url: "https://httpbin.org/basic-auth",
  };
  const expectedFetchConfig_in_header = {
    method: "GET",
    url: "https://httpbin.org/basic-auth",
    headers: { "X-API-Key": "abcd1234" },
    query: {},
  };

  const newFetchConfig_in_header = handleAuth(
    requestConfig_in_header,
    initialFetchConfig
  );
  expect(newFetchConfig_in_header).toEqual(expectedFetchConfig_in_header);

  const requestConfig_in_query = {
    method: "GET",
    url: {
      raw: "https://httpbin.org/basic-auth",
    },
    auth: {
      type: "apikey",
      in: "query",
      apikey: {
        key: "api_key",
        value: "abcd1234",
      },
    },
  };
  const expectedFetchConfig_in_query = {
    method: "GET",
    url: "https://httpbin.org/basic-auth",
    headers: { api_key: "abcd1234" },
    query: {},
  };
  const newFetchConfig_in_query = handleAuth(
    requestConfig_in_query,
    initialFetchConfig
  );

  expect(newFetchConfig_in_query).toEqual(expectedFetchConfig_in_query);
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
    headers: { Authorization: "Basic cXVhbjphYmMxMjM=" },
  };
  const expectedFetchConfig = {
    method: "GET",
    url: "https://httpbin.org/basic-auth",
    headers: {
      Authorization: "Basic cXVhbjphYmMxMjM=",
      "Content-Type": "text/plain",
    },
    body: Body.text("Hello Postpone"),
  };
  const newFetchConfig = handleBody(requestConfig, initialFetchConfig);
  expect(newFetchConfig).toEqual(expectedFetchConfig);

  // json body
  const requestConfig_json = {
    method: "GET",
    url: {
      raw: "https://httpbin.org/basic-auth",
    },
    body: {
      mode: "raw",
      options: {
        raw: {
          language: "json",
        },
      },
    },
  };
  const expectedFetchConfig_json = {
    method: "GET",
    url: "https://httpbin.org/basic-auth",
    headers: {
      Authorization: "Basic cXVhbjphYmMxMjM=",
      "Content-Type": "application/json",
    },
    body: Body.json(),
  };
  const newFetchConfig_json = handleBody(
    requestConfig_json,
    initialFetchConfig
  );
  expect(newFetchConfig_json).toEqual(expectedFetchConfig_json);

  // xml body
  const requestConfig_xml = {
    method: "GET",
    url: {
      raw: "https://httpbin.org/basic-auth",
    },
    body: {
      mode: "raw",
      options: {
        raw: {
          language: "xml",
        },
      },
    },
  };
  const expectedFetchConfig_xml = {
    method: "GET",
    url: "https://httpbin.org/basic-auth",
    headers: {
      Authorization: "Basic cXVhbjphYmMxMjM=",
      "Content-Type": "application/xml",
    },
    body: Body.text(),
  };
  const newFetchConfig_xml = handleBody(requestConfig_xml, initialFetchConfig);
  expect(newFetchConfig_xml).toEqual(expectedFetchConfig_xml);

  // yaml body
  const requestConfig_yaml = {
    method: "GET",
    url: {
      raw: "https://httpbin.org/basic-auth",
    },
    body: {
      mode: "raw",
      options: {
        raw: {
          language: "yaml",
        },
      },
    },
  };
  const expectedFetchConfig_yaml = {
    method: "GET",
    url: "https://httpbin.org/basic-auth",
    headers: {
      Authorization: "Basic cXVhbjphYmMxMjM=",
      "Content-Type": "text/yaml",
    },
    body: Body.text(),
  };
  const newFetchConfig_yaml = handleBody(
    requestConfig_yaml,
    initialFetchConfig
  );
  expect(newFetchConfig_yaml).toEqual(expectedFetchConfig_yaml);
});

test("should handle form-data body successfully", () => {
  const requestConfig = {
    method: "GET",
    url: {
      raw: "https://httpbin.org/basic-auth",
    },
    body: {
      mode: "form-data",
      formdata: [
        { key: "abc", value: "123" },
        { key: "abcd", value: "1234" },
      ],
    },
  };
  const initialFetchConfig = {
    method: "GET",
    url: "https://httpbin.org/basic-auth",
    headers: { Authorization: "Basic cXVhbjphYmMxMjM=" },
  };
  const expectedFetchConfig = {
    method: "GET",
    url: "https://httpbin.org/basic-auth",
    headers: {
      Authorization: "Basic cXVhbjphYmMxMjM=",
      "Content-Type": "multipart/form-data",
    },
    body: Body.form({ abc: "123", abcd: "1234" }),
  };
  const newFetchConfig = handleBody(requestConfig, initialFetchConfig);

  expect(newFetchConfig).toEqual(expectedFetchConfig);
});

test("should handle urlencoded body successfully", () => {
  const requestConfig = {
    method: "GET",
    url: {
      raw: "https://httpbin.org/basic-auth",
    },
    body: {
      mode: "urlencoded",
      urlencoded: [{ key: "aaa", value: "111" }],
    },
  };
  const initialFetchConfig = {
    method: "GET",
    url: "https://httpbin.org/basic-auth",
    headers: { Authorization: "Basic cXVhbjphYmMxMjM=" },
  };
  const expectedFetchConfig = {
    method: "GET",
    url: "https://httpbin.org/basic-auth",
    headers: {
      Authorization: "Basic cXVhbjphYmMxMjM=",
    },
    body: Body.form({ aaa: "111" }),
  };
  const newFetchConfig = handleBody(requestConfig, initialFetchConfig);
  // console.log("=========UrlEncoded NewFetchConfig", newFetchConfig);

  expect(newFetchConfig).toEqual(expectedFetchConfig);
});

test("should handle file body successfully", () => {
  const requestConfig = {
    method: "GET",
    url: {
      raw: "https://httpbin.org/basic-auth",
    },
    body: {
      mode: "file",
      file: { src: "https://xyz.jpg" },
    },
  };
  const initialFetchConfig = {
    method: "GET",
    url: "https://httpbin.org/basic-auth",
    headers: { Authorization: "Basic cXVhbjphYmMxMjM=" },
  };
  const expectedFetchConfig = {
    method: "GET",
    url: "https://httpbin.org/basic-auth",
    headers: {
      Authorization: "Basic cXVhbjphYmMxMjM=",
      "Content-Type": "image/jpeg",
    },
    body: new Body("File", { file: "https://xyz.jpg" }),
  };
  const newFetchConfig = handleBody(requestConfig, initialFetchConfig);
  // console.log("=========fileNewFetchConfig", newFetchConfig);
  expect(newFetchConfig).toEqual(expectedFetchConfig);
});

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
    headers: {
      Authorization: "Basic cXVhbjphYmMxMjM=",
      "Content-Type": "text/plain",
    },
    query: {},
    body: Body.text("Hello Postpone"),
  };
  const newFetchConfig = buildFetchConfig(requestConfig);
  expect(newFetchConfig).toEqual(expectedFetchConfig);
});
