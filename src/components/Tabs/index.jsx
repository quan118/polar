import { memo } from "react";
import Tab from "../Tab";

const Tabs = ({ tabs, selected, onChange, rightComponent }) => (
  <div className="-mb-px flex space-x-8 border-b border-gray-200">
    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
      {tabs.map((tab) => (
        <Tab
          key={tab.name}
          variant="secondary"
          label={tab.name}
          selected={tab.key === selected?.key}
          onClick={onChange(tab)}
          rightComponent={tab.rightComponent || undefined}
        />
      ))}
    </nav>
    {rightComponent}
  </div>
);

export default memo(Tabs);
