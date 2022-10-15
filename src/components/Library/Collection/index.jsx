import { Directory } from "./Directory/Directory";
import { QuestionCircle, Archive, Plus } from "react-bootstrap-icons";
import Tippy from "@tippyjs/react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { createCollectionItemAction } from "@/store/modules/collectionItem";
import { EditDialog } from "./Directory/EditDialog";
import uuid from "react-uuid";
export function Collection() {
  const collectionItems = useSelector((store) =>
    _.get(store, `collectionItem.byId`)
  );

  const dispatch = useDispatch();
  const handleAddDirectory = () => () => {
    let d = {
      id: uuid(),
      type: "group",
      name: "new folder",
      subGroups: [],
      requests: [],
    };
    console.log("New group", d);
    dispatch(createCollectionItemAction(d));
  };

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
          onClick={handleAddDirectory()}
        >
          <i className="">
            <Plus />
          </i>
          <span className="text-xs">New</span>
        </div>
        <div className="flex items-center gap-x-2">
          <Tippy content={"Wiki"} arrow={false} animation="scale">
            <i className="cursor-pointer px-2 text-gray-500 opacity-80 transition-none duration-200 hover:opacity-100">
              <QuestionCircle />
            </i>
          </Tippy>

          <Tippy content={"Import/Export"} arrow={false} animation="scale">
            <i className="cursor-pointer px-1 text-gray-500 opacity-80 transition-none duration-200 hover:opacity-100">
              <Archive />
            </i>
          </Tippy>
        </div>
      </div>
      <div className="h-full w-full overflow-y-auto">
        {Object.keys(collectionItems)
          .map((key) => collectionItems[key])
          .filter((item) => item.type === "group")
          .filter((item) => !item.parentId)
          .map((item) => (
            <Directory
              id={item.id}
              // folder={item}
              key={item.id}
              // openFolder={(folder, id) => openFolder(folder, id)}
            />
          ))}
      </div>
      <EditDialog visible={false} type={"New Folder"} />
    </div>
  );
}
