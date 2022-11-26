import { memo, useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import Tabs from "../Tabs";
import Parameters from "./Parameters";
import Headers from "./Headers";
import Authorization from "./Authorization";
import Body from "./Body";
import { useEffect } from "react";

const Badge = ({ number }) => (
  <span className="ml-1 rounded border px-1 text-xxxs">{number}</span>
);

const RequestParamsInput = ({ tabId }) => {
  const headers = useSelector((store) =>
    _.get(store, `tab.byId[${tabId}].header`)
  );
  const params = useSelector((store) =>
    _.get(store, `tab.byId[${tabId}].url.query`)
  );
  const headersCount = headers?.filter((item) => item.key?.length > 0).length;
  const paramsCount = params?.filter((item) => item.key?.length > 0).length;

  const tabs = useMemo(
    () => [
      {
        key: "PARAMS",
        name: "Parameters",
        href: "#",
        current: false,
        rightComponent:
          paramsCount > 0 ? <Badge number={paramsCount} /> : undefined,
      },
      { key: "BODY", name: "Body", href: "#", current: false },
      {
        key: "HEADERS",
        name: "Headers",
        href: "#",
        current: true,
        rightComponent:
          headersCount > 0 ? <Badge number={headersCount} /> : undefined,
      },
      { key: "AUTH", name: "Authorization", href: "#", current: false },
    ],
    [headersCount, paramsCount]
  );
  const [tab, setTab] = useState();

  useEffect(() => {
    setTab(tabs[0]);
  }, []);

  const handleChangeTab = useCallback((tab) => () => setTab(tab), [setTab]);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Tabs tabs={tabs} selected={tab} onChange={handleChangeTab} />
      {tab?.key === "PARAMS" && <Parameters tabId={tabId} />}
      {tab?.key === "HEADERS" && <Headers tabId={tabId} />}
      {tab?.key === "AUTH" && <Authorization tabId={tabId} />}
      {tab?.key === "BODY" && <Body tabId={tabId} />}
    </div>
  );
};

export default memo(RequestParamsInput);
