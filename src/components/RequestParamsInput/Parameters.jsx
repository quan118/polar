import { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { Trash, Plus } from "react-bootstrap-icons";
import uuid from "react-uuid";
import KVForm from "../KVForm";
import Header from "../Header";
import { updateTabItemByKeyPathLevel2Action } from "@/store/modules/tab";

const Parameters = ({ tabId }) => {
  const dispatch = useDispatch();
  const request = useSelector((store) => _.get(store, `tab.byId.${tabId}`));

  const handleAddNew = useCallback(() => {
    const data = request.url?.query || [];
    data.push({
      id: uuid(),
      key: "",
      value: "",
      enabled: true,
    });
    dispatch(updateTabItemByKeyPathLevel2Action(tabId, "url", "query", data));
  }, [dispatch, request]);

  const handleClearAll = useCallback(() => {
    dispatch(
      updateTabItemByKeyPathLevel2Action(tabId, "url", "query", [
        {
          id: uuid(),
          key: "",
          value: "",
          enabled: true,
        },
      ])
    );
  }, [dispatch]);

  const handleToggle = useCallback(
    (idx) => () => {
      request.url.query[idx].enabled = !request.url?.query[idx].enabled;
      dispatch(
        updateTabItemByKeyPathLevel2Action(
          tabId,
          "url",
          "query",
          request.url.query
        )
      );
    },
    [dispatch, request]
  );

  const handleDelete = useCallback(
    (idx) => () => {
      request.url.query.splice(idx, 1);
      const data = request.url.query;
      if (data.length === 0) {
        data.push({
          id: uuid(),
          key: "",
          value: "",
          enabled: true,
        });
      }
      dispatch(
        updateTabItemByKeyPathLevel2Action(tabId, "url", "query", [...data])
      );
    },
    [dispatch, request]
  );

  const handleChangeKey = useCallback(
    (idx) => (event) => {
      request.url.query[idx].key = event.target.value;
      const data = request.url.query;
      if (idx === data.length - 1) {
        data.push({
          id: uuid(),
          key: "",
          value: "",
          enabled: true,
        });
      }
      dispatch(
        updateTabItemByKeyPathLevel2Action(tabId, "url", "query", [...data])
      );
    },
    [dispatch, request]
  );

  const handleChangeValue = useCallback(
    (idx) => (event) => {
      request.url.query[idx].value = event.target.value;
      const data = request.url.query;
      if (idx === data.length - 1) {
        data.push({
          id: uuid(),
          key: "",
          value: "",
          enabled: true,
        });
      }
      dispatch(
        updateTabItemByKeyPathLevel2Action(tabId, "url", "query", [...data])
      );
    },
    [dispatch, request]
  );

  return (
    <>
      <Header title="Query Parameters">
        <Trash
          className="mr-2"
          size={18}
          color="rgb(115, 115, 115)"
          onClick={handleClearAll}
        />
        <Plus size={18} color="rgb(115, 115, 115)" onClick={handleAddNew} />
      </Header>
      <KVForm
        data={request.url?.query || []}
        keyPlaceholder={"Parameter"}
        valuePlaceholder={"Value"}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onChangeKey={handleChangeKey}
        onChangeValue={handleChangeValue}
      />
    </>
  );
};

export default memo(Parameters);
