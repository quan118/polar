import { memo } from "react";
import DropdownInput from "../../DropdownInput";

const AuthApiKeyTypeForm = ({
  defaultKey,
  defaultValue,
  defaultPassBy,
  onChangeKey,
  onChangeValue,
  onChangePassBy,
}) => (
  <>
    <div className="flex items-center border-b">
      <input
        type="text"
        className="flex h-6 flex-1 rounded-none border-y-0 border-r border-l-0 border-slate-200 bg-white text-xs font-medium text-black shadow-none"
        placeholder={"Key"}
        defaultValue={defaultKey}
        onChange={onChangeKey}
      />
      <input
        type="text"
        className="flex h-6 flex-1 rounded-none border-y-0 border-l-0 border-r border-slate-200 bg-white text-xs font-medium text-black shadow-none"
        placeholder={"Value"}
        defaultValue={defaultValue}
        onChange={onChangeValue}
      />
    </div>
    <div className="flex items-center border-t-0 border-b">
      <label className="ml-1 mr-4 text-xs font-semibold text-slate-500">
        Pass by
      </label>
      <DropdownInput
        options={["Headers", "Query params"]}
        value={defaultPassBy}
        onChange={onChangePassBy}
        buttonClassName="w-28 py-1"
      />
    </div>
  </>
);

export default memo(AuthApiKeyTypeForm);
