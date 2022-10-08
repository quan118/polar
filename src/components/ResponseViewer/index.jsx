import { memo, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import Tabs from "../Tabs";
import Body from "./Body";

const tabs = [
  { key: "BODY", name: "Body", current: true },
  { key: "COOKIES", name: "Cookies", current: false },
  { key: "HEADERS", name: "Headers", current: false },
];

const ResponseViewer = () => {
  const responseId = useSelector((store) => _.get(store, "common.responseId"));
  const response = useSelector((store) =>
    _.get(store, `response.byId[${responseId}]`)
  );
  const [tab, setTab] = useState(tabs[0]);
  const handleChangeTab = useCallback((tab) => () => setTab(tab), [setTab]);
  return (
    <div className=" h-full w-full bg-white">
      <Tabs tabs={tabs} selected={tab} onChange={handleChangeTab} />
      {tab.key === "BODY" && response?.body && <Body response={response} />}
    </div>
  );
};

export default memo(ResponseViewer);
