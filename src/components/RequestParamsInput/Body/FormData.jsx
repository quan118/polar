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

const FormData = ({ requestId }) => {
  const dispatch = useDispatch();
  const formdata =
    useSelector((store) =>
      _.get(store, `collectionItem.byId.${requestId}.body.formdata`)
    ) || [];
  const handleAddNew = useCallback(() => {
    formdata.push({
      id: uuid(),
      key: "",
      value: "",
      enabled: true,
    });
    dispatch(
      updateCollectionItemBodyKeyAction(requestId, "formdata", [...formdata])
    );
  }, [formdata]);

  const handleClearAll = useCallback(() => {
    dispatch(updateCollectionItemBodyKeyAction(requestId, "formdata", []));
  }, [dispatch]);

  const handleToggle = useCallback(
    (idx) => () => {
      formdata[idx].enabled = !formdata[idx].enabled;
      dispatch(
        updateCollectionItemBodyKeyAction(requestId, "formdata", [...formdata])
      );
    },
    [dispatch, formdata]
  );

  const handleDelete = useCallback(
    (idx) => () => {
      formdata.splice(idx, 1);
      dispatch(
        updateCollectionItemBodyKeyAction(requestId, "formdata", [...formdata])
      );
    },
    [dispatch, formdata]
  );

  const handleChangeKey = useCallback(
    (idx) => (event) => {
      formdata[idx].key = event.target.value;
      dispatch(
        updateCollectionItemBodyKeyAction(requestId, "formdata", [...formdata])
      );
    },
    [dispatch, formdata]
  );

  const handleChangeValue = useCallback(
    (idx) => (event) => {
      formdata[idx].value = event.target.value;
      dispatch(
        updateCollectionItemBodyKeyAction(requestId, "formdata", [...formdata])
      );
    },
    [dispatch, formdata]
  );

  return (
    <>
      <Header onClearAll={handleClearAll} onAddNew={handleAddNew} />
      <KVForm
        data={formdata}
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

export default memo(FormData);
