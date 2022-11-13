import { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { Trash, Plus } from "react-bootstrap-icons";
import { KVForm, Header } from "@/components";
import { updateTabItemByKeyPathLevel2Action } from "@/store/modules/tab";
import { addNewRow } from "@/utils/form";

// const Header = ({ onClearAll, onAddNew }) => (
//   <div className="flex flex-1 items-center justify-between border-y py-2 px-2">
//     <label className="text-xs font-semibold text-slate-500">Request Body</label>
//     <div className="flex">
// <Trash
//   className="mr-2"
//   size={18}
//   color="rgb(115, 115, 115)"
//   onClick={onClearAll}
// />
// <Plus size={18} color="rgb(115, 115, 115)" onClick={onAddNew} />
//     </div>
//   </div>
// );

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
