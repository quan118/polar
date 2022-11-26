import { memo, useCallback } from "react";
import { open } from "@tauri-apps/api/dialog";
import { Directory } from "./Directory/Directory";
import { QuestionCircle, Archive, Plus } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import {
  createCollectionItemAction,
  importCollectionAction,
} from "@/store/modules/collectionItem";
import { setEditItemIdAction } from "@/store/modules/common";
import { getOutermostItems } from "@/utils/common";
import uuid from "react-uuid";
import { Tooltip } from "@/components/Tooltip";

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
    dispatch(setEditItemIdAction(d.id));
  }, [dispatch]);

  const handleImportCollection = useCallback(async () => {
    const filepath = await open();
    console.log("OPEN filepaht:", filepath);

    dispatch(importCollectionAction(filepath));
  }, []);

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
          <Tooltip content={"Wiki"}>
            <QuestionCircle className="w-5 cursor-pointer opacity-80 transition-none duration-200 hover:opacity-100" />
          </Tooltip>
          <Tooltip content={"Import/Export"}>
            <Archive
              className="w-5 cursor-pointer opacity-80 transition-none duration-200 hover:opacity-100"
              onClick={handleImportCollection}
            />
          </Tooltip>
        </div>
      </div>
      <div className="h-full w-full overflow-y-auto">
        {getOutermostItems(collectionItems).map((item) => (
          <Directory id={item.id} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default memo(Collection);
