import { memo, useCallback } from "react";
import { X } from "react-bootstrap-icons";
import { deleteTabAction, setCurrentTabAction } from "@/store/modules/tab";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { setCurrentRequestIdAction } from "@/store/modules/common";
import { classNames } from "@/utils/common";

const Tab = ({ id, selected, onSelect, onDelete }) => {
  const name = useSelector((store) => _.get(store, `tab.byId[${id}].name`));
  return (
    <button
      type="button"
      className={classNames(
        "flex h-7 items-center justify-between gap-x-1 rounded-md bg-slate-100 px-2 shadow-none",
        selected && "bg-slate-300"
      )}
      onClick={onSelect(id)}
    >
      <span className="min-w-[2rem] max-w-[6rem] truncate">{name}</span>
      <X className="h-4 w-4" onClick={onDelete(id)} />
    </button>
  );
};

const Tabbar = () => {
  const tabIds = useSelector((store) => _.get(store, `tab.byArrayIds`));
  const currentTabId = useSelector((store) => store.tab.currentTabId);
  const dispatch = useDispatch();
  const handleSetRequestActive = useCallback(
    (itemId) => () => {
      dispatch(setCurrentRequestIdAction(itemId));
      dispatch(setCurrentTabAction(itemId));
    },
    [dispatch]
  );

  const handleDeleteTabAction = useCallback(
    (id) => (evt) => {
      evt.stopPropagation();
      if (tabIds.length === 1) {
        dispatch(setCurrentTabAction(undefined));
        dispatch(setCurrentRequestIdAction(undefined));
      } else if (id === currentTabId) {
        const tabIndex = tabIds.indexOf(id);

        if (tabIndex === tabIds.length - 1) {
          dispatch(setCurrentRequestIdAction(tabIds[tabIndex - 1]));
          dispatch(setCurrentTabAction(tabIds[tabIndex - 1]));
        } else {
          dispatch(setCurrentTabAction(tabIds[tabIndex + 1]));
          dispatch(setCurrentRequestIdAction(tabIds[tabIndex + 1]));
        }
      }
      dispatch(deleteTabAction(id));
    },
    [dispatch, tabIds, currentTabId]
  );
  console.log("[Tabbar] tabs: ", tabIds);
  return (
    // TODO: research resize tabbar and button for add new tab bar

    <div className="flex items-center gap-x-1 overflow-x-auto bg-white py-1 text-xs text-gray-800 scrollbar-hide">
      {tabIds.map((id) => (
        <Tab
          id={id}
          key={id}
          onSelect={handleSetRequestActive}
          selected={currentTabId === id}
          onDelete={handleDeleteTabAction}
        />
      ))}
    </div>
  );
};

export default memo(Tabbar);
