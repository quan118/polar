import { memo, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { createTheme } from "@uiw/codemirror-themes";
import Tabs from "../Tabs";

const tabs = [
  { key: "BODY", name: "Body", current: true },
  { key: "COOKIES", name: "Cookies", current: false },
  { key: "HEADERS", name: "Headers", current: false },
];

const myTheme = createTheme({
  theme: "light",
  settings: {
    background: "#ffffff",
    foreground: "#75baff",
    caret: "#5d00ff",
    selection: "#036dd626",
    selectionMatch: "#036dd626",
    lineHighlight: "#8a91991a",
    gutterBackground: "#fff",
    gutterForeground: "#8a919966",
    lineWrapping: true,
  },
  styles: [],
});

const ResponseViewer = ({ responseId }) => {
  const response = useSelector((store) =>
    _.get(store, `response.byId[${responseId}]`)
  );
  const [tab, setTab] = useState(tabs[0]);
  const handleChangeTab = useCallback((tab) => () => setTab(tab), [setTab]);

  return (
    <div className=" h-full w-full bg-white">
      <Tabs tabs={tabs} selected={tab} onChange={handleChangeTab} />
      {tab.key === "BODY" && response?.body && (
        <CodeMirror
          value={JSON.stringify(response?.body || "")}
          theme={myTheme}
          style={{ fontSize: 14 }}
          extensions={[EditorView.lineWrapping]}
        />
      )}
    </div>
  );
};

export default memo(ResponseViewer);
