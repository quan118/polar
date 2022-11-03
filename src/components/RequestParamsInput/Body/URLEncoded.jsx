import { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { Trash, Plus } from "react-bootstrap-icons";
import { KVForm, Header } from "@/components";
import { updateCollectionItemBodyKeyAction } from "@/store/modules/collectionItem";
import { addNewRow } from "@/utils/form";

const URLEncoded = ({ requestId }) => {
  const dispatch = useDispatch();
  const urlencoded = useSelector(
    (store) =>
      _.get(store, `collectionItem.byId.${requestId}.body.urlencoded`) || []
  );

  const handleAddNew = useCallback(() => {
    dispatch(
      updateCollectionItemBodyKeyAction(
        requestId,
        "urlencoded",
        addNewRow(urlencoded)
      )
    );
  }, [urlencoded]);

  const handleClearAll = useCallback(() => {
    dispatch(
      updateCollectionItemBodyKeyAction(requestId, "urlencoded", addNewRow([]))
    );
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
        updateCollectionItemBodyKeyAction(
          requestId,
          "urlencoded",
          urlencoded?.length === 0 ? addNewRow(urlencoded) : [...urlencoded]
        )
      );
    },
    [dispatch, urlencoded]
  );

  const handleChangeKey = useCallback(
    (idx) => (event) => {
      urlencoded[idx].key = event.target.value;
      const isLastRow = idx === urlencoded.length - 1;
      dispatch(
        updateCollectionItemBodyKeyAction(
          requestId,
          "urlencoded",
          isLastRow ? addNewRow(urlencoded) : [...urlencoded]
        )
      );
    },
    [dispatch, urlencoded]
  );

  const handleChangeValue = useCallback(
    (idx) => (event) => {
      urlencoded[idx].value = event.target.value;
      const isLastRow = idx === urlencoded.length - 1;
      dispatch(
        updateCollectionItemBodyKeyAction(
          requestId,
          "urlencoded",
          isLastRow ? addNewRow(urlencoded) : [...urlencoded]
        )
      );
    },
    [dispatch, urlencoded]
  );

  return (
    <>
      <Header title="Request Body">
        <Trash
          className="mr-2"
          size={18}
          color="rgb(115, 115, 115)"
          onClick={handleClearAll}
        />
        <Plus size={18} color="rgb(115, 115, 115)" onClick={handleAddNew} />
      </Header>
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
