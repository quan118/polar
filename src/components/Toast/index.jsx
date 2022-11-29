import { memo } from "react";
import cx from "clsx";
import { X } from "react-bootstrap-icons";
import * as ToastPrimitive from "@radix-ui/react-toast";

const Toast = ({ label, open, setOpen }) => {
  return (
    <ToastPrimitive.Provider>
      <ToastPrimitive.Root
        open={open}
        onOpenChange={setOpen}
        className={cx(
          "fixed bottom-2 right-2 z-50 rounded-lg shadow-lg",
          "bg-white dark:bg-gray-800",
          "radix-state-open:animate-toast-slide-in-right",
          "radix-state-closed:animate-toast-hide",
          "radix-swipe-end:animate-toast-swipe-out",
          "translate-x-radix-toast-swipe-move-x",
          "radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-200 radix-swipe-cancel:ease-[ease]",
          "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
        )}
      >
        <div className="m-2 flex items-center justify-between">
          <ToastPrimitive.Title className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {label}
          </ToastPrimitive.Title>

          <ToastPrimitive.Close
            className="rounded-lg border border-transparent text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 dark:text-gray-100 dark:hover:bg-gray-900"
            asChild
          >
            <X size={18} className="ml-2 appearance-none" />
          </ToastPrimitive.Close>
        </div>
      </ToastPrimitive.Root>

      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  );
};

export default memo(Toast);
