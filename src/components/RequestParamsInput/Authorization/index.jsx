import { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import DropdownInput from "../../DropdownInput";
import AuthBasicTypeForm from "./AuthBasicTypeForm";
import AuthApiKeyTypeForm from "./AuthApiKeyTypeForm";
import { updateCollectionItemAuthKeyAction } from "../../../store/modules/collectionItem";

const AuthorizationType = ({ selected, onChangeType }) => {
  return (
    <div className="flex flex-1 items-center border-b px-2">
      <label className="mr-4 text-xs font-semibold text-slate-500">
        Authorization Type
      </label>
      <DropdownInput
        options={["none", "basic", "bearer", "apikey"]}
        selected={selected}
        onChange={onChangeType}
      />
    </div>
  );
};

const Authorization = ({ requestId }) => {
  const dispatch = useDispatch();
  const auth = useSelector((store) =>
    _.get(store, `collectionItem.byId[${requestId}].auth`)
  );

  const handleChangeType = useCallback(
    (type) => {
      dispatch(updateCollectionItemAuthKeyAction(requestId, "type", type));
    },
    [dispatch]
  );

  const handleChangeUsername = useCallback(
    (event) => {
      const basic = auth?.basic || {};
      basic.username = event.target.value;
      dispatch(updateCollectionItemAuthKeyAction(requestId, "basic", basic));
    },
    [dispatch, auth?.basic]
  );

  const handleChangePassword = useCallback(
    (event) => {
      const basic = auth?.basic || {};
      basic.password = event.target.value;
      dispatch(updateCollectionItemAuthKeyAction(requestId, "basic", basic));
    },
    [dispatch, auth?.basic]
  );

  const handleChangeBearer = useCallback(
    (event) => {
      dispatch(
        updateCollectionItemAuthKeyAction(
          requestId,
          "bearer",
          event.target.value
        )
      );
    },
    [dispatch]
  );

  const handleChangeKey = useCallback(
    (event) => {
      const apikey = auth?.apikey || {};
      apikey.key = event.target.value;
      dispatch(updateCollectionItemAuthKeyAction(requestId, "apikey", apikey));
    },
    [dispatch, auth?.apikey]
  );

  const handleChangeValue = useCallback(
    (event) => {
      const apikey = auth?.apikey || {};
      apikey.value = event.target.value;
      dispatch(updateCollectionItemAuthKeyAction(requestId, "apikey", apikey));
    },
    [dispatch, auth?.apikey]
  );

  const handleChangePassBy = useCallback(
    (value) => {
      const apikey = auth?.apikey || {};
      apikey.in = value === "Query params" ? "query" : null;
      dispatch(updateCollectionItemAuthKeyAction(requestId, "apikey", apikey));
    },
    [dispatch, auth?.apikey]
  );

  return (
    <>
      <AuthorizationType
        selected={auth?.type || "none"}
        onChangeType={handleChangeType}
      />
      {auth?.type === "basic" && (
        <AuthBasicTypeForm
          defaultUsername={auth?.basic?.username}
          defaultPassword={auth?.basic?.password}
          onChangeUsername={handleChangeUsername}
          onChangePassword={handleChangePassword}
        />
      )}
      {auth?.type === "bearer" && (
        <input
          type="text"
          className="h-6 w-full rounded-none border-x-0 border-t-0 border-slate-200 bg-white text-xs font-medium text-black shadow-none"
          placeholder={"Token"}
          defaultValue={auth?.bearer}
          onChange={handleChangeBearer}
        />
      )}
      {auth?.type === "apikey" && (
        <AuthApiKeyTypeForm
          defaultKey={auth?.apikey?.key}
          defaultValue={auth?.apikey?.value}
          defaultPassBy={auth?.apikey?.in || "Headers"}
          onChangeKey={handleChangeKey}
          onChangeValue={handleChangeValue}
          onChangePassBy={handleChangePassBy}
        />
      )}
    </>
  );
};

export default memo(Authorization);
