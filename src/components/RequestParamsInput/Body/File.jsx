import { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { open } from "@tauri-apps/api/dialog";
import _ from "lodash";
import { X } from "react-bootstrap-icons";
import { updateTabItemByKeyPathLevel2Action } from "@/store/modules/tab";

const File = ({ tabId }) => {
  const dispatch = useDispatch();
  const selectedFile = useSelector((store) =>
    _.get(store, `tab.byId.${tabId}.body.file.src`)
  );
  const handleSelectFile = useCallback(async () => {
    const selected = await open({
      multiple: false,
      // filters: [{
      //   name: 'Image',
      //   extensions: ['*', 'jpeg']
      // }]
    });

    dispatch(
      updateTabItemByKeyPathLevel2Action(tabId, "body", "file", {
        src: selected,
      })
    );
  }, [dispatch]);

  const handleClearFile = useCallback(() => {
    dispatch(
      updateTabItemByKeyPathLevel2Action(tabId, "body", "file", { src: null })
    );
  }, [dispatch]);

  return (
    <div className="flex border-t py-2">
      {selectedFile && (
        <div className="flex items-center rounded-md border border-green-500 px-1 text-slate-500">
          <span className="text-sm">{selectedFile}</span>
          <X size={14} className="ml-2" onClick={handleClearFile} />
        </div>
      )}
      {!selectedFile && (
        <button
          type="button"
          className="mx-2 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={handleSelectFile}
        >
          Select File
        </button>
      )}
    </div>
  );
};

export default memo(File);
