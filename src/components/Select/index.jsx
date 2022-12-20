import { memo } from "react";
import * as RSelect from "@radix-ui/react-select";
import { ChevronUp, ChevronDown, Check } from "react-bootstrap-icons";
import { classNames } from "@/utils/common";

const Select = ({
  arialLabel,
  children,
  options,
  defaultTriggerClassname,
  onValueChange,
  defaultValue,
}) => (
  <RSelect.Root defaultValue={defaultValue} onValueChange={onValueChange}>
    <RSelect.Trigger asChild arial-label={arialLabel}>
      {children ? (
        children
      ) : (
        <button
          className={classNames(
            "inline-flex items-center justify-between rounded-none bg-white px-3 py-2 shadow-none dark:bg-transparent",
            "select-none text-xs font-bold text-neutral-500 dark:text-neutral-400",
            "hover:text-neutral-900 dark:hover:text-neutral-100",
            "focus:outline-none",
            defaultTriggerClassname
          )}
        >
          <RSelect.Value />
          <RSelect.Icon>
            <ChevronDown size={10} />
          </RSelect.Icon>
        </button>
      )}
    </RSelect.Trigger>
    <RSelect.Content className="z-10">
      <RSelect.ScrollUpButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
        <ChevronUp />
      </RSelect.ScrollUpButton>

      <RSelect.Viewport
        key="viewport"
        className="rounded-lg bg-white shadow-lg dark:bg-gray-800"
      >
        <RSelect.Group>
          {options.map((item) => (
            <RSelect.Item
              key={item.id}
              value={item.id}
              textValue={item.name}
              className={classNames(
                "relative flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 focus:bg-gray-100 dark:text-gray-300 dark:focus:bg-gray-900",
                "radix-disabled:opacity-50",
                "select-none focus:outline-none"
              )}
            >
              <RSelect.ItemText>{item.name}</RSelect.ItemText>
              <RSelect.ItemIndicator className="absolute right-2 inline-flex items-center">
                <Check />
              </RSelect.ItemIndicator>
            </RSelect.Item>
          ))}
        </RSelect.Group>
      </RSelect.Viewport>

      <RSelect.ScrollDownButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
        <ChevronDown />
      </RSelect.ScrollDownButton>
    </RSelect.Content>
  </RSelect.Root>
);

export default memo(Select);
