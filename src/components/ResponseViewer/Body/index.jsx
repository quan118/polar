import { memo, useState, useCallback, useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { EditorView } from "@codemirror/view";
import mime from "mime";
import { Files } from "react-bootstrap-icons";
import { writeText } from "@tauri-apps/api/clipboard";
import { getDataPresentation } from "@/utils/common";
import { Toast } from "@/components";
import Header from "../../Header";
import DropdownInput from "../../DropdownInput";

const langExtensions = {
  json: langs.json(),
  yaml: langs.yaml(),
  xml: langs.xml(),
  html: langs.html(),
};

const getFormattedCodeMirrorValue = (data, format) => {
  switch (format) {
    case "json":
      try {
        return JSON.stringify(getDataPresentation(format, data) || "", null, 2);
      } catch {
        return getDataPresentation("raw", data);
      }
    case "html":
    case "xml":
      return getDataPresentation(format, data);
    default:
      return getDataPresentation(format, data);
  }
};

const Body = ({ response }) => {
  const [showToast, setShowToast] = useState(false);
  const contentType = response?.header?.find(
    (item) => item["content-type"] !== undefined
  )?.["content-type"];

  const [format, setFormat] = useState(
    contentType ? mime.getExtension(contentType) : "raw"
  );

  const [extensions, setExtensions] = useState(
    langExtensions[format] ? [langExtensions[format]] : []
  );

  const handleSelectFormat = useCallback(
    (format) => {
      setFormat(format);
      switch (format) {
        case "json":
          setExtensions([langs.json()]);
          break;
        case "yaml":
          setExtensions([langs.yaml()]);
          break;
        case "xml":
          setExtensions([langs.xml()]);
          break;
        default:
          setExtensions([]);
          break;
      }
    },
    [setFormat, setExtensions]
  );

  const codeMirrorValue = useMemo(() => {
    if (["jpeg", "png", "jpg", "webp"].includes(format)) {
      return "";
    } else {
      return getFormattedCodeMirrorValue(response?.body, format);
    }
  }, [response?.body, format]);

  const handleCopyBodyResponse = useCallback(async () => {
    await writeText(codeMirrorValue);
    setShowToast(true);
  }, [codeMirrorValue]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Header title="Body Response">
        {!["jpeg", "png", "jpg", "webp"].includes(format) && (
          <>
            <DropdownInput
              options={["raw", "json", "yaml", "xml"]}
              value={format}
              onChange={handleSelectFormat}
            />
            <button onClick={handleCopyBodyResponse}>
              <Files size={18} color="gray" />
            </button>
          </>
        )}
      </Header>
      {["jpeg", "png", "jpg", "webp"].includes(format) ? (
        <div className="overflow-scroll">
          <img src={getDataPresentation(format, response?.body)} />
        </div>
      ) : (
        <CodeMirror
          style={{
            fontSize: 12,
            overflow: "scroll",
            height: "100%",
          }}
          extensions={[EditorView.lineWrapping, ...extensions]}
          editable={false}
          value={codeMirrorValue}
        />
      )}
      <Toast
        label="Copied to clipboard"
        open={showToast}
        setOpen={setShowToast}
      />
    </div>
  );
};

export default memo(Body);
