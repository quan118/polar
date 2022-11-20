import { memo } from "react";
import { classNames } from "@/utils/common";

// variant: primary | secondary
const Button = ({
  variant = "primary",
  disabled,
  children,
  onClick,
  className,
}) => (
  <button
    type="button"
    className={classNames(
      "inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 shadow-sm",
      "text-xs font-bold font-medium leading-4 text-white",
      "hover:bg-indigo-700",
      "focus:outline-none focus:ring-2 focus:ring-offset-2",
      variant === "secondary" && "bg-slate-500 hover:bg-slate-700",
      disabled && "bg-slate-200 hover:bg-slate-200",
      className
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

export default memo(Button);
