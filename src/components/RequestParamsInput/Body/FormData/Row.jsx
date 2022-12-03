import { memo } from "react";
import {
  Trash,
  Check2Circle,
  X,
  FileEarmark,
  Circle,
} from "react-bootstrap-icons";
import { classNames } from "@/utils/common";

const ICON_SIZE = 18;

const container =
  "h-full flex basis-0 rounded-none shadow-none px-2 items-center focus:outline-none";
const font = "text-xs font-medium text-black";

export const Row = ({
  className,
  keyPlaceholder,
  key_,
  onChangeKey,
  valuePlaceholder,
  value,
  onChangeValue,
  onSelectFile,
  onDeleteFile,
  enabled,
  onToggle,
  onDelete,
  isFile,
}) => (
  <div
    className={classNames(
      "flex h-8 flex-1 items-center border border-slate-200 bg-white",
      className
    )}
  >
    <input
      type="text"
      className={classNames(container, font, "flex-1")}
      placeholder={keyPlaceholder}
      defaultValue={key_}
      onChange={onChangeKey}
      autoComplete="off"
      autoCapitalize="off"
      autoCorrect="off"
    />
    <div
      className={classNames(
        container,
        "flex-1 overflow-hidden border-l border-l-slate-200 "
      )}
    >
      {isFile ? (
        <>
          <div className="mr-2 flex overflow-hidden rounded-md bg-slate-200 p-1">
            <span className={classNames(font, "truncate")}>{value}</span>
          </div>
          <div className="flex-1" />
          <X size={ICON_SIZE} color="gray" onClick={onDeleteFile} />
        </>
      ) : (
        <>
          <input
            type="text"
            className={classNames(font, "flex-1 focus:outline-none")}
            placeholder={valuePlaceholder}
            defaultValue={value}
            onChange={onChangeValue}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
          />
          {!value && (
            <FileEarmark size={ICON_SIZE} color="gray" onClick={onSelectFile} />
          )}
        </>
      )}
    </div>
    <div
      className={classNames(container, "border-l border-l-slate-200")}
      onClick={onToggle}
    >
      {enabled ? (
        <Check2Circle color="green" size={ICON_SIZE} />
      ) : (
        <Circle color="green" size={ICON_SIZE} />
      )}
    </div>
    <div className={container} onClick={onDelete}>
      <Trash color="red" size={ICON_SIZE} />
    </div>
  </div>
);

export default memo(Row);
