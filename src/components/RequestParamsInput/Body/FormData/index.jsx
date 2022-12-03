import { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { Trash, Plus } from "react-bootstrap-icons";
import { open } from "@tauri-apps/api/dialog";
import { Header } from "@/components";
import { updateTabItemByKeyPathLevel2Action } from "@/store/modules/tab";
import { addNewRow } from "@/utils/form";
import Row from "./Row";

const FormData = ({ tabId }) => {
  const dispatch = useDispatch();
  const formdata =
    useSelector((store) => _.get(store, `tab.byId.${tabId}.body.formdata`)) ||
    [];

  const handleAddNew = useCallback(() => {
    dispatch(
      updateTabItemByKeyPathLevel2Action(
        tabId,
        "body",
        "formdata",
        addNewRow(formdata)
      )
    );
  }, [formdata]);

  const handleClearAll = useCallback(() => {
    dispatch(
      updateTabItemByKeyPathLevel2Action(
        tabId,
        "body",
        "formdata",
        addNewRow([])
      )
    );
  }, [dispatch]);

  const handleToggle = useCallback(
    (idx) => () => {
      formdata[idx].enabled = !formdata[idx].enabled;
      dispatch(
        updateTabItemByKeyPathLevel2Action(tabId, "body", "formdata", [
          ...formdata,
        ])
      );
    },
    [dispatch, formdata]
  );

  const handleDelete = useCallback(
    (idx) => () => {
      formdata.splice(idx, 1);
      dispatch(
        updateTabItemByKeyPathLevel2Action(
          tabId,
          "body",
          "formdata",
          formdata?.length === 0 ? addNewRow(formdata) : [...formdata]
        )
      );
    },
    [dispatch, formdata]
  );

  const handleChangeKey = useCallback(
    (idx) => (event) => {
      if (!formdata[idx].key && !formdata[idx].value) {
        formdata[idx].enabled = true;
      }
      formdata[idx].key = event.target.value;
      const isLastRow = idx === formdata.length - 1;
      dispatch(
        updateTabItemByKeyPathLevel2Action(
          tabId,
          "body",
          "formdata",
          isLastRow ? addNewRow(formdata) : [...formdata]
        )
      );
    },
    [dispatch, formdata]
  );

  const handleChangeValue = useCallback(
    (idx) => (event) => {
      if (!formdata[idx].key && !formdata[idx].value) {
        formdata[idx].enabled = true;
      }
      formdata[idx].value = event.target.value;
      delete formdata[idx].type;
      const isLastRow = idx === formdata.length - 1;
      dispatch(
        updateTabItemByKeyPathLevel2Action(
          tabId,
          "body",
          "formdata",
          isLastRow ? addNewRow(formdata) : [...formdata]
        )
      );
    },
    [dispatch, formdata, tabId]
  );

  const handleDeleteFile = useCallback(
    (idx) => () => {
      formdata[idx].value = "";
      delete formdata[idx].type;
      dispatch(
        updateTabItemByKeyPathLevel2Action(tabId, "body", "formdata", [
          ...formdata,
        ])
      );
    },
    [dispatch, formdata, tabId]
  );

  const handleSelectFile = useCallback(
    (idx) => async () => {
      const selected = await open({ multiple: false });
      if (!formdata[idx].key && !formdata[idx].value) {
        formdata[idx].enabled = true;
      }
      formdata[idx].value = selected;
      formdata[idx].type = "file";
      const isLastRow = idx === formdata.length - 1;
      dispatch(
        updateTabItemByKeyPathLevel2Action(
          tabId,
          "body",
          "formdata",
          isLastRow ? addNewRow(formdata) : [...formdata]
        )
      );
    },
    [dispatch, formdata, tabId]
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
      <div className="flex flex-col">
        {formdata?.map((item, idx) => (
          <Row
            className={"border-t-0"}
            key={item.id}
            keyPlaceholder={"Parameter " + idx}
            key_={item.key}
            onChangeKey={handleChangeKey(idx)}
            value={item.value}
            valuePlaceholder={"Value " + idx}
            onChangeValue={handleChangeValue(idx)}
            enabled={item.enabled}
            onToggle={handleToggle(idx)}
            onDelete={handleDelete(idx)}
            onDeleteFile={handleDeleteFile(idx)}
            onSelectFile={handleSelectFile(idx)}
            isFile={formdata[idx].type === "file"}
          />
        ))}
      </div>
    </>
  );
};

export default memo(FormData);
