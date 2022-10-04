import { memo, useState } from "react";
import {
  BsBook,
  BsGlobe2,
  BsGearWideConnected,
  BsCodeSlash,
  BsLink,
} from "react-icons/bs";

const Sidebar = () => {
  const [menuSelected, setMenuSelected] = useState([SIDEBAR[0].name]);
  return (
    <div
      className={`flex w-24 min-w-max flex-col items-center border-x border-l-0 bg-white transition-all duration-200 `}
    >
      <div className="w-full">
        {SIDEBAR.map((item) => (
          <div
            key={item.name}
            className={`flex w-full cursor-pointer flex-col items-center justify-center py-4 transition-all duration-200 hover:bg-gray-200
            ${
              menuSelected == item.name &&
              "border-l-4 border-indigo-400 bg-gray-100"
            }`}
            onClick={() => setMenuSelected(item.name)}
          >
            <i
              className={`w-4 text-gray-800 opacity-70 ${
                menuSelected == item.name && "text-gray-900 opacity-100"
              }`}
            >
              {item.icon}
            </i>

            <span
              className={`mt-2 text-xs text-gray-600 ${
                menuSelected == item.name && "font-bold text-gray-900"
              } `}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SIDEBAR = [
  {
    name: "REST",
    icon: <BsLink />,
  },
  {
    name: "GraphQL",
    icon: <BsCodeSlash />,
  },
  {
    name: "Realtime",
    icon: <BsGlobe2 />,
  },
  {
    name: "Docs",
    icon: <BsBook />,
  },
  {
    name: "Settings",
    icon: <BsGearWideConnected />,
  },
];

export default memo(Sidebar);
