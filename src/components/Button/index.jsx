import { memo } from "react";
import { classNames } from "@/utils/common";

const Button = ({ children, onClick, className }) => (
  <button
    type="button"
    className={classNames(
      "inline-flex items-center rounded-md border border-transparent  px-3 py-2 text-xs font-bold font-medium leading-4 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2",
      className
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

export default memo(Button);
