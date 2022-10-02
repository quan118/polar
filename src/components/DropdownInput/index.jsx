import { Fragment, memo } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { clsx } from "clsx";
import { ChevronDown } from "react-bootstrap-icons";

const DropdownInput = ({ options, selected, onChange, buttonClassName }) => (
  <Listbox value={selected} onChange={onChange}>
    <div className="relative">
      <Listbox.Button
        className={clsx(
          "relative h-full w-20 cursor-default rounded-none border-none bg-white py-2 pl-2 text-left shadow-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm",
          buttonClassName
        )}
      >
        <span className="block truncate text-xs text-black">{selected}</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
          <ChevronDown size={8} color="rgb(115, 115, 115)" />
        </span>
      </Listbox.Button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-20 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {options.map((item, idx) => (
            <Listbox.Option
              key={idx}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-4 text-xs ${
                  active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                }`
              }
              value={item}
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block truncate ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {item}
                  </span>
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </div>
  </Listbox>
);

export default memo(DropdownInput);
