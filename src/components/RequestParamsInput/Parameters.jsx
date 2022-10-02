import { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { Trash, Plus } from "react-bootstrap-icons";
import uuid from "react-uuid";
import KeyValueInput from "./KeyValueInput";
import { updateCollectionItemQueryAction } from "../../store/modules/collectionItem";

const QueryParameters = ({ onClearAll, onAddNew }) => (
  <div className="flex flex-1 items-center justify-between border-b py-2 px-2">
    <label className="text-xs font-semibold text-slate-500">
      Query Parameters
    </label>
    <div className="flex">
      <Trash
        className="mr-2"
        size={18}
        color="rgb(115, 115, 115)"
        onClick={onClearAll}
      />
      <Plus size={18} color="rgb(115, 115, 115)" onClick={onAddNew} />
    </div>
  </div>
);

const Parameters = ({ requestId }) => {
  const dispatch = useDispatch();
  const request = useSelector((store) =>
    _.get(store, `collectionItem.byId.${requestId}`)
  );

  const handleAddNew = useCallback(() => {
    const data = request.url?.query || [];
    data.push({
      id: uuid(),
      key: "",
      value: "",
      enabled: true,
    });
    dispatch(updateCollectionItemQueryAction(requestId, data));
  }, [dispatch, request]);

  const handleClearAll = useCallback(() => {
    dispatch(updateCollectionItemQueryAction(requestId, []));
  }, [dispatch]);

  const handleToggle = useCallback(
    (idx) => () => {
      request.url.query[idx].enabled = !request.url?.query[idx].enabled;
      dispatch(updateCollectionItemQueryAction(requestId, request.url.query));
    },
    [dispatch, request]
  );

  const handleDelete = useCallback(
    (idx) => () => {
      request.url.query.splice(idx, 1);
      dispatch(updateCollectionItemQueryAction(requestId, request.url.query));
    },
    [dispatch, request]
  );

  const handleChangeKey = useCallback(
    (idx) => (event) => {
      request.url.query[idx].key = event.target.value;
      dispatch(updateCollectionItemQueryAction(requestId, request.url?.query));
    },
    [dispatch, request]
  );

  const handleChangeValue = useCallback(
    (idx) => (event) => {
      request.url.query[idx].value = event.target.value;
      dispatch(updateCollectionItemQueryAction(requestId, request.url?.query));
    },
    [dispatch, request]
  );

  return (
    <>
      <QueryParameters onClearAll={handleClearAll} onAddNew={handleAddNew} />
      <KeyValueInput
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
