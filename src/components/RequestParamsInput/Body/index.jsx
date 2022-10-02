import { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import DropdownInput from "../../DropdownInput";
import FormData from "./FormData";
import URLEncoded from "./URLEncoded";
import File from "./File";
import { updateCollectionItemBodyKeyAction } from "../../../store/modules/collectionItem";

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
  },
  styles: [],
});

const ContentType = ({
  selected,
  onChangeType,
  selectedLanguage,
  onChangeLanguage,
}) => {
  return (
    <div className="flex flex-1 items-center border-b px-2 ">
      <label className="mr-4 text-xs font-semibold text-slate-500">
        Content Type
      </label>
      <DropdownInput
        options={["none", "raw", "form-data", "urlencoded", "file"]}
        selected={selected}
        onChange={onChangeType}
        buttonClassName="w-24"
      />
      {selected === "raw" && (
        <DropdownInput
          options={["text", "json", "xml", "yaml"]}
          selected={selectedLanguage}
          onChange={onChangeLanguage}
        />
      )}
    </div>
  );
};

const Body = ({ requestId }) => {
  const dispatch = useDispatch();
  const body = useSelector((store) =>
    _.get(store, `collectionItem.byId[${requestId}].body`)
  );

  const handleChangeType = useCallback(
    (mode) => {
      dispatch(updateCollectionItemBodyKeyAction(requestId, "mode", mode));
    },
    [dispatch]
  );

  const handleChangeLanguage = useCallback(
    (value) => {
      dispatch(
        updateCollectionItemBodyKeyAction(requestId, "options", {
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
      dispatch(updateCollectionItemBodyKeyAction(requestId, "raw", value));
    },
    [dispatch]
  );

  return (
    <>
      <ContentType
        selected={body?.mode || "none"}
        onChangeType={handleChangeType}
        selectedLanguage={body?.options?.raw?.language || "text"}
        onChangeLanguage={handleChangeLanguage}
      />
      {body?.mode === "raw" && (
        <CodeMirror
          value={body?.raw}
          // height="100%"
          theme={myTheme}
          // extensions={extensions}
          onChange={handleChangeRawContent}
          // style={{
          //   height: "100%",
          // }}
          style={{
            fontSize: 14,
          }}
        />
      )}
      {body?.mode === "form-data" && <FormData requestId={requestId} />}
      {body?.mode === "urlencoded" && <URLEncoded requestId={requestId} />}
      {body?.mode === "file" && <File requestId={requestId} />}
    </>
  );
};

export default memo(Body);
