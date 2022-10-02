import { memo, useState, useCallback } from "react";
import Split from "react-split";
import Tabbar from "../Tabbar";
import RequestInput from "../RequestInput";
import RequestParamsInput from "../RequestParamsInput";
import ResponseViewer from "../ResponseViewer";

const Editor = () => {
  const [responseId, setResponseId] = useState();

  const handleResponse = useCallback(
    (id) => {
      setResponseId(id);
    },
    [setResponseId]
  );

  return (
    <div className="flex flex-col">
      <Tabbar />
      <RequestInput requestId="draft0" onResponse={handleResponse} />
      <Split
        class="flex-1 flex-col bg-purple-500"
        direction="vertical"
        gutterSize={5}
      >
        <RequestParamsInput requestId="draft0" />
        <ResponseViewer responseId={responseId} />
      </Split>

      {/* <div className="bg-magenta-500 flex flex-1">
        <RequestParamsInput />
        <div className="flex flex-1 bg-green-500">Request/Response Viewer</div>
      </div> */}
    </div>
  );
};

export default memo(Editor);
