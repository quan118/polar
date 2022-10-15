import { QuestionCircle, Trash } from "react-bootstrap-icons";

export function Environment() {
  return (
    <div className="w-full ">
      <div className=" flex items-center border-b pr-4">
        <input
          type="text"
          className="w-full bg-white py-2 text-xs font-bold text-gray-700 shadow-none"
          placeholder="Search"
        />
        <div className="flex items-center gap-x-2">
          <i className="cursor-pointer px-2 text-gray-700 opacity-80 transition-none duration-200 hover:opacity-100">
            <QuestionCircle className="text-gray-500" />
          </i>
          <i className="cursor-pointer text-gray-700 opacity-80 transition-none duration-200 hover:opacity-100">
            <Trash className=" text-gray-500" />
          </i>
        </div>
      </div>
      <div className="flex flex-col items-center py-10">
        <span className="py-4 text-xs font-bold text-gray-600">
          Environment is empty
        </span>
      </div>
    </div>
  );
}
