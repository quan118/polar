import { Transition, Dialog } from "@headlessui/react";
import { XLg } from "react-bootstrap-icons";
import { useState, Fragment } from "react";
export function EditDialog({ visible, type }) {
  // const [newName, setNewName] = useState("");
  const [close, setClose] = useState(!visible);
  return (
    <Transition.Root show={!close} as={Fragment}>
      <Dialog
        open={true}
        onClose={() => setClose(true)}
        as="div"
        className="fixed inset-0 z-10 flex items-start justify-center overflow-y-auto text-gray-700 backdrop-blur-sm"
      >
        <Dialog.Panel className="mt-24 w-full max-w-lg rounded-lg  border bg-white py-5 shadow-md">
          <Dialog.Title
            className={
              "mb-4 flex items-center justify-between px-6 pb-2 text-lg font-bold"
            }
          >
            <div className="">{`${type}`}</div>
            <i
              className="cursor-pointer text-xs text-gray-500 transition-all duration-200 hover:text-gray-800"
              onClick={() => setClose(true)}
            >
              <XLg />
            </i>
          </Dialog.Title>
          <Dialog.Panel
            className={
              "mb-4 flex items-center justify-between px-6 pb-2 font-bold"
            }
          >
            <div className=" relative w-full rounded-md border px-3 py-2 shadow-sm focus-within:border-gray-400 ">
              <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs text-[0.6rem] font-normal text-gray-500">
                Label
              </label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={"Folder"}
                // onChange={(e) => setNewName(e.target.value)}
                className="m-0 block w-full bg-white p-0 text-gray-700 shadow-none transition-all duration-300 focus:ring-0 sm:text-xs"
                placeholder={"Name"}
              />
            </div>
          </Dialog.Panel>
          <Dialog.Panel className={"px-6"}>
            <div className="flex items-center gap-4">
              <button
                className="rounded-md bg-indigo-500 py-1.5 text-sm text-white transition-all duration-300 hover:bg-indigo-700"
                onClick={() => {}}
              >
                Save
              </button>
              <button
                className="bg-white-900 border-none text-sm text-gray-500 shadow-none transition-all duration-300 hover:text-gray-900"
                onClick={() => setClose(true)}
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </Dialog.Panel>
      </Dialog>
    </Transition.Root>
  );
}
