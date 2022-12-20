import { memo, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import { ArrowRepeat } from "react-bootstrap-icons";

import Tabs from "../Tabs";
import Body from "./Body";
import Headers from "./Headers";

const tabs = [
  { key: "BODY", name: "Body", current: true },
  { key: "COOKIES", name: "Cookies", current: false },
  { key: "HEADERS", name: "Headers", current: false },
];

const ResponseSummary = ({ status, time, size }) => (
  <div className="flex flex-1 items-center p-2">
    <div className="flex-1" />
    <span className="text-xs">Status:</span>
    <span className="ml-1 text-xs text-green-500">{status}</span>
    <span className="ml-2 text-xs">Time:</span>
    <span className="ml-1 text-xs text-green-500">{time} ms</span>
    <span className="ml-2 text-xs">Size:</span>
    <span className="ml-1 text-xs text-green-500">{size} B</span>
  </div>
);

const ResponseViewer = () => {
  const currentTabId = useSelector((store) => store.tab.currentTabId);
  const responseId = useSelector((store) =>
    _.get(store, `tab.byId[${currentTabId}].responseId`)
  );
  const response = useSelector((store) =>
    _.get(store, `response.byId[${responseId}]`)
  );
  const [tab, setTab] = useState(tabs[0]);
  const handleChangeTab = useCallback((tab) => () => setTab(tab), [setTab]);
  const sendingRequest = useSelector((store) =>
    _.get(store, `tab.byId[${currentTabId}].sendingRequest`)
  );

  const headers = response?.header?.map((item) => ({
    id: Object.keys(item)[0],
    key: Object.keys(item)[0],
    value: Object.values(item)[0],
  }));
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {sendingRequest ? (
        <div className="flex flex-1 items-center justify-center bg-white">
          <span className="mr-2 text-xs text-slate-500">Please wait</span>
          <ArrowRepeat className="animate-spin text-slate-500" />
        </div>
      ) : response?.error === "Network Error" ? (
        <div className="flex flex-1 items-center justify-center bg-white">
          <span className="mr-2 text-xs text-slate-500">
            Could not send request
          </span>
        </div>
      ) : (
        <>
          <Tabs
            tabs={tabs}
            selected={tab}
            onChange={handleChangeTab}
            rightComponent={
              response ? (
                <ResponseSummary
                  status={response.status}
                  time={response.responseTime}
                  size={response.contentLength}
                />
              ) : undefined
            }
          />
          {tab.key === "BODY" && response?.body && <Body response={response} />}
          {tab.key === "HEADERS" && <Headers headers={headers} />}
        </>
      )}
    </div>
  );
};

export default memo(ResponseViewer);
