import { Body } from "@tauri-apps/api/http";
import { Buffer } from "buffer";

export const pipe =
  (...fns) =>
  (requestConfig, fetchConfig) =>
    fns.reduce((v, f) => f(requestConfig, v), fetchConfig);

/*
fetchConfig
{
  method,
  headers: [{key: value}],
  query: [{key, value}],
  body,
  responseType,
  timeout,
  url
}
*/

export const buildFetchConfig = (requestConfig) => {
  let initialFetchConfig = {
    method: requestConfig?.method,
    headers: {},
    query: {},
    url: requestConfig?.url?.raw,
  };
  let finalFetchConfig = pipe(handleAuth, handleBody)(
    requestConfig,
    initialFetchConfig
  );

  const requestHeaders = {};
  requestConfig.header?.forEach((item) => {
    if (!item.enabled) return;
    requestHeaders[item.key] = item.value;
  });

  const requestQueries = {};
  requestConfig.url?.query?.forEach((item) => {
    if (!item.enabled) return;
    requestQueries[item.key] = item.value;
  });

  return {
    ...finalFetchConfig,
    headers: {
      ...finalFetchConfig.headers,
      ...requestHeaders,
    },
    query: {
      ...finalFetchConfig.query,
      ...requestQueries,
    },
  };
};

export const handleAuth = (requestConfig, fetchConfig) => {
  const headers = {};
  const query = {};

  switch (requestConfig?.auth?.type) {
    case "basic": {
      const username = requestConfig?.auth?.basic?.username;
      const password = requestConfig?.auth?.basic?.password;
      const inBase64 = Buffer.from(`${username}:${password}`).toString(
        "base64"
      );
      headers["Authorization"] = `Basic ${inBase64}`;
      break;
    }
    case "bearer":
      headers["Authorization"] = `Bearer ${requestConfig?.auth?.bearer}`;
      break;
    case "apikey":
      if (requestConfig?.auth?.apikey?.in !== "query") {
        headers[requestConfig?.auth?.apikey?.key] =
          requestConfig?.auth?.apikey?.value;
      } else {
        query[requestConfig?.auth?.apikey?.key] =
          requestConfig?.auth?.apikey?.value;
      }
      break;
    default:
      break;
  }

  return {
    ...fetchConfig,
    headers: {
      ...fetchConfig.headers,
      ...headers,
    },
    query: {
      ...fetchConfig.query,
      ...query,
    },
  };
};

export const handleBody = (requestConfig, fetchConfig) => {
  // const headers = [];
  const headers = {};

  let body;
  switch (requestConfig?.body?.mode) {
    case "raw": {
      switch (requestConfig?.body?.options?.raw?.language) {
        case "json":
          headers["Content-Type"] = "application/json";
          body = Body.json(JSON.stringify(requestConfig?.body?.raw));
          break;
        case "xml":
          headers["Content-Type"] = "application/xml";
          body = Body.text(requestConfig?.body?.raw);
          break;
        case "yaml":
          headers["Content-Type"] = "text/yaml";
          body = Body.text(requestConfig?.body?.raw);
          break;
        default:
          headers["Content-Type"] = "text/plain";
          body = Body.text(requestConfig?.body?.raw);
          break;
      }
      break;
    }
    case "form-data": {
      var formData = {};
      requestConfig?.body?.formdata?.forEach((item) => {
        formData[item.key] = item.value;
      });
      body = new Body.form(formData);
      break;
    }
    case "urlencoded": {
      const params = {};
      requestConfig?.body?.urlencoded?.forEach((item) => {
        params[item.key] = item.value;
      });
      body = new URLSearchParams(params);
      headers["Content-Type"] = "application/x-www-form-urlencoded";
      break;
    }
    // https://github.com/tauri-apps/tauri/discussions/3253
    case "file": {
      headers["Content-Type"] = "multipart/form-data";
      body = Body.form({
        fileData: {
          file: requestConfig?.body?.file?.src,
          // mime: 'image/jpeg', // optional
          // fileName: 'image.jpg', // optional
        },
      });
      break;
    }
    default:
      break;
  }
  const newFetchConfig = {
    ...fetchConfig,
    headers: {
      ...fetchConfig.headers,
      ...headers,
    },
  };
  if (body) newFetchConfig.body = body;
  return newFetchConfig;
};
