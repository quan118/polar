import { Folder } from "./Folder";
import { BsQuestionCircle, BsArchive, BsPlus } from "react-icons/bs";
import Tippy from "@tippyjs/react";
import { useCollections } from "../Providers/Collections-provider";

export function Collection() {
  const { collections, openFolder, addFolder } = useCollections();
  return (
    <div className="flex max-h-screen w-full flex-col text-gray-700">
      <div className="flex items-center border-b pr-4">
        <input
          type="text"
          className="w-full bg-white py-2 text-xs font-bold text-gray-700 shadow-none"
          placeholder="Search"
        />
      </div>
      <div className="flex w-full items-center justify-between border-b py-2 px-4">
        <div
          className="flex cursor-pointer items-center gap-1 text-gray-700"
          onClick={() => addFolder(collections, null)}
        >
          <i className="">
            <BsPlus />
          </i>
          <span className="text-xs">New</span>
        </div>
        <div className="flex items-center gap-x-2">
          <Tippy content={"Wiki"} arrow={false} animation="scale">
            <i className="cursor-pointer px-2 text-gray-500 opacity-80 transition-none duration-200 hover:opacity-100">
              <BsQuestionCircle />
            </i>
          </Tippy>

          <Tippy content={"Import/Export"} arrow={false} animation="scale">
            <i className="cursor-pointer px-1 text-gray-500 opacity-80 transition-none duration-200 hover:opacity-100">
              <BsArchive />
            </i>
          </Tippy>
        </div>
      </div>
      <div className="h-full w-full overflow-y-auto">
        {collections.map((item) => (
          <Folder
            folder={item}
            key={item.objectId}
            openFolder={(folder, id) => openFolder(folder, id)}
          />
        ))}
      </div>
    </div>
  );
}
