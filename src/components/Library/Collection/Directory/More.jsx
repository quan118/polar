import {
  FolderPlus,
  FilePlus,
  ThreeDotsVertical,
  PencilSquare,
  Files,
  Trash,
} from "react-bootstrap-icons";
import { Fragment } from "react";
import Tippy from "@tippyjs/react";
import { Menu, Transition } from "@headlessui/react";
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
import { classNames } from "@/utils/common";
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
      <Menu>
        <div>
          <Menu.Button
            className={"border-0 pr-0 text-gray-700 shadow-none"}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Tippy content={"More"} arrow={false} animation="scale">
              <ThreeDotsVertical className=" cursor-pointer text-sm" />
            </Tippy>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={` border-1 absolute right-0 z-10 ${
              isDir ? "mt-[11.5rem]" : "mt-[9rem]"
            } w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >
            {isDir && (
              <>
                <Menu.Item>
                  <div
                    className="mt-2 flex w-full cursor-pointer items-center justify-start gap-4  bg-white px-4 py-2 text-gray-700 transition-all duration-200 hover:border-0 hover:bg-gray-100"
                    onClick={handleAddResponse}
                  >
                    <FilePlus />
                    <span>New Request</span>
                  </div>
                </Menu.Item>
                {id !== "drafts" && (
                  <Menu.Item>
                    <div
                      className=" flex w-full cursor-pointer items-center justify-start gap-4  bg-white px-4 py-2 text-gray-700 transition-all duration-200 hover:border-0 hover:bg-gray-100"
                      onClick={handleAddDirectory}
                    >
                      <FolderPlus />
                      <span>New Folder</span>
                    </div>
                  </Menu.Item>
                )}
              </>
            )}
            {id !== "drafts" && (
              <Menu.Item>
                <div
                  className={classNames(
                    "flex w-full cursor-pointer items-center justify-start gap-4  bg-white px-4 py-2 text-gray-700 transition-all duration-200 hover:border-0 hover:bg-gray-100",
                    isDir ? "" : "mt-2"
                  )}
                  onClick={handleEditItem}
                >
                  <PencilSquare />
                  <span>Edit</span>
                </div>
              </Menu.Item>
            )}

            {!isDir && (
              <Menu.Item>
                <div
                  className=" flex w-full cursor-pointer items-center justify-start gap-4  bg-white px-4 py-2 text-gray-700 transition-all duration-200 hover:border-0 hover:bg-gray-100"
                  onClick={handleCopyResponse}
                >
                  <Files />
                  <span>Duplicate</span>
                </div>
              </Menu.Item>
            )}
            {id !== "drafts" && (
              <Menu.Item>
                <div
                  className="mb-2 flex w-full cursor-pointer items-center justify-start gap-4  bg-white px-4 py-2 text-gray-700 transition-all duration-200 hover:border-0 hover:bg-gray-100"
                  onClick={handleDeleteItem}
                >
                  <Trash />
                  <span>Delete</span>
                </div>
              </Menu.Item>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
export default memo(More);
