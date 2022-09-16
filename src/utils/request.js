import { Body } from "@tauri-apps/api/http";

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
  let fetchConfig = {
    method: requestConfig?.method,
    headers: [],
    query: [],
    url: requestConfig?.url?.raw,
  };

  return pipe(handleAuth, handleBody)(requestConfig, fetchConfig);
};

export const handleAuth = (requestConfig, fetchConfig) => {
  const headers = [];
  const query = [];

  switch (requestConfig?.auth?.type) {
    case "basic": {
      const username = requestConfig?.auth?.basic?.username;
      const password = requestConfig?.auth?.basic?.password;
      const inBase64 = Buffer.from(`${username}:${password}`).toString(
        "base64"
      );
      headers.push({ key: "Authorization", value: `Basic ${inBase64}` });
      break;
    }
    case "bearer":
      headers.push({
        key: "Authorization",
        value: `Bearer ${requestConfig?.auth?.bearer}`,
      });
      break;
    case "apikey":
      if (requestConfig?.auth?.apikey?.in !== "query") {
        headers.push({
          key: requestConfig?.auth?.apikey?.key,
          value: requestConfig?.auth?.apikey?.value,
        });
      } else {
        query.push({
          key: requestConfig?.auth?.apikey?.key,
          value: requestConfig?.auth?.apikey?.value,
        });
      }
      break;
    default:
      break;
  }

  return {
    ...fetchConfig,
    headers: [
      ...(Array.isArray(fetchConfig.headers) ? fetchConfig.headers : []),
      ...headers,
    ],
    query: [
      ...(Array.isArray(fetchConfig.query) ? fetchConfig.query : []),
      ...query,
    ],
  };
};

export const handleBody = (requestConfig, fetchConfig) => {
  const headers = [];

  let body;
  switch (requestConfig?.body?.mode) {
    case "raw": {
      switch (requestConfig?.body?.options?.raw?.language) {
        case "json":
          headers.push({ key: "Content-Type", value: "application/json" });
          break;
        case "xml":
          headers.push({ key: "Content-Type", value: "application/xml" });
          break;
        case "yaml":
          headers.push({ key: "Content-Type", value: "text/yaml" });
          break;
        default:
          headers.push({ key: "Content-Type", value: "text/plain" });
          break;
      }
      break;
    }
    case "form-data": {
      body = new FormData();
      requestConfig?.body?.formdata?.forEach((item) => {
        body.append(item.key, item.value);
      });
      break;
    }
    case "urlencoded": {
      const params = {};
      requestConfig?.body?.urlencoded?.forEach((item) => {
        params[item.key] = params[item.value];
      });
      body = new URLSearchParams(params);
      headers.push({
        key: "Content-Type",
        value: "application/x-www-form-urlencoded",
      });
      break;
    }
    // https://github.com/tauri-apps/tauri/discussions/3253
    case "file": {
      headers.push({ key: "Content-Type", value: "multipart/form-data" });

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
    headers: [
      ...(Array.isArray(fetchConfig?.headers) ? fetchConfig.headers : []),
      ...headers,
    ],
  };
  if (body) newFetchConfig.body = body;
  return newFetchConfig;
};
