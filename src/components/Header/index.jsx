import { memo } from "react";

const Header = ({ title, children }) => (
  <div className="flex h-8 select-none items-center justify-between border-b py-2 px-2">
    <label className="text-xs font-semibold text-slate-500">{title}</label>
    <div className="flex select-none">{children}</div>
  </div>
);

export default memo(Header);
