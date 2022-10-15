import { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import More from "./More";
import _ from "lodash";
import { setCurrentRequestIdAction } from "@/store/modules/common";
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
  }, [id, dispatch]);

  return (
    <div
      className="group flex items-center justify-between pr-3 text-xs transition-all duration-200 hover:bg-gray-100 "
      key={id}
    >
      <div
        className="ml-0 flex w-full cursor-pointer items-center gap-2 py-2 text-xs hover:font-bold"
        key={id}
        onClick={handleSetRequestActive}
      >
        <span
          className={`${
            COLOR_TYPE[`${request.method}`]
          } min-w-[50px] text-center`}
        >
          {request.method}
        </span>
        <span className={``}>{request.name}</span>
        {curentRequestId == id && (
          <span className="relative z-0 mx-3 flex h-1.5 w-1.5 flex-shrink-0">
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
