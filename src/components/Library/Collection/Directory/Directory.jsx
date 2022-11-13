import { Folder, Folder2Open } from "react-bootstrap-icons";
import {
  updateCollectionItemByKeyPathLevel1,
  updateCollectionItemAction,
} from "@/store/modules/collectionItem";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import Request from "./Request";
import Actions from "./Actions";
import More from "./More";
import { useCallback, useRef, useEffect } from "react";
import { setEditItemIdAction } from "@/store/modules/common";

const DirectoryTree = ({ subGroups, requests }) => {
  return (
    <div className=" ml-5 border-l-2 border-gray-200">
      {subGroups?.length > 0 &&
        subGroups?.map((id) => <Directory id={id} key={id} />)}

      <>
        {requests?.length > 0 &&
          requests.map((id) => <Request key={id} id={id} selected={false} />)}
      </>
    </div>
  );
};

export function Directory({ id }) {
  const dispatch = useDispatch();
  const data = useSelector((store) =>
    _.get(store, `collectionItem.byId[${id}]`)
  );

  const handleToggle = useCallback(() => {
    const current = data.expanded;
    console.log("[handleToggle] current:", current);
    dispatch(updateCollectionItemByKeyPathLevel1(id, "expanded", !current));
  }, [id, dispatch, data.expanded]);

  const handleFinishEditItem = useCallback(() => {
    dispatch(setEditItemIdAction(undefined));
  }, [dispatch, id]);

  const editItemId = useSelector((store) => _.get(store, `common.editItemId`));

  const handleUpdateItemName = useCallback(
    (event) => {
      dispatch(updateCollectionItemAction(id, { name: event.target.value }));
    },
    [dispatch]
  );

  // -- TODO: Consider to refactor
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handleFinishEditItem();
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  // --

  const editting = editItemId === id;

  useEffect(() => {
    // if Directory name is switched from normal state -> editting state, select all texts in input box
    if (typeof window !== "undefined" && editItemId === id) {
      window.document.getElementById("textbox")?.select();
    }
  }, [editItemId]);

  return (
    <>
      <div className=" group flex cursor-pointer items-center justify-between px-3 py-[0.1rem]  duration-200 hover:bg-gray-100">
        <div
          className="group flex h-full w-full cursor-pointer items-center gap-2"
          onClick={handleToggle}
        >
          {data?.expanded ? <Folder2Open /> : <Folder />}
          {editting ? (
            <form onSubmit={handleFinishEditItem}>
              <input
                type="text"
                className="w-full rounded border border-gray-300 py-1 px-1 text-xs shadow-none"
                value={data?.name}
                onChange={handleUpdateItemName}
                id="textbox"
                ref={wrapperRef}
              />
            </form>
          ) : (
            <span className="text-xs">{data?.name}</span>
          )}
        </div>
        {!editting && <Actions id={id} />}
        <More id={id} isDir={true} />
      </div>
      {data?.expanded && (
        <DirectoryTree subGroups={data.subGroups} requests={data.requests} />
      )}
    </>
  );
}
