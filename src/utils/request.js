import { Body, ResponseType } from "@tauri-apps/api/http";
import { Buffer } from "buffer";
import mime from "mime";

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

variables
{
  'base_url': 'https://example.com'
}
*/

export const replace = (s, variables) => {
  if (!s) return s;
  let output = s;
  Object.keys(variables).forEach((k) => {
    if (Array.isArray(variables[k]) && variables[k].length > 0)
      output = output.replaceAll(`{{${k}}}`, variables[k][0].currentValue);
  });

  return output;
};

export const processVariables = (requestConfig, variables) => {
  const header = requestConfig?.header.map((item) => ({
    ...item,
    key: replace(item.key, variables),
    value: replace(item.value, variables),
  }));

  const raw = replace(requestConfig?.url?.raw, variables);
  const query = requestConfig?.url?.query.map((item) => ({
    ...item,
    key: replace(item.key, variables),
    value: replace(item.value, variables),
  }));
  const url = {
    ...requestConfig.url,
    raw,
    query,
  };

  const authBasicUsername = replace(
    requestConfig?.auth?.basic?.username,
    variables
  );
  const authBasicPassword = replace(
    requestConfig?.auth?.basic?.password,
    variables
  );
  const authBearer = replace(requestConfig?.auth?.bearer, variables);
  const authApikeyKey = replace(requestConfig?.auth?.apikey?.key, variables);
  const authApikeyValue = replace(
    requestConfig?.auth?.apikey?.value,
    variables
  );
  const auth = {
    ...requestConfig?.auth,
    basic: {
      username: authBasicUsername,
      password: authBasicPassword,
    },
    bearer: authBearer,
    apikey: {
      ...requestConfig?.auth?.apikey,
      key: authApikeyKey,
      value: authApikeyValue,
    },
  };

  const bodyRaw = replace(requestConfig?.body?.raw, variables);
  const bodyFormdata = requestConfig?.body?.formdata?.map((item) => ({
    ...item,
    key: replace(item.key, variables),
    value: replace(item.value, variables),
  }));
  const bodyUrlencoded = requestConfig?.body?.urlencoded?.map((item) => ({
    ...item,
    key: replace(item.key, variables),
    value: replace(item.value, variables),
  }));
  const body = {
    ...requestConfig?.body,
    raw: bodyRaw,
    formdata: bodyFormdata,
    urlencoded: bodyUrlencoded,
  };

  return {
    ...requestConfig,
    header,
    url,
    auth,
    body,
  };
};

export const buildFetchConfig = (requestConfig) => {
  // const decodedRequestConfig = handleVariables(requestConfig, variables);

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
    if (!item.enabled || !(item.key?.length > 0 && item.value?.length > 0))
      return;
    requestHeaders[item.key] = item.value;
  });

  const requestQueries = {};
  requestConfig.url?.query?.forEach((item) => {
    if (!item.enabled || !(item.key?.length > 0 && item.value?.length > 0))
      return;
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
    responseType: ResponseType.Binary,
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
    case "formdata": {
      var formData = {};
      requestConfig?.body?.formdata
        ?.filter((item) => item.enabled)
        .forEach((item) => {
          formData[item.key] = item.value;
        });
      headers["Content-Type"] = "multipart/form-data";
      body = Body.form(formData);
      break;
    }
    case "urlencoded": {
      const params = {};
      requestConfig?.body?.urlencoded
        ?.filter((item) => item.enabled)
        .forEach((item) => {
          params[item.key] = item.value;
        });
      body = Body.form(params);
      break;
    }
    // https://github.com/tauri-apps/tauri/discussions/3253
    case "file": {
      headers["Content-Type"] =
        mime.getType(requestConfig?.body?.file?.src) ||
        "application/octet-stream";
      body = new Body("File", {
        file: requestConfig?.body?.file?.src,
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
