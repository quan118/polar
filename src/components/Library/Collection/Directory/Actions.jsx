import Tippy from "@tippyjs/react";
import { memo, useCallback } from "react";
import { FolderPlus, FilePlus } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import uuid from "react-uuid";
import {
  createCollectionItemAction,
  createResponseItemAction,
  updateCollectionItemCollapseKey,
} from "@/store/modules/collectionItem";
import {
  setEditItemIdAction,
  setCurrentRequestIdAction,
} from "@/store/modules/common";
import { addTabAction } from "@/store/modules/tab";

const Actions = ({ id }) => {
  const dispatch = useDispatch();

  const handleAddDirectory = useCallback(() => {
    let d = {
      id: uuid(),
      type: "group",
      name: "new folder",
      subGroups: [],
      requests: [],
      parentId: id,
    };

    dispatch(createCollectionItemAction(d, id));
    dispatch(updateCollectionItemCollapseKey(id, true));
    dispatch(setEditItemIdAction(d.id));
  }, [id, dispatch]);

  const handleAddResponse = useCallback(() => {
    let d = {
      id: uuid(),
      type: "request",
      method: "GET",
      name: "new request",
      parentId: id,
    };

    dispatch(createResponseItemAction(d, id));
    dispatch(updateCollectionItemCollapseKey(id, true));
    dispatch(setEditItemIdAction(d.id));
    dispatch(addTabAction(d));
    dispatch(setCurrentRequestIdAction(d.id));
  }, [id, dispatch]);

  return (
    <div className="z-100 hidden items-center gap-4 text-gray-500 group-hover:flex">
      <Tippy content={"New Request"} arrow={false} animation="scale">
        <FilePlus className="cursor-pointer" onClick={handleAddResponse} />
      </Tippy>

      <Tippy content={"New Folder"} arrow={false} animation="scale">
        <FolderPlus className="cursor-pointer" onClick={handleAddDirectory} />
      </Tippy>
    </div>
  );
};
export default memo(Actions);
