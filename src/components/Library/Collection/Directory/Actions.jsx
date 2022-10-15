import Tippy from "@tippyjs/react";
import { memo, useCallback } from "react";
import { FolderPlus, FilePlus } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import uuid from "react-uuid";
import {
  createCollectionItemAction,
  createResponseItemAction,
} from "../../../../store/modules/collectionItem";

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
  }, [id, dispatch]);

  return (
    <div className="z-100 hidden items-center gap-4 text-gray-500 group-hover:flex">
      <Tippy content={"New Request"} arrow={false} animation="scale">
        <i className="cursor-pointer" onClick={handleAddResponse}>
          <FilePlus />
        </i>
      </Tippy>

      <Tippy content={"New Folder"} arrow={false} animation="scale">
        <i className="cursor-pointer" onClick={handleAddDirectory}>
          <FolderPlus />
        </i>
      </Tippy>
    </div>
  );
};
export default memo(Actions);
