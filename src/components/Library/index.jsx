import { memo, useCallback } from "react";
import { Clock, Folder, Layers } from "react-bootstrap-icons";
import { History } from "./History";
import Collection from "./Collection";
import Environment from "./Environment";
import { setCurrentLibIdAction } from "@/store/modules/common";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { Tooltip } from "../Tooltip";

const Library = () => {
  const currentLibId = useSelector((store) =>
    _.get(store, "common.currentLibId")
  );

  return (
    <div className="flex overflow-hidden bg-white">
      <div>
        <LibSideBar id={currentLibId} />
      </div>
      <div className="w-full">{BUTTONS[currentLibId].component}</div>
    </div>
  );
};

const LibSideBar = ({ id }) => {
  const dispatch = useDispatch();
  const handleSetLibActive = useCallback(
    (id) => {
      dispatch(setCurrentLibIdAction(id));
    },
    [id, dispatch]
  );
  return (
    <div className=" -z-10 min-h-full border-x bg-white px-3">
      {BUTTONS.map((item, index) => (
        <div
          className="cursor-pointer py-4 opacity-70 transition-all duration-200 hover:opacity-100"
          key={item.label}
          onClick={() => {
            item.isOpen = true;
            handleSetLibActive(index);
          }}
        >
          <Tooltip content={item.label}>
            <i
              className={`text-xl ${
                index == id ? " text-blue-800" : "text-gray-700"
              }`}
            >
              {item.icon}
            </i>
          </Tooltip>
        </div>
      ))}
    </div>
  );
};
const BUTTONS = [
  {
    icon: <Clock />,
    label: "History",
    isOpen: true,
    component: <History />,
  },
  {
    icon: <Folder />,
    label: "Collections",
    isOpen: false,
    component: <Collection />,
  },
  {
    icon: <Layers />,
    label: "Environments",
    isOpen: false,
    component: <Environment />,
  },
];
export default memo(Library);
