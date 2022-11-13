import { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { Trash, Plus } from "react-bootstrap-icons";
import { KVForm, Header } from "@/components";
import { updateTabItemByKeyPathLevel2Action } from "@/store/modules/tab";
import { addNewRow } from "@/utils/form";

const URLEncoded = ({ tabId }) => {
  const dispatch = useDispatch();
  const urlencoded = useSelector(
    (store) => _.get(store, `tab.byId.${tabId}.body.urlencoded`) || []
  );

  const handleAddNew = useCallback(() => {
    dispatch(
      updateTabItemByKeyPathLevel2Action(
        tabId,
        "body",
        "urlencoded",
        addNewRow(urlencoded)
      )
    );
  }, [urlencoded]);

  const handleClearAll = useCallback(() => {
    dispatch(
      updateTabItemByKeyPathLevel2Action(
        tabId,
        "body",
        "urlencoded",
        addNewRow([])
      )
    );
  }, [dispatch]);

  const handleToggle = useCallback(
    (idx) => () => {
      urlencoded[idx].enabled = !urlencoded[idx].enabled;
      dispatch(
        updateTabItemByKeyPathLevel2Action(tabId, "body", "urlencoded", [
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
        updateTabItemByKeyPathLevel2Action(
          tabId,
          "body",
          "urlencoded",
          urlencoded?.length === 0 ? addNewRow(urlencoded) : [...urlencoded]
        )
      );
    },
    [dispatch, urlencoded]
  );

  const handleChangeKey = useCallback(
    (idx) => (event) => {
      if (!urlencoded[idx].key && !urlencoded[idx].value) {
        urlencoded[idx].enabled = true;
      }
      urlencoded[idx].key = event.target.value;
      const isLastRow = idx === urlencoded.length - 1;
      dispatch(
        updateTabItemByKeyPathLevel2Action(
          tabId,
          "body",
          "urlencoded",
          isLastRow ? addNewRow(urlencoded) : [...urlencoded]
        )
      );
    },
    [dispatch, urlencoded]
  );

  const handleChangeValue = useCallback(
    (idx) => (event) => {
      if (!urlencoded[idx].key && !urlencoded[idx].value) {
        urlencoded[idx].enabled = true;
      }
      urlencoded[idx].value = event.target.value;
      const isLastRow = idx === urlencoded.length - 1;
      dispatch(
        updateTabItemByKeyPathLevel2Action(
          tabId,
          "body",
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
