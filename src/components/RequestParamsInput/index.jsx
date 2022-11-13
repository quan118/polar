import { memo, useState, useCallback } from "react";
import Tabs from "../Tabs";
import Parameters from "./Parameters";
import Headers from "./Headers";
import Authorization from "./Authorization";
import Body from "./Body";

const tabs = [
  { key: "PARAMS", name: "Parameters", href: "#", current: false },
  { key: "BODY", name: "Body", href: "#", current: false },
  { key: "HEADERS", name: "Headers", href: "#", current: true },
  { key: "AUTH", name: "Authorization", href: "#", current: false },
];

const RequestParamsInput = ({ tabId }) => {
  const [tab, setTab] = useState(tabs[0]);

  const handleChangeTab = useCallback((tab) => () => setTab(tab), [setTab]);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Tabs tabs={tabs} selected={tab} onChange={handleChangeTab} />
      {tab.key === "PARAMS" && <Parameters tabId={tabId} />}
      {tab.key === "HEADERS" && <Headers tabId={tabId} />}
      {tab.key === "AUTH" && <Authorization tabId={tabId} />}
      {tab.key === "BODY" && <Body tabId={tabId} />}
    </div>
  );
};

export default memo(RequestParamsInput);
