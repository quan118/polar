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
import { useDispatch } from "react-redux";
import uuid from "react-uuid";
import {
  createCollectionItemAction,
  createResponseItemAction,
  deleteCollectionItemAction,
} from "@/store/modules/collectionItem";
const More = ({ id, isDir }) => {
  // const collectionItems = useSelector((store) =>
  //   _.get(store, `collectionItem.byId`)
  // );

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

  const handleDeleteItem = useCallback(() => {
    dispatch(deleteCollectionItemAction(id));
  }, [id, dispatch]);

  return (
    <div className="z-100 group flex items-center justify-between text-xs transition-all duration-200 hover:bg-gray-100 ">
      <Menu>
        <div>
          <Menu.Button className={"border-0 pr-0 text-gray-700 shadow-none"}>
            <Tippy content={"More"} arrow={false} animation="scale">
              <i className=" cursor-pointer text-sm">
                <ThreeDotsVertical />
              </i>
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
            className={`border-1 absolute right-0 ${
              isDir ? "mt-[11.5rem]" : "mt-[9rem]"
            } w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >
            {isDir && (
              <div>
                <Menu.Item>
                  {() => (
                    <div
                      className="mt-2 flex w-full cursor-pointer items-center justify-start gap-4  bg-white px-4 py-2 text-gray-700 transition-all duration-200 hover:border-0 hover:bg-gray-100"
                      onClick={handleAddResponse}
                    >
                      <i className="">
                        <FilePlus />
                      </i>
                      <span className="">New Request</span>
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {() => (
                    <div
                      className=" flex w-full cursor-pointer items-center justify-start gap-4  bg-white px-4 py-2 text-gray-700 transition-all duration-200 hover:border-0 hover:bg-gray-100"
                      onClick={handleAddDirectory}
                    >
                      <i className="">
                        <FolderPlus />
                      </i>
                      <span className="">New Folder</span>
                    </div>
                  )}
                </Menu.Item>
              </div>
            )}

            <Menu.Item>
              {() => (
                <div
                  className=" flex w-full cursor-pointer items-center justify-start gap-4  bg-white px-4 py-2 text-gray-700 transition-all duration-200 hover:border-0 hover:bg-gray-100"
                  onClick={() => {} /*setFolderEdit(folder) */}
                >
                  <i className="">
                    <PencilSquare />
                  </i>
                  <span className="">Edit</span>
                </div>
              )}
            </Menu.Item>
            {!isDir && (
              <Menu.Item>
                {() => (
                  <div
                    className=" flex w-full cursor-pointer items-center justify-start gap-4  bg-white px-4 py-2 text-gray-700 transition-all duration-200 hover:border-0 hover:bg-gray-100"
                    onClick={
                      () => {} /*duplicateFolder(collections, folder.objectId)*/
                    }
                  >
                    <i className="">
                      <Files />
                    </i>
                    <span className="">Duplicate</span>
                  </div>
                )}
              </Menu.Item>
            )}

            <Menu.Item>
              {() => (
                <div
                  className="mb-2 flex w-full cursor-pointer items-center justify-start gap-4  bg-white px-4 py-2 text-gray-700 transition-all duration-200 hover:border-0 hover:bg-gray-100"
                  onClick={handleDeleteItem}
                >
                  <i className="">
                    <Trash />
                  </i>
                  <span className="">Delete</span>
                </div>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
export default memo(More);
