import { memo, useState, useCallback } from "react";
import { Files } from "react-bootstrap-icons";
import { writeText } from "@tauri-apps/api/clipboard";
import { Toast } from "@/components";
import Header from "../Header";
import KVForm from "../KVForm";

const Headers = ({ headers }) => {
  const [showToast, setShowToast] = useState(false);

  const handleCopyHeaders = useCallback(async () => {
    const objectToCopy = headers.map((e) => ({ key: e.key, value: e.value }));
    await writeText(JSON.stringify(objectToCopy));
    setShowToast(true);
  }, [headers]);

  const handleCopyRow = useCallback(
    (item) => async () => {
      await writeText(item.value);
      setShowToast(true);
    },
    []
  );

  return (
    <>
      <Header title="Header List">
        <button onClick={handleCopyHeaders}>
          <Files size={18} color="gray" />
        </button>
      </Header>
      <KVForm data={headers} onCopy={handleCopyRow} readOnly />
      <Toast
        label="Copied to clipboard"
        open={showToast}
        setOpen={setShowToast}
      />
    </>
  );
};

export default memo(Headers);
