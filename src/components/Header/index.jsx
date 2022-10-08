import { memo } from "react";

const Header = ({ title, children }) => (
  <div className="flex flex-1 items-center justify-between border-b py-2 px-2">
    <label className="text-xs font-semibold text-slate-500">{title}</label>
    <div className="flex">{children}</div>
  </div>
);

export default memo(Header);
