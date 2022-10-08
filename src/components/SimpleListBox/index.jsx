import { Fragment, useState, useCallback, memo } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDown } from "react-bootstrap-icons";

const SimpleListBox = ({ data, defaultValue, onChange }) => {
  const [selected, setSelected] = useState(defaultValue);

  const handleChange = useCallback(
    (item) => {
      setSelected(item);
      onChange(item);
    },
    [setSelected, onChange]
  );

  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className="relative">
        <Listbox.Button className="relative h-full w-24 cursor-default rounded-none rounded-l-md border-y border-l border-r-0 border-slate-300 bg-slate-50 py-2 pl-2 text-left shadow-none hover:border-r focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
          <span className="block truncate text-xs font-bold text-black">
            {selected.name}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDown
              size={8}
              color="rgb(115, 115, 115)"
              // className="h-5 w-5 text-gray-400"
              // aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-20 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {data.map((item, idx) => (
              <Listbox.Option
                key={idx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-4 ${
                    active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate text-xs ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {item.name}
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
};

export default memo(SimpleListBox);
