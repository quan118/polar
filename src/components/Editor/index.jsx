import { memo } from "react";
import { useSelector } from "react-redux";
import Split from "react-split";
import Tabbar from "../Tabbar";
import RequestInput from "../RequestInput";
import RequestParamsInput from "../RequestParamsInput";
import ResponseViewer from "../ResponseViewer";

const Editor = () => {
  const tabs = useSelector((store) => store.tab.tabs);

  return (
    <div className="z-10 flex flex-col overflow-hidden">
      {tabs?.length > 0 ? (
        <>
          <Tabbar />
          <RequestInput requestId="draft0" />
          <Split
            class="h-full overflow-hidden bg-purple-500"
            direction="vertical"
            gutterSize={5}
          >
            <RequestParamsInput requestId="draft0" />
            <ResponseViewer />
          </Split>
        </>
      ) : (
        <>
          <div className="flex-1" />
          <button
            type="button"
            className="mx-2 inline-flex items-center self-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => {}}
          >
            Create a request
          </button>
          <div className="flex-1" />
        </>
      )}
    </div>
  );
};

export default memo(Editor);
