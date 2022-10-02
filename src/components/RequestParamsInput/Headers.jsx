import { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { Trash, Plus } from "react-bootstrap-icons";
import uuid from "react-uuid";
import KeyValueInput from "./KeyValueInput";
import { updateCollectionItemHeaderAction } from "../../store/modules/collectionItem";

const HeaderList = ({ onClearAll, onAddNew }) => (
  <div className="flex flex-1 items-center justify-between border-b py-2 px-2">
    <label className="text-xs font-semibold text-slate-500">Header List</label>
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

const Headers = ({ requestId }) => {
  const dispatch = useDispatch();
  const request = useSelector((store) =>
    _.get(store, `collectionItem.byId.${requestId}`)
  );

  const handleAddNew = useCallback(() => {
    const data = request?.header || [];
    data.push({
      id: uuid(),
      key: "",
      value: "",
      enabled: true,
    });
    dispatch(updateCollectionItemHeaderAction(requestId, data));
  }, [dispatch, request]);

  const handleClearAll = useCallback(() => {
    dispatch(updateCollectionItemHeaderAction(requestId, []));
  }, [dispatch]);

  const handleToggle = useCallback(
    (idx) => () => {
      request.header[idx].enabled = !request.header[idx].enabled;
      dispatch(updateCollectionItemHeaderAction(requestId, request.header));
    },
    [dispatch, request]
  );

  const handleDelete = useCallback(
    (idx) => () => {
      request.header.splice(idx, 1);
      dispatch(updateCollectionItemHeaderAction(requestId, request.header));
    },
    [dispatch, request]
  );

  const handleChangeKey = useCallback(
    (idx) => (event) => {
      request.header[idx].key = event.target.value;
      dispatch(updateCollectionItemHeaderAction(requestId, request.header));
    },
    [dispatch, request]
  );

  const handleChangeValue = useCallback(
    (idx) => (event) => {
      request.header[idx].value = event.target.value;
      dispatch(updateCollectionItemHeaderAction(requestId, request.header));
    },
    [dispatch, request]
  );

  return (
    <>
      <HeaderList onClearAll={handleClearAll} onAddNew={handleAddNew} />
      <KeyValueInput
        data={request.header || []}
        keyPlaceholder={"Header"}
        valuePlaceholder={"Value"}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onChangeKey={handleChangeKey}
        onChangeValue={handleChangeValue}
      />
    </>
  );
};

export default memo(Headers);
