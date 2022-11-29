import { forwardRef } from "react";
import { classNames } from "@/utils/common";

// variant: primary | secondary
const Button = (
  { variant = "primary", disabled, children, onClick, className, ...props },
  ref
) => (
  <button
    ref={ref}
    type="button"
    className={classNames(
      "inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 shadow-sm",
      "select-none text-xs font-bold font-medium leading-4 text-white",
      "hover:bg-indigo-700",
      "focus:outline-none",
      variant === "secondary" && "bg-slate-500 hover:bg-slate-700",
      disabled && "bg-slate-200 hover:bg-slate-200",
      className
    )}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

export default forwardRef(Button);
