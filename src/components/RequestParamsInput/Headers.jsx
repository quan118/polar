import { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { Trash, Plus } from "react-bootstrap-icons";
import uuid from "react-uuid";
import Header from "../Header";
import KeyValueInput from "./KeyValueInput";
import { updateCollectionItemHeaderAction } from "@/store/modules/collectionItem";

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
    dispatch(
      updateCollectionItemHeaderAction(requestId, [
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
      request.header[idx].enabled = !request.header[idx].enabled;
      dispatch(updateCollectionItemHeaderAction(requestId, request.header));
    },
    [dispatch, request]
  );

  const handleDelete = useCallback(
    (idx) => () => {
      request.header.splice(idx, 1);
      const data = request.header;
      if (data.length === 0) {
        data.push({
          id: uuid(),
          key: "",
          value: "",
          enabled: true,
        });
      }
      dispatch(updateCollectionItemHeaderAction(requestId, data));
    },
    [dispatch, request]
  );

  const handleChangeKey = useCallback(
    (idx) => (event) => {
      request.header[idx].key = event.target.value;
      const data = request.header;
      if (idx === data.length - 1) {
        data.push({
          id: uuid(),
          key: "",
          value: "",
          enabled: true,
        });
      }
      dispatch(updateCollectionItemHeaderAction(requestId, data));
    },
    [dispatch, request]
  );

  const handleChangeValue = useCallback(
    (idx) => (event) => {
      request.header[idx].value = event.target.value;
      const data = request.header;
      if (idx === data.length - 1) {
        data.push({
          id: uuid(),
          key: "",
          value: "",
          enabled: true,
        });
      }
      dispatch(updateCollectionItemHeaderAction(requestId, data));
    },
    [dispatch, request]
  );

  return (
    <>
      <Header title="Header List">
        <Trash
          className="mr-2"
          size={18}
          color="rgb(115, 115, 115)"
          onClick={handleClearAll}
        />
        <Plus size={18} color="rgb(115, 115, 115)" onClick={handleAddNew} />
      </Header>
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
