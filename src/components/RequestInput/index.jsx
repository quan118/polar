import { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import {
  updateTabByIdAction,
  updateTabUrlKeyAction,
} from "@/store/modules/tab";
import { sendRequestAction } from "@/store/modules/common";
import Button from "../Button";
import SimpleListBox from "../SimpleListBox";
import SaveRequestDialog from "./SaveRequestDialog";

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

const RequestInput = ({ tabId }) => {
  const dispatch = useDispatch();
  const tab = useSelector((store) => _.get(store, `tab.byId.${tabId}`));
  const sendingRequest = useSelector((store) => store.common.sendingRequest);

  const handleSelectMethod = useCallback(
    (method) => {
      dispatch(updateTabByIdAction(tab.id, { method: method.name }));
    },
    [tab.id]
  );

  // const handleChangeURL = useCallback(
  //   (event) => {
  //     dispatch(updateTabUrlKeyAction(tab.id, "raw", event.target.textContent));
  //   },
  //   [tab.id]
  // );

  const handleChangeURL = useCallback(
    (event) => {
      dispatch(updateTabUrlKeyAction(tab.id, "raw", event.target.value));
    },
    [tab.id]
  );

  const handleSendRequest = useCallback(() => {
    if (sendingRequest) return;
    dispatch(sendRequestAction(tabId));
  }, [sendingRequest, tabId]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        handleSendRequest();
      }
    },
    [handleSendRequest]
  );

  return (
    <div className="z-10 flex h-8 items-stretch bg-white">
      <SimpleListBox
        data={methods}
        value={getMethodObjectFromName(tab.method)}
        onChange={handleSelectMethod}
      />
      {/* <input
        type="text"
        name="url"
        id="url"
        className="block w-full rounded-none rounded-r-md border-y border-r border-slate-300 bg-slate-50 text-xs font-semibold text-slate-700 shadow-none focus:border-indigo-500 focus:ring-indigo-500"
        placeholder="URL"
        value={tab.url?.raw || ""}
        onChange={handleChangeURL}
        onKeyDown={handleKeyDown}
      /> */}
      {/* <div
        contentEditable="true"
        autoCapitalize="off"
        spellCheck="false"
        autoCorrect="off"
        translate="no"
        className="flex w-full items-center items-center rounded-none rounded-r-md border-y border-x border-slate-300 bg-slate-50 bg-yellow-500 pl-2 text-xs font-semibold text-slate-700 shadow-none focus:outline-none"
        onInput={handleChangeURL}
      >
        {tab.url?.raw || ""}
      </div> */}

      <input
        id="url"
        className="block w-full rounded-none rounded-r-md border-y border-r border-slate-300 bg-slate-50 text-xs font-semibold text-slate-700 shadow-none focus:border-indigo-500 focus:ring-indigo-500"
        placeholder="URL"
        value={tab.url?.raw || ""}
        onChange={handleChangeURL}
        onKeyDown={handleKeyDown}
      />

      <Button
        onClick={handleSendRequest}
        className="ml-2 mr-1 bg-indigo-500 hover:bg-indigo-700 focus:ring-indigo-500 "
      >
        Send
      </Button>
      {/* <button
        type="button"
        className="mx-2 inline-flex items-center rounded-md border border-transparent bg-indigo-500 px-3 py-2 text-xs font-bold font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={handleSendRequest}
        // className="ml-2 mr-1 bg-indigo-500 hover:bg-indigo-700 focus:ring-indigo-500 "
      >
        Send
      </button> */}
      {/* {isTabDirty ? ( */}
      <SaveRequestDialog requestId={tabId}>
        <Button className="mr-2 ml-1 bg-slate-500 hover:bg-slate-700 focus:ring-slate-500">
          Save
        </Button>
      </SaveRequestDialog>
      {/* ) : (
        <Button className="pointer-events-none mr-2 ml-1 bg-slate-200">
          Save
        </Button>
      )} */}

      {/* <EditDialog visible={true} type="Save Request" /> */}
    </div>
  );
};

export default memo(RequestInput);
