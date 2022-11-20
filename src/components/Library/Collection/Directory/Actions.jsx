import Tippy from "@tippyjs/react";
import { memo, useCallback } from "react";
import { FolderPlus, FilePlus } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import uuid from "react-uuid";
import {
  createCollectionItemAction,
  createNewRequestAction,
} from "@/store/modules/collectionItem";
import { setEditItemIdAction } from "@/store/modules/common";

const Actions = ({ id }) => {
  const dispatch = useDispatch();

  const handleAddDirectory = useCallback(
    (e) => {
      e.stopPropagation();
      let d = {
        id: uuid(),
        type: "group",
        name: "new folder",
        subGroups: [],
        requests: [],
        parentId: id,
      };

      dispatch(createCollectionItemAction(d, id));
      dispatch(setEditItemIdAction(d.id));
    },
    [id, dispatch]
  );

  const handleAddRequest = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch(createNewRequestAction(uuid(), "New request", id));
    },
    [id, dispatch]
  );

  return (
    <div className="z-100 hidden items-center gap-3 pr-3 text-gray-500 group-hover:flex">
      <Tippy content={"New Request"} arrow={false} animation="scale">
        <FilePlus className="cursor-pointer" onClick={handleAddRequest} />
      </Tippy>
      {id !== "drafts" && (
        <Tippy content={"New Folder"} arrow={false} animation="scale">
          <FolderPlus className="cursor-pointer" onClick={handleAddDirectory} />
        </Tippy>
      )}
    </div>
  );
};
export default memo(Actions);
