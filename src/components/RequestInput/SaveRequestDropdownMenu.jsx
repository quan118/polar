import { memo } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { classNames } from "@/utils/common";
import SaveRequestDialog from "./SaveRequestDialog";

const SaveRequestDropdownMenu = ({ children, onSaveAs, tabId }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          alignOffset={0}
          sideOffset={5}
          className={classNames(
            "radix-side-bottom:animate-slide-down radix-side-top:animate-slide-up",
            "rounded-lg px-1.5 py-1 shadow-md",
            "bg-white dark:bg-gray-800"
          )}
        >
          <DropdownMenu.Item asChild>
            <SaveRequestDialog requestId={tabId} saveAs>
              <button
                className={classNames(
                  "flex cursor-default select-none items-center rounded-md p-2 text-xs outline-none",
                  "text-gray400 focus:bg-gray-50 dark:text-gray-500 dark:focus:bg-gray-900"
                )}
              >
                <span>{onSaveAs ? "Save as" : "Save to"}</span>
              </button>
            </SaveRequestDialog>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default memo(SaveRequestDropdownMenu);
