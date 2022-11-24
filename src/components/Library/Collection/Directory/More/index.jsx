import {
  FolderPlus,
  FilePlus,
  ThreeDotsVertical,
  PencilSquare,
  Files,
  Trash,
} from "react-bootstrap-icons";

import { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import _ from "lodash";
import {
  createCollectionItemAction,
  createRequestItemAction,
  deleteCollectionItemAction,
} from "@/store/modules/collectionItem";
import {
  setEditItemIdAction,
  setCurrentRequestIdAction,
} from "@/store/modules/common";
import { addTabAction, syncTabAction } from "@/store/modules/tab";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import "./styles.css";

import { Tooltip } from "./../../../../Tooltip";

const More = ({ id, isDir }) => {
  const request = useSelector((store) =>
    _.get(store, `collectionItem.byId.${id}`)
  );

  const collectionItems = useSelector((store) =>
    _.get(store, "collectionItem.byId")
  );

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

  const handleAddResponse = useCallback(
    (e) => {
      e.stopPropagation();
      let d = {
        id: uuid(),
        type: "request",
        method: "GET",
        name: "new request",
        parentId: id,
      };

      dispatch(createRequestItemAction(d, id));
      dispatch(setEditItemIdAction(d.id));
      dispatch(addTabAction(d));
      dispatch(setCurrentRequestIdAction(d.id));
    },
    [id, dispatch]
  );

  const handleCopyResponse = useCallback(
    (e) => {
      e.stopPropagation();
      let d = _.cloneDeep(request);
      d.id = uuid();
      d.name += " copy";
      dispatch(createRequestItemAction(d, d.parentId));
      dispatch(addTabAction(d));
      dispatch(setCurrentRequestIdAction(d.id));
    },
    [id, request, dispatch]
  );

  const handleDeleteItem = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch(deleteCollectionItemAction(id));
      dispatch(syncTabAction(collectionItems));
    },
    [id, collectionItems, dispatch]
  );

  const handleEditItem = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch(setEditItemIdAction(id));
    },
    [id, dispatch]
  );

  return (
    <div className="group flex items-center justify-between text-xs transition-all duration-200 hover:bg-gray-100 ">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <div className="" aria-label="Customise options">
            <Tooltip content="More Actions..." avoidCollisions={true}>
              <ThreeDotsVertical />
            </Tooltip>
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="DropdownMenuContent alignOffset-start z-20"
            sideOffset={5}
            align={"end"}
            alignOffset={0}
          >
            {isDir && (
              <>
                <DropdownMenu.Item
                  className="DropdownMenuItem"
                  onSelect={handleAddResponse}
                >
                  <FilePlus className="mr-2" />
                  New Request
                  <div className="RightSlot">⌘+R</div>
                </DropdownMenu.Item>
                {id !== "drafts" && (
                  <DropdownMenu.Item
                    className="DropdownMenuItem"
                    onSelect={handleAddDirectory}
                  >
                    <FolderPlus className="mr-2" />
                    New Folder <div className="RightSlot">⌘+N</div>
                  </DropdownMenu.Item>
                )}
              </>
            )}
            {id !== "drafts" && (
              <DropdownMenu.Item
                className="DropdownMenuItem"
                onSelect={handleEditItem}
              >
                <PencilSquare className="mr-2" />
                Edit <div className="RightSlot">⌘+E</div>
              </DropdownMenu.Item>
            )}
            {!isDir && (
              <DropdownMenu.Item
                className="DropdownMenuItem"
                onSelect={handleCopyResponse}
              >
                <Files className="mr-2" />
                Duplicate <div className="RightSlot">⌘+U</div>
              </DropdownMenu.Item>
            )}
            {id !== "drafts" && (
              <DropdownMenu.Item
                className="DropdownMenuItem"
                onSelect={handleDeleteItem}
              >
                <Trash className="mr-2" />
                Delete <div className="RightSlot">⌘+D</div>
              </DropdownMenu.Item>
            )}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};

export default memo(More);
