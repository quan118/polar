import { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Split from "react-split";
import uuid from "react-uuid";
import { createNewRequestAction } from "@/store/modules/collectionItem";
import Tabbar from "../Tabbar";
import RequestInput from "../RequestInput";
import RequestParamsInput from "../RequestParamsInput";
import ResponseViewer from "../ResponseViewer";

const Editor = () => {
  const dispatch = useDispatch();
  const tabsId = useSelector((store) => store.tab.byArrayIds);
  // const currentTabId = useSelector((store) => store.tab?.currentTabId);
  const currentTabId = useSelector((store) => store.tab.currentTabId);

  const handleCreateRequest = useCallback(() => {
    dispatch(createNewRequestAction(uuid(), "Untitled Request", "drafts"));
  }, [dispatch]);

  return (
    <div className="z-10 flex flex-col overflow-hidden">
      {tabsId?.length > 0 ? (
        <>
          <Tabbar />
          {currentTabId && <RequestInput tabId={currentTabId} />}

          <Split
            class="h-full overflow-hidden bg-purple-500"
            direction="vertical"
            gutterSize={5}
          >
            {currentTabId && <RequestParamsInput tabId={currentTabId} />}
            <ResponseViewer />
          </Split>
        </>
      ) : (
        <>
          <div className="flex-1" />
          <button
            type="button"
            className="mx-2 inline-flex items-center self-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleCreateRequest}
          >
            Create a request
          </button>
          <div className="flex-1" />
        </>
      )}
      {/* <EditDialog visible={true} type="Save Request" /> */}
    </div>
  );
};

export default memo(Editor);
