import { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { Trash, Plus } from "react-bootstrap-icons";
import uuid from "react-uuid";
import KVForm from "../../KVForm";
import { updateCollectionItemBodyKeyAction } from "@/store/modules/collectionItem";

const Header = ({ onClearAll, onAddNew }) => (
  <div className="flex flex-1 items-center justify-between border-y py-2 px-2">
    <label className="text-xs font-semibold text-slate-500">Request Body</label>
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

const URLEncoded = ({ requestId }) => {
  const dispatch = useDispatch();
  const urlencoded = useSelector(
    (store) =>
      _.get(store, `collectionItem.byId.${requestId}.body.urlencoded`) || []
  );

  const handleAddNew = useCallback(() => {
    urlencoded.push({
      id: uuid(),
      key: "",
      value: "",
      enabled: true,
    });
    dispatch(
      updateCollectionItemBodyKeyAction(requestId, "urlencoded", [
        ...urlencoded,
      ])
    );
  }, [urlencoded]);

  const handleClearAll = useCallback(() => {
    dispatch(updateCollectionItemBodyKeyAction(requestId, "urlencoded", []));
  }, [dispatch]);

  const handleToggle = useCallback(
    (idx) => () => {
      urlencoded[idx].enabled = !urlencoded[idx].enabled;
      dispatch(
        updateCollectionItemBodyKeyAction(requestId, "urlencoded", [
          ...urlencoded,
        ])
      );
    },
    [dispatch, urlencoded]
  );

  const handleDelete = useCallback(
    (idx) => () => {
      urlencoded.splice(idx, 1);
      dispatch(
        updateCollectionItemBodyKeyAction(requestId, "urlencoded", [
          ...urlencoded,
        ])
      );
    },
    [dispatch, urlencoded]
  );

  const handleChangeKey = useCallback(
    (idx) => (event) => {
      urlencoded[idx].key = event.target.value;
      dispatch(
        updateCollectionItemBodyKeyAction(requestId, "urlencoded", [
          ...urlencoded,
        ])
      );
    },
    [dispatch, urlencoded]
  );

  const handleChangeValue = useCallback(
    (idx) => (event) => {
      urlencoded[idx].value = event.target.value;
      dispatch(
        updateCollectionItemBodyKeyAction(requestId, "urlencoded", [
          ...urlencoded,
        ])
      );
    },
    [dispatch, urlencoded]
  );

  return (
    <>
      <Header onClearAll={handleClearAll} onAddNew={handleAddNew} />
      <KVForm
        data={urlencoded}
        keyPlaceholder="Parameter"
        valuePlaceholder="Value"
        onToggle={handleToggle}
        onDelete={handleDelete}
        onChangeKey={handleChangeKey}
        onChangeValue={handleChangeValue}
      />
    </>
  );
};

export default memo(URLEncoded);
