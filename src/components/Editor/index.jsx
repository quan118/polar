import { memo } from "react";
import Tabbar from "../Tabbar";
import RequestInput from "../RequestInput";
import RequestParamsInput from "../RequestParamsInput";

const Editor = () => {
  return (
    <div className="flex flex-col bg-pink-500">
      <Tabbar />
      <RequestInput />
      <div className="bg-magenta-500 flex flex-1">
        <RequestParamsInput />
        <div className="flex flex-1 bg-green-500">Request/Response Viewer</div>
      </div>
    </div>
  );
};

export default memo(Editor);
