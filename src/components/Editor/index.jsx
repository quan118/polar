import { memo } from "react";
import Split from "react-split";
import Tabbar from "../Tabbar";
import RequestInput from "../RequestInput";
import RequestParamsInput from "../RequestParamsInput";
import ResponseViewer from "../ResponseViewer";

const Editor = () => {
  return (
    <div className="z-10 flex flex-col overflow-hidden">
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
    </div>
  );
};

export default memo(Editor);
