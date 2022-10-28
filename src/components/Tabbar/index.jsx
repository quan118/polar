import { memo, useCallback } from "react";
import { X } from "react-bootstrap-icons";
import { deleteTabAction } from "@/store/modules/tab";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { setCurrentRequestIdAction } from "@/store/modules/common";

const Tabbar = () => {
  const tabs = useSelector((store) => _.get(store, `tab.tabs`));

  const curentRequestId = useSelector((store) =>
    _.get(store, "common.currentRequestId")
  );

  const dispatch = useDispatch();
  const handleSetRequestActive = useCallback(
    (itemId) => {
      dispatch(setCurrentRequestIdAction(itemId));
    },
    [dispatch]
  );

  const handleDeleteTabAction = useCallback(
    (item) => {
      dispatch(deleteTabAction(item));
    },
    [dispatch]
  );

  return (
    <div className="flex bg-white py-1">
      <section className="dragscroll flex items-center gap-x-1 text-xs text-gray-800">
        {tabs.map((item) => {
          return (
            <div key={item.id}>
              <div
                className={`group flex cursor-pointer items-center gap-x-1 rounded-md bg-gray-300 px-1 py-1 shadow-sm ${
                  curentRequestId === item.id ? "opacity-100" : "opacity-50"
                }`}
                key={item.id}
                onClick={() => {
                  handleSetRequestActive(item.id);
                }}
              >
                <span className="">{item.name}</span>
                <div
                  className={` min-w-[5px] rounded-md p-1 transition-all duration-200 hover:bg-gray-400`}
                  onClick={() => {
                    handleDeleteTabAction(item);
                  }}
                >
                  <X
                    className={`${
                      curentRequestId === item.id
                        ? "opacity-100"
                        : "opacity-0 transition-all duration-200 group-hover:opacity-100"
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default memo(Tabbar);
