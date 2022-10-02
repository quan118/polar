import { memo } from "react";
import { classNames } from "../../utils/common";

const Tabs = ({ tabs, selected, onChange, rightComponent }) => (
  <div className="border-b border-gray-200">
    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
      {tabs.map((tab) => (
        <a
          key={tab.name}
          href={tab.href}
          className={classNames(
            tab.key === selected.key
              ? "border-indigo-500 text-indigo-600"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
            "whitespace-nowrap border-b-2 py-2 px-1 text-xs font-medium"
          )}
          aria-current={tab.current ? "page" : undefined}
          onClick={onChange(tab)}
        >
          {tab.name}
        </a>
      ))}
    </nav>
    {rightComponent}
  </div>
);

export default memo(Tabs);
