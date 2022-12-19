import { memo } from "react";
import { Check2Circle, Circle, Trash, Files } from "react-bootstrap-icons";
import { classNames } from "@/utils/common";

const ICON_SIZE = 16;

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
  onCopy,
  readOnly,
}) => (
  <div
    className={classNames(
      "flex h-8 items-center border-b bg-white",
      "text-xs font-medium text-neutral-900",
      "group",
      readOnly && "text-neutral-500 hover:text-neutral-900"
    )}
  >
    <input
      type="text"
      className={classNames(
        "m-[0.5px] flex flex-1 rounded-none border-y-0 border-l-0 border-slate-200 px-4 shadow-none outline-none"
      )}
      placeholder={keyPlaceholder}
      defaultValue={key_}
      onChange={onChangeKey}
      readOnly={readOnly}
      autoCapitalize="off"
      autoCorrect="off"
      autoComplete="off"
    />
    <input
      type="text"
      className="m-[0.5px] flex flex-1 rounded-none border-y-0 border-l-0 border-slate-200 shadow-none outline-none"
      placeholder={valuePlaceholder}
      defaultValue={value}
      onChange={onChangeValue}
      readOnly={readOnly}
      autoCapitalize="off"
      autoCorrect="off"
      autoComplete="off"
    />
    {!readOnly && (
      <>
        <div className="flex justify-center px-2" onClick={onToggle}>
          {enabled ? (
            <Check2Circle color="green" size={ICON_SIZE} />
          ) : (
            <Circle color="green" size={ICON_SIZE} />
          )}
        </div>
        <div className="flex justify-center px-2" onClick={onDelete}>
          <Trash color="red" size={ICON_SIZE} />
        </div>
      </>
    )}
    {readOnly && (
      <button
        className="absolute right-3 hidden group-hover:flex"
        onClick={onCopy}
      >
        <Files size={ICON_SIZE} color="gray" />
      </button>
    )}
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
  onCopy,
  readOnly = false,
}) => {
  return (
    <div className="flex flex-col">
      {data?.map((item, idx) => (
        <Row
          key={item.id}
          key_={item.key}
          keyPlaceholder={keyPlaceholder}
          value={item.value}
          valuePlaceholder={valuePlaceholder}
          enabled={item.enabled}
          onToggle={onToggle && onToggle(idx)}
          onDelete={onDelete && onDelete(idx)}
          onChangeKey={onChangeKey && onChangeKey(idx)}
          onChangeValue={onChangeValue && onChangeValue(idx)}
          readOnly={readOnly}
          onCopy={onCopy ? onCopy(item) : undefined}
        />
      ))}
    </div>
  );
};

export default memo(KVForm);
