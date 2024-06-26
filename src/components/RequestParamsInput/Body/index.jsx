import { memo, useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import CodeMirror from "@uiw/react-codemirror";
// import { createTheme } from "@uiw/codemirror-themes";
import { langs } from "@uiw/codemirror-extensions-langs";
import { updateTabItemByKeyPathLevel2Action } from "@/store/modules/tab";
import DropdownInput from "../../DropdownInput";
import FormData from "./FormData";
import URLEncoded from "./URLEncoded";
import File from "./File";

// const myTheme = createTheme({
//   theme: "light",
//   settings: {
//     background: "#ffffff",
//     foreground: "#75baff",
//     caret: "#5d00ff",
//     selection: "#036dd626",
//     selectionMatch: "#036dd626",
//     lineHighlight: "#8a91991a",
//     gutterBackground: "#fff",
//     gutterForeground: "#8a919966",
//   },
//   styles: [],
// });

const ContentType = ({
  selected,
  onChangeType,
  selectedLanguage,
  onChangeLanguage,
}) => {
  return (
    <div className="flex select-none items-center border-b px-2">
      <label className="mr-4 text-xs font-semibold text-slate-500">
        Content Type
      </label>
      <DropdownInput
        options={["none", "raw", "formdata", "urlencoded", "file"]}
        value={selected}
        onChange={onChangeType}
      />
      {selected === "raw" && (
        <DropdownInput
          options={["text", "json", "xml", "yaml"]}
          value={selectedLanguage}
          onChange={onChangeLanguage}
        />
      )}
    </div>
  );
};

const langExtensions = {
  json: langs.json(),
  yaml: langs.yaml(),
  xml: langs.xml(),
};

const Body = ({ tabId }) => {
  const dispatch = useDispatch();
  const body = useSelector((store) => _.get(store, `tab.byId[${tabId}].body`));

  const [extensions, setExtensions] = useState([]);

  useEffect(() => {
    const lang = langExtensions[body?.options?.raw?.language];
    if (!lang) setExtensions([]);
    else setExtensions([lang]);
  }, [body?.options?.raw?.language]);

  const handleChangeType = useCallback(
    (mode) => {
      dispatch(updateTabItemByKeyPathLevel2Action(tabId, "body", "mode", mode));
    },
    [dispatch]
  );

  const handleChangeLanguage = useCallback(
    (value) => {
      dispatch(
        updateTabItemByKeyPathLevel2Action(tabId, "body", "options", {
          raw: {
            language: value,
          },
        })
      );
    },
    [dispatch]
  );

  const handleChangeRawContent = useCallback(
    (value) => {
      dispatch(updateTabItemByKeyPathLevel2Action(tabId, "body", "raw", value));
    },
    [dispatch]
  );

  return (
    <div className="flex flex-1 flex-col overflow-hidden border-2 border-green-500">
      <ContentType
        selected={body?.mode || "none"}
        onChangeType={handleChangeType}
        selectedLanguage={body?.options?.raw?.language || "text"}
        onChangeLanguage={handleChangeLanguage}
      />
      {body?.mode === "raw" && (
        <CodeMirror
          value={body?.raw}
          style={{
            fontSize: 12,
            overflow: "scroll",
            height: "100%",
          }}
          extensions={[...extensions]}
          // height="100%"
          // theme={myTheme}
          // extensions={extensions}
          onChange={handleChangeRawContent}
          // style={{
          //   height: "100%",
          // }}
          // style={{
          //   fontSize: 14,
          // }}
        />
      )}
      {body?.mode === "formdata" && <FormData tabId={tabId} />}
      {body?.mode === "urlencoded" && <URLEncoded tabId={tabId} />}
      {body?.mode === "file" && <File tabId={tabId} />}
    </div>
  );
};

export default memo(Body);
