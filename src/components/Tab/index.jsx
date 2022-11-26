import { memo } from "react";
import { classNames } from "@/utils/common";
// variant = primary | secondary
const Tab = ({ selected, label, onClick, rightComponent, className }) => (
  <button
    type="button"
    className={classNames(
      "flex items-center px-3 py-2",
      selected && "border-b-2 border-indigo-400",
      className
    )}
    onClick={onClick}
    disabled={selected}
  >
    <span
      className={classNames(
        "whitespace-nowrap text-xs font-medium text-gray-500 hover:text-gray-700",
        selected && "text-gray-700/100"
      )}
    >
      {label}
    </span>
    {rightComponent}
  </button>
);

export default memo(Tab);
