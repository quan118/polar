import { memo, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { ChevronDown } from "react-bootstrap-icons";
import {
  updateTabByIdAction,
  updateTabUrlKeyAction,
} from "@/store/modules/tab";
import { sendRequestAction } from "@/store/modules/common";
import { saveRequestAction } from "@/store/modules/collectionItem";
import { Toast } from "@/components";
import Button from "../Button";
import SimpleListBox from "../SimpleListBox";
import SaveRequestDialog from "./SaveRequestDialog";
import SaveRequestDropdownMenu from "./SaveRequestDropdownMenu";

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
  const [showToast, setShowToast] = useState(false);
  const tab = useSelector((store) => _.get(store, `tab.byId.${tabId}`));
  const sendingRequest = useSelector((store) => store.common.sendingRequest);

  const handleSelectMethod = useCallback(
    (method) => {
      dispatch(updateTabByIdAction(tab.id, { method: method.name }));
    },
    [tab?.id]
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
    [tab?.id]
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

  const handleSaveRequest = useCallback(() => {
    if (!tab) return;
    dispatch(
      saveRequestAction(
        tab.id,
        tab.name,
        tab.parentId,
        undefined,
        undefined,
        tab
      )
    );
    setShowToast(true);
  }, [tab]);

  return (
    <div className="z-10 flex h-8 items-stretch bg-white">
      <SimpleListBox
        data={methods}
        value={getMethodObjectFromName(tab?.method)}
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
        value={tab?.url?.raw || ""}
        onChange={handleChangeURL}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleSendRequest} className="ml-2 mr-1">
        Send
      </Button>
      {tab?.parentId === "drafts" ? (
        <SaveRequestDialog requestId={tabId}>
          <Button variant="secondary" className="ml-1 rounded-r-none">
            Save
          </Button>
        </SaveRequestDialog>
      ) : (
        <Button
          variant="secondary"
          className="ml-1 rounded-r-none"
          onClick={handleSaveRequest}
        >
          Save
        </Button>
      )}

      <SaveRequestDropdownMenu tabId={tabId} onSaveAs={() => {}}>
        <Button variant="secondary" className="mr-2 rounded-l-none px-1">
          <ChevronDown />
        </Button>
      </SaveRequestDropdownMenu>
      <Toast label="Saved" open={showToast} setOpen={setShowToast} />
    </div>
  );
};

export default memo(RequestInput);
