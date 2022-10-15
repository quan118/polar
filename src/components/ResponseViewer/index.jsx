import { memo, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import { ArrowRepeat } from "react-bootstrap-icons";
import Tabs from "../Tabs";
import Body from "./Body";
import Header from "../Header";
import KVForm from "../KVForm";

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
  const sendingRequest = useSelector((store) => store.common.sendingRequest);

  console.log("response:", response);
  const headers = response?.header.map((item) => ({
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
      ) : (
        <>
          <Tabs tabs={tabs} selected={tab} onChange={handleChangeTab} />
          {tab.key === "BODY" && response?.body && <Body response={response} />}
          {tab.key === "HEADERS" && (
            <>
              <Header title="Header List" />
              <KVForm data={headers} readOnly />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default memo(ResponseViewer);
