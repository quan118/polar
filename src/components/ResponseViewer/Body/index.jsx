import { memo, useState, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { EditorView } from "@codemirror/view";
import mime from "mime";
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
    <>
      <Header title="Body Response">
        <DropdownInput
          options={["raw", "json", "yaml", "xml"]}
          value={format}
          onChange={handleSelectFormat}
        />
      </Header>
      <CodeMirror
        value={JSON.stringify(response?.body || "", null, 2)}
        style={{ fontSize: 12 }}
        extensions={[EditorView.lineWrapping, ...extensions]}
      />
    </>
  );
};

export default memo(Body);
