import { memo } from "react";

const AuthBasicTypeForm = ({
  defaultUsername,
  onChangeUsername,
  defaultPassword,
  onChangePassword,
}) => (
  <div className="flex flex-1 items-center border-b">
    <input
      type="text"
      className="flex h-6 flex-1 rounded-none border-y-0 border-r border-l-0 border-slate-200 bg-white text-xs font-medium text-black shadow-none"
      placeholder={"Username"}
      defaultValue={defaultUsername}
      onChange={onChangeUsername}
    />
    <input
      className="flex h-6 flex-1 rounded-none border-none bg-white text-xs font-medium text-black shadow-none"
      placeholder={"Password"}
      defaultValue={defaultPassword}
      onChange={onChangePassword}
    />
  </div>
);

export default memo(AuthBasicTypeForm);
