import { memo, useState, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { EditorView } from "@codemirror/view";
import mime from "mime";
import { getDataPresentation } from "@/utils/common";
import Header from "../../Header";
import DropdownInput from "../../DropdownInput";

const langExtensions = {
  json: langs.json(),
  yaml: langs.yaml(),
  xml: langs.xml(),
};

const Body = ({ response }) => {
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

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Header title="Body Response">
        {!["jpeg", "png", "jpg"].includes(format) && (
          <DropdownInput
            options={["raw", "json", "yaml", "xml"]}
            value={format}
            onChange={handleSelectFormat}
          />
        )}
      </Header>
      {["jpeg", "png", "jpg"].includes(format) ? (
        <div>
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
          value={JSON.stringify(
            getDataPresentation(format, response?.body) || "",
            null,
            2
          )}
        />
      )}
    </div>
  );
};

export default memo(Body);
