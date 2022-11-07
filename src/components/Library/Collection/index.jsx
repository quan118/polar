import { memo, useCallback } from "react";
import { Directory } from "./Directory/Directory";
import { QuestionCircle, Archive, Plus } from "react-bootstrap-icons";
import Tippy from "@tippyjs/react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import {
  createCollectionItemAction,
  updateCollectionItemCollapseKey,
} from "@/store/modules/collectionItem";
import { EditDialog } from "./Directory/EditDialog";
import { setEditItemIdAction } from "@/store/modules/common";
import uuid from "react-uuid";

const getOutermostItems = (itemsInDict) =>
  Object.keys(itemsInDict)
    .map((key) => itemsInDict[key])
    .filter((item) => item.type === "group")
    .filter((item) => !item.parentId)
    .filter((item) => item.id !== "drafts"); // don't show drafts folder

const Collection = () => {
  const dispatch = useDispatch();

  const collectionItems = useSelector((store) =>
    _.get(store, `collectionItem.byId`)
  );

  const handleAddDirectory = useCallback(() => {
    let d = {
      id: uuid(),
      type: "group",
      name: "new folder",
      subGroups: [],
      requests: [],
    };
    dispatch(createCollectionItemAction(d));
    dispatch(updateCollectionItemCollapseKey(d.id, true));
    dispatch(setEditItemIdAction(d.id));
  }, [dispatch]);

  return (
    <div className="flex max-h-screen w-full flex-col text-gray-700">
      <input
        type="text"
        className="w-full rounded-none border-b-gray-200 bg-white py-2 text-xs font-bold text-gray-700 shadow-none"
        placeholder="Search"
      />
      <div className="flex w-full items-center justify-between border-b py-2 px-4">
        <div
          className="flex cursor-pointer items-center gap-1 text-gray-700"
          onClick={handleAddDirectory}
        >
          <Plus />
          <span className="text-xs">New</span>
        </div>

        <div className="flex items-center gap-x-2">
          <Tippy content={"Wiki"} arrow={false} animation="scale">
            <QuestionCircle className="w-5 cursor-pointer opacity-80 transition-none duration-200 hover:opacity-100" />
          </Tippy>

          <Tippy content={"Import/Export"} arrow={false} animation="scale">
            <Archive className="w-5 cursor-pointer opacity-80 transition-none duration-200 hover:opacity-100" />
          </Tippy>
        </div>
      </div>
      <div className="h-full w-full overflow-y-auto">
        {getOutermostItems(collectionItems).map((item) => (
          <Directory id={item.id} key={item.id} />
        ))}
      </div>
      <EditDialog visible={false} type={"New Folder"} />
    </div>
  );
};

export default memo(Collection);
