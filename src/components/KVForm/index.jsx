import { memo } from "react";
import { Check2Circle, Circle, Trash } from "react-bootstrap-icons";

const Row = ({
  keyPlaceholder,
  valuePlaceholder,
  key_,
  value,
  enabled,
  onToggle,
  onDelete,
  onChangeKey,
  onChangeValue,
}) => (
  <div className="flex flex-1 items-center border-b">
    <input
      type="text"
      className="m-[0.5px] flex h-6 flex-1 rounded-none border-y-0 border-l-0 border-slate-200 bg-white text-xs font-medium text-black shadow-none"
      placeholder={keyPlaceholder}
      defaultValue={key_}
      onChange={onChangeKey}
    />
    <input
      type="text"
      className="m-[0.5px] flex h-6 flex-1 rounded-none border-y-0 border-l-0 border-slate-200 bg-white text-xs font-medium text-black shadow-none"
      placeholder={valuePlaceholder}
      defaultValue={value}
      onChange={onChangeValue}
    />
    <div className="px-2" onClick={onToggle}>
      {enabled ? <Check2Circle color="green" /> : <Circle color="green" />}
    </div>
    <div className="px-2" onClick={onDelete}>
      <Trash color="red" />
    </div>
  </div>
);

const KVForm = ({
  data,
  keyPlaceholder,
  valuePlaceholder,
  onToggle,
  onDelete,
  onChangeKey,
  onChangeValue,
}) => {
  return (
    <div className="flex flex-col">
      {data.map((item, idx) => (
        <Row
          key={item.id}
          key_={item.key}
          keyPlaceholder={keyPlaceholder}
          value={item.value}
          valuePlaceholder={valuePlaceholder}
          enabled={item.enabled}
          onToggle={onToggle(idx)}
          onDelete={onDelete(idx)}
          onChangeKey={onChangeKey(idx)}
          onChangeValue={onChangeValue(idx)}
        />
      ))}
    </div>
  );
};

export default memo(KVForm);
