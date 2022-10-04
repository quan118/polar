import { memo, useState } from "react";
import { BsClock, BsFolder, BsLayers } from "react-icons/bs";
import { History } from "./History";
import { Collection } from "./Collection/index";
import { Environment } from "./Environment";
import { CollectionsProvider } from "./Providers/Collections-provider";
import Tippy from "@tippyjs/react";

const Library = () => {
  const [componentSelectedIdx, setComponentSelectedIdx] = useState(1);
  return (
    <div className="relative flex bg-white">
      <div>
        <LibSideBar
          onChangeLibSideBarIdx={(component) =>
            setComponentSelectedIdx(component)
          }
        />
      </div>
      <div className="w-full">{BUTTONS[componentSelectedIdx].component}</div>
    </div>
  );
};

const LibSideBar = ({ onChangeLibSideBarIdx }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  return (
    <div className="min-h-full border-x bg-white px-3">
      {BUTTONS.map((item, index) => (
        <div
          className="cursor-pointer py-4 opacity-70 transition-all duration-200 hover:opacity-100"
          key={item.label}
          onClick={() => {
            item.isOpen = true;
            setSelectedIdx(index);
            onChangeLibSideBarIdx(index);
          }}
        >
          <Tippy content={item.label} arrow={false} animation="scale">
            <i
              className={`text-xl ${
                index === selectedIdx ? "text-blue-800" : "text-gray-700"
              }`}
            >
              {item.icon}
            </i>
          </Tippy>
        </div>
      ))}
    </div>
  );
};
const BUTTONS = [
  {
    icon: <BsClock />,
    label: "History",
    isOpen: true,
    component: <History />,
  },
  {
    icon: <BsFolder />,
    label: "Collections",
    isOpen: false,
    component: (
      <CollectionsProvider>
        <Collection />
      </CollectionsProvider>
    ),
  },
  {
    icon: <BsLayers />,
    label: "Environments",
    isOpen: false,
    component: <Environment />,
  },
];
export default memo(Library);
