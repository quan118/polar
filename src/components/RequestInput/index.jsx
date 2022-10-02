import { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import uuid from "react-uuid";
import { fetch } from "@tauri-apps/api/http";
import {
  updateCollectionItemAction,
  updateCollectionItemUrlKeyAction,
} from "../../store/modules/collectionItem";
import { createResponseAction } from "../../store/modules/response";

import { buildFetchConfig } from "../../utils/request";
import SimpleListBox from "../SimpleListBox";

const methods = [
  { id: 1, name: "GET" },
  { id: 2, name: "HEAD" },
  { id: 3, name: "POST" },
  { id: 4, name: "PUT" },
  { id: 5, name: "PATCH" },
  { id: 6, name: "DELETE" },
  { id: 7, name: "OPTION" },
];

const getMethodObjectFromName = (name) =>
  methods.find((item) => item.name === name);

const RequestInput = ({ requestId, onResponse }) => {
  const dispatch = useDispatch();
  const request = useSelector((store) =>
    _.get(store, `collectionItem.byId.${requestId}`)
  );

  console.log("REQUEST:", request);

  const handleSelectMethod = useCallback(
    (method) => {
      dispatch(updateCollectionItemAction(request.id, { method: method.name }));
    },
    [request.id]
  );

  const handleChangeURL = useCallback((event) => {
    dispatch(
      updateCollectionItemUrlKeyAction(request.id, "raw", event.target.value)
    );
  }, []);

  const handleSendRequest = useCallback(async () => {
    try {
      const fetchConfig = buildFetchConfig(request);
      console.log("FETCH CONFIG:");
      console.log(fetchConfig);
      const fetchOptions = { ...fetchConfig };
      delete fetchOptions.url;
      console.log("FETCH OPTIONS:");
      console.log(fetchOptions);
      const response = await fetch(fetchConfig.url, fetchOptions);
      console.log("RESPONSE:");
      console.log(response);
      console.log("Response data");
      console.log(response.data);
      const responseId = uuid();
      dispatch(
        createResponseAction({
          id: responseId,
          requestId: request.id,
          name: "",
          originalRequest: {}, // TODO: Update this field,
          status: `${response.status} ${response.ok ? "OK" : ""}`,
          code: response.status,
          header: Object.keys(response.headers).map((key) => ({
            [key]: response.headers[key],
          })),
          cookie: [],
          body: response.data,
        })
      );
      onResponse(responseId);
    } catch (error) {
      console.log("handleSendRequest error");
      console.log(error);
    }
  }, [request]);

  return (
    <div className="flex items-stretch bg-white">
      <SimpleListBox
        data={methods}
        defaultValue={getMethodObjectFromName(request.method)}
        onChange={handleSelectMethod}
      />
      <input
        name="url"
        id="url"
        className="block w-full rounded-none rounded-r-md border-y border-r border-slate-300 text-black focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="https://"
        defaultValue={request.url?.raw}
        onChange={handleChangeURL}
      />
      <button
        type="button"
        className="mx-2 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={handleSendRequest}
      >
        Send
      </button>
    </div>
  );
};

export default memo(RequestInput);

/*
<div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">$</span>
        </div>
        <input
          type="text"
          name="price"
          id="price"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
          placeholder="0.00"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <label htmlFor="currency" className="sr-only">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
          >
            <option>USD</option>
            <option>CAD</option>
            <option>EUR</option>
          </select>
        </div>
      </div>
*/
