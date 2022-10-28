import { memo, useCallback, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import More from "./More";
import _ from "lodash";
import {
  setCurrentRequestIdAction,
  setEditItemIdAction,
} from "@/store/modules/common";
import { updateCollectionItemAction } from "@/store/modules/collectionItem";
import { addTabAction, updateTabAction } from "@/store/modules/tab";

const Request = ({ id }) => {
  const request = useSelector((store) =>
    _.get(store, `collectionItem.byId.${id}`)
  );

  const curentRequestId = useSelector((store) =>
    _.get(store, "common.currentRequestId")
  );

  const dispatch = useDispatch();
  const handleSetRequestActive = useCallback(() => {
    dispatch(setCurrentRequestIdAction(id));
    dispatch(addTabAction(request));
  }, [id, request, dispatch]);

  const handleEditItem = useCallback(
    (itemId) => {
      dispatch(setEditItemIdAction(itemId));
    },
    [dispatch]
  );
  const editItemId = useSelector((store) => _.get(store, `common.editItemId`));

  const handleUpdateItemName = useCallback(
    (_name) => {
      dispatch(updateCollectionItemAction(id, { name: _name }));
      dispatch(updateTabAction({ id: id, name: _name }));
    },
    [id, dispatch]
  );
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handleEditItem("");
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

  const selectAllTextbox = () => {
    if (typeof window !== "undefined") {
      window.document.getElementById("textbox")?.select();
    }
  };

  useEffect(() => {
    selectAllTextbox();
  }, [editItemId]);

  return (
    <div
      className="group flex items-center justify-between pr-3 text-xs transition-all duration-200 hover:bg-gray-100 "
      key={id}
    >
      <div
        className="ml-0 flex w-full cursor-pointer items-center gap-2 py-2 text-xs hover:font-bold"
        key={id}
        onClick={() => {
          handleSetRequestActive();
        }}
      >
        <span
          className={`${
            COLOR_TYPE[`${request.method}`]
          } min-w-[50px] text-center`}
        >
          {request.method}
        </span>
        {editItemId === id ? (
          <form
            action=""
            className=""
            onSubmit={() => {
              handleEditItem("");
            }}
          >
            <input
              type="text"
              className="w-full rounded border border-gray-300 py-1 px-1 text-xs shadow-none"
              value={request?.name}
              onChange={(e) => {
                e.preventDefault();
                handleUpdateItemName(e.target.value);
              }}
              id="textbox"
              ref={wrapperRef}
            />
          </form>
        ) : (
          <span className={``}>{request.name}</span>
        )}

        {curentRequestId === id && (
          <span className="relative mx-3 flex h-1.5 w-1.5 flex-shrink-0">
            <span className="absolute inline-flex h-full w-full flex-shrink-0 animate-ping rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500"></span>
          </span>
        )}
      </div>

      <More id={id} isDir={false} />
    </div>
  );
};

export default memo(Request);

const COLOR_TYPE = {
  GET: "text-green-500",
  POST: "text-yellow-600",
};
