import { memo } from "react";
import { useSelector } from "react-redux";
import Split from "react-split";
import { ArrowRepeat } from "react-bootstrap-icons";
import Tabbar from "../Tabbar";
import RequestInput from "../RequestInput";
import RequestParamsInput from "../RequestParamsInput";
import ResponseViewer from "../ResponseViewer";

const Editor = () => {
  const sendingRequest = useSelector((store) => store.common.sendingRequest);

  return (
    <div className="flex flex-col">
      <Tabbar />
      <RequestInput requestId="draft0" />

      {sendingRequest ? (
        <div className="flex flex-1 items-center justify-center bg-white">
          <span className="mr-2 text-xs text-slate-500">Please wait</span>
          <ArrowRepeat className="animate-spin text-slate-500" />
        </div>
      ) : (
        <Split
          class="flex-1 flex-col bg-purple-500"
          direction="vertical"
          gutterSize={5}
        >
          <RequestParamsInput requestId="draft0" />
          <ResponseViewer />
        </Split>
      )}

      {/* <div className="bg-magenta-500 flex flex-1">
        <RequestParamsInput />
        <div className="flex flex-1 bg-green-500">Request/Response Viewer</div>
      </div> */}
    </div>
  );
};

export default memo(Editor);
