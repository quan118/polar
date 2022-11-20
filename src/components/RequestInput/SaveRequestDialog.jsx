import {
  Fragment,
  useState,
  memo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { Transition } from "@headlessui/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { classNames } from "@/utils/common";
import { useSelector, useDispatch } from "react-redux";
import { updateTabItemByKeyPathLevel1Action } from "@/store/modules/tab";
import { saveRequestAction } from "@/store/modules/collectionItem";
import Directories from "./Directories";
import Button from "../Button";

const SaveRequestDialog = ({ requestId, children }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const tab = useSelector((store) => store.tab.byId[requestId]);
  const [requestName, setRequestName] = useState();
  const [selectedDirId, setSelectedDirId] = useState();
  const allDirectories = useSelector((store) => store.collectionItem.byId);
  const directoriesRef = useRef();

  useEffect(() => {
    setRequestName(tab.name);
  }, []);

  const handleSave = useCallback(() => {
    const dirties = directoriesRef.current.getDirties();
    const localState = directoriesRef.current.getLocalState();
    dispatch(
      saveRequestAction(
        requestId,
        requestName,
        selectedDirId,
        dirties,
        localState,
        tab
      )
    );

    // dispatch(updateTabDirtyKeyAction(requestId, false));
    dispatch(
      updateTabItemByKeyPathLevel1Action(requestId, "parentId", selectedDirId)
    );
    dispatch(
      updateTabItemByKeyPathLevel1Action(requestId, "name", requestName)
    );
  }, [requestId, requestName, tab, selectedDirId, directoriesRef]);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <Transition.Root show={isOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPrimitive.Overlay
              forceMount
              className="fixed inset-0 z-20 bg-black/50"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPrimitive.Content
              forceMount
              className={classNames(
                "fixed z-50",
                "w-[95vw] max-w-md rounded-lg p-4 md:w-full",
                "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
                "bg-white dark:bg-gray-800",
                "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
              )}
              onInteractOutside={(evt) => evt.preventDefault()}
            >
              <DialogPrimitive.Title className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Save Request
              </DialogPrimitive.Title>

              <label
                htmlFor="requestName"
                className="text-xs font-medium text-gray-700"
              >
                Request name
              </label>
              <input
                id="requestName"
                type="text"
                defaultValue={tab.name}
                placeholder="Request name"
                className="mt-1 block w-full rounded-md border border-gray-400 text-sm text-gray-700 shadow-none"
                onChange={(evt) => {
                  setRequestName(evt.target.value);
                }}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
              />
              <label
                htmlFor="saveToPath"
                className="text-xs font-medium text-gray-700"
              >
                Save to path
              </label>
              <div
                id="saveToPath"
                className="boder-gray-400 overflow-hidden rounded-md border"
              >
                <Directories
                  ref={directoriesRef}
                  allDirectories={allDirectories}
                  selectedDirId={selectedDirId}
                  onSelectDir={setSelectedDirId}
                  tab={tab}
                />
              </div>

              <div className="mt-4 flex justify-end">
                <DialogPrimitive.Close asChild>
                  <Button variant="secondary">Close</Button>
                </DialogPrimitive.Close>
                <DialogPrimitive.Close
                  className="ml-2"
                  asChild
                  onClick={handleSave}
                >
                  <Button>Save</Button>
                </DialogPrimitive.Close>
              </div>
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default memo(SaveRequestDialog);
