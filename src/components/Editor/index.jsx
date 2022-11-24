import { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Split from "react-split";
import uuid from "react-uuid";
import { createNewRequestAction } from "@/store/modules/collectionItem";
import Button from "../Button";
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
          <Button className="self-center" onClick={handleCreateRequest}>
            Create a request
          </Button>
          <div className="flex-1" />
        </>
      )}
    </div>
  );
};

export default memo(Editor);
