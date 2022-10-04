import {
  BsFolder,
  BsFolder2Open,
  BsFolderPlus,
  BsFilePlus,
  BsThreeDotsVertical,
  BsPencilSquare,
  BsFiles,
  BsTrash,
} from "react-icons/bs";
import { Menu, Transition } from "@headlessui/react";
import { useCollections } from "../Providers/Collections-provider";
import { EditFolderDialog } from "./EditFolderDialog";
import { EditRestDialog } from "./EditRestDialog";
import { Fragment } from "react";
import Tippy from "@tippyjs/react";

export function Folder({ folder }) {
  const {
    collections,
    openFolder,
    addFolder,
    addRest,
    selectRest,
    deleteRest,
    deleteFolder,
    duplicateRest,
    duplicateFolder,
    setRestEdit,
    setFolderEdit,
  } = useCollections();
  return (
    <div className="">
      <div className="group flex cursor-pointer items-center justify-between px-3 py-[0.1rem]  duration-200 hover:bg-gray-100">
        <div
          className="group flex h-full w-full cursor-pointer items-center gap-2"
          onClick={() => openFolder(folder, folder?.objectId)}
        >
          <i className="">
            {folder?.isOpen ? <BsFolder2Open /> : <BsFolder />}
          </i>
          <span className="text-xs">{folder?.label}</span>
        </div>
        <div className="z-100 hidden items-center gap-4 text-gray-500 group-hover:flex">
          <Tippy content={"New Request"} arrow={false} animation="scale">
            <i className="cursor-pointer" onClick={() => addRest(folder)}>
              <BsFilePlus />
            </i>
          </Tippy>

          <Tippy content={"New Folder"} arrow={false} animation="scale">
            <i className="cursor-pointer" onClick={() => addFolder(folder)}>
              <BsFolderPlus />
            </i>
          </Tippy>
        </div>
        <div className="group z-10 flex items-center justify-between text-xs transition-all duration-200 hover:bg-gray-100 ">
          <Menu>
            <div>
              <Menu.Button
                className={"border-0 pr-0 text-gray-700 shadow-none"}
              >
                <Tippy content={"More"} arrow={false} animation="scale">
                  <i className=" cursor-pointer text-sm">
                    <BsThreeDotsVertical />
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
                className={
                  "border-1 absolute right-0 mt-56 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                }
              >
                <Menu.Item>
                  {() => (
                    <div
                      className="mt-2 flex w-full cursor-pointer items-center justify-start gap-4  bg-white px-4 py-2 text-gray-700 transition-all duration-200 hover:border-0 hover:bg-gray-100"
                      onClick={() => addRest(folder)}
                    >
                      <i className="">
                        <BsFilePlus />
                      </i>
                      <span className="">New Request</span>
                    </div>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {() => (
                    <div
                      className=" flex w-full cursor-pointer items-center justify-start gap-4  bg-white px-4 py-2 text-gray-700 transition-all duration-200 hover:border-0 hover:bg-gray-100"
                      onClick={() => addFolder(folder)}
                    >
                      <i className="">
                        <BsFolderPlus />
                      </i>
                      <span className="">New Folder</span>
                    </div>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {() => (
                    <div
                      className=" flex w-full cursor-pointer items-center justify-start gap-4  bg-white px-4 py-2 text-gray-700 transition-all duration-200 hover:border-0 hover:bg-gray-100"
                      onClick={() => setFolderEdit(folder)}
                    >
                      <i className="">
                        <BsPencilSquare />
                      </i>
                      <span className="">Edit</span>
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {() => (
                    <div
                      className=" flex w-full cursor-pointer items-center justify-start gap-4  bg-white px-4 py-2 text-gray-700 transition-all duration-200 hover:border-0 hover:bg-gray-100"
                      onClick={() =>
                        duplicateFolder(collections, folder.objectId)
                      }
                    >
                      <i className="">
                        <BsFiles />
                      </i>
                      <span className="">Duplicate</span>
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {() => (
                    <div
                      className="mb-2 flex w-full cursor-pointer items-center justify-start gap-4  bg-white px-4 py-2 text-gray-700 transition-all duration-200 hover:border-0 hover:bg-gray-100"
                      onClick={() => deleteFolder(collections, folder.objectId)}
                    >
                      <i className="">
                        <BsTrash />
                      </i>
                      <span className="">Delete</span>
                    </div>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      {folder?.isOpen && (
        <div className="ml-5 border-l-2 border-gray-200">
          {folder?.folder?.length > 0 &&
            folder?.folder?.map((item) => {
              return (
                <Folder
                  folder={item}
                  openFolder={() => openFolder(item, item?.objectId)}
                  key={item.objectId}
                />
              );
            })}
          <div className="">
            {folder.rests.length > 0 &&
              folder.rests.map((item) => {
                return (
                  <div
                    className="group flex items-center justify-between text-xs transition-all duration-200 hover:bg-gray-100 "
                    key={item.objectId}
                  >
                    <div
                      className="ml-0 flex w-full cursor-pointer items-center gap-2 py-2 text-xs hover:font-bold"
                      key={item.objectId}
                      onClick={() => selectRest(item)}
                    >
                      <span
                        className={`${
                          COLOR_TYPE[`${item.type}`]
                        } min-w-[50px] text-center`}
                      >
                        {item.type}
                      </span>
                      <span className={``}>{item.name}</span>
                      {item.selected && (
                        <span className="relative z-0 mx-3 flex h-1.5 w-1.5 flex-shrink-0">
                          <span className="absolute inline-flex h-full w-full flex-shrink-0 animate-ping rounded-full bg-green-500 opacity-75"></span>
                          <span className="relative inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500"></span>
                        </span>
                      )}
                    </div>
                    <div className="group-hover:block">
                      <Menu>
                        <div>
                          <Menu.Button
                            className={
                              "border-0 pr-3 text-gray-700 shadow-none"
                            }
                          >
                            <Tippy
                              content={"More"}
                              arrow={false}
                              animation="scale"
                            >
                              <i className=" cursor-pointer text-sm">
                                <BsThreeDotsVertical />
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
                            className={
                              "border-1 absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            }
                          >
                            <Menu.Item>
                              {() => (
                                <div
                                  className="mt-2 flex w-full cursor-pointer items-center justify-start gap-4  bg-white px-4 py-2 text-gray-700 transition-all duration-200 hover:border-0 hover:bg-gray-100"
                                  onClick={() => setRestEdit(item)}
                                >
                                  <i className="">
                                    <BsPencilSquare />
                                  </i>
                                  <span className="">Edit</span>
                                </div>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {() => (
                                <div
                                  className="flex w-full cursor-pointer items-center justify-start gap-4  bg-white px-4 py-2 text-gray-700 transition-all duration-200 hover:border-0 hover:bg-gray-100"
                                  onClick={() =>
                                    duplicateRest(folder, item.objectId)
                                  }
                                >
                                  <i className="">
                                    <BsFiles />
                                  </i>
                                  <span className="">Duplicate</span>
                                </div>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {() => (
                                <div
                                  className="mb-2 flex w-full cursor-pointer items-center justify-start gap-4  bg-white px-4 py-2 text-gray-700 transition-all duration-200 hover:border-0 hover:bg-gray-100"
                                  onClick={() =>
                                    deleteRest(folder, item.objectId)
                                  }
                                >
                                  <i className="">
                                    <BsTrash />
                                  </i>
                                  <span className="">Delete</span>
                                </div>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      <EditRestDialog />
      <EditFolderDialog />
    </div>
  );
}
const COLOR_TYPE = {
  GET: "text-green-500",
  POST: "text-yellow-600",
};
