import { Folder, Folder2Open } from "react-bootstrap-icons";
import { updateCollectionItemCollapseKey } from "../../../../store/modules/collectionItem";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import Request from "./Request";
import Actions from "./Actions";
import More from "./More";
import { useCallback } from "react";

const DirectoryTree = ({ data }) => {
  return (
    <div className="ml-5 border-l-2 border-gray-200">
      {data?.subGroups?.length > 0 &&
        data?.subGroups?.map((id) => <Directory id={id} key={id} />)}

      <div className="">
        {data?.requests.length > 0 &&
          data?.requests.map((id) => (
            <Request key={id} id={id} selected={false} />
          ))}
      </div>
    </div>
  );
};

export function Directory({ id }) {
  const dispatch = useDispatch();
  const data = useSelector((store) =>
    _.get(store, `collectionItem.byId[${id}]`)
  );
  const handleToggle = useCallback(() => {
    // set isOpen = true|false
    // update to store
    let current = data.collapse;
    dispatch(updateCollectionItemCollapseKey(id, !current));
  }, [id, dispatch, data.collapse]);
  return (
    <div className="">
      <div className="group flex cursor-pointer items-center justify-between px-3 py-[0.1rem]  duration-200 hover:bg-gray-100">
        <div
          className="group flex h-full w-full cursor-pointer items-center gap-2"
          onClick={handleToggle}
        >
          <i className="">{data?.collapse ? <Folder2Open /> : <Folder />}</i>
          <span className="text-xs">{data?.name}</span>
        </div>
        <Actions id={id} />
        <More id={id} isDir={true} />
      </div>
      {data?.collapse && <DirectoryTree data={data} />}
    </div>
  );
}
