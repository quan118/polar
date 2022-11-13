import {
  QuestionCircle,
  Trash,
  ThreeDotsVertical,
  Archive,
  Plus,
  Layers,
  XLg,
  Check2,
  ChevronDown,
  PencilSquare,
  Files,
} from "react-bootstrap-icons";
import { memo, useCallback, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createEnvAction,
  deleteEnvAction,
  updateEnvAction,
  createEnvVarAction,
  deleteEnvVarAction,
  updateEnvVarAction,
} from "@/store/modules/environment";
import {
  setCurrentEnvIdAction,
  setEditEnvIdAction,
} from "@/store/modules/common";
import uuid from "react-uuid";
import _ from "lodash";
import { Listbox } from "@headlessui/react";
import { Menu, Transition, Dialog } from "@headlessui/react";
import Tippy from "@tippyjs/react";

const Environment = () => {
  const dispatch = useDispatch();
  const currentEnvId = useSelector((store) =>
    _.get(store, `common.currentEnvId`)
  );
  const handleEditEnvIdAction = useCallback(
    (id) => {
      dispatch(setEditEnvIdAction(id));
    },
    [dispatch]
  );

  const envs = useSelector((store) => _.get(store, `environment.env`));

  const getKeyArrayOfDict = (itemsInDict) => Object.keys(itemsInDict);

  const handleSetCurrentEnvActive = useCallback(
    (id) => {
      dispatch(setCurrentEnvIdAction(id));
    },
    [dispatch]
  );

  const handleCreateEnvAction = useCallback(() => {
    let env = {
      id: uuid(),
      name: "new env",
      variables: [{ id: uuid(), variable: "", value: "" }],
    };
    dispatch(createEnvAction(env));
  }, [dispatch]);

  const handleDuplicateEnvAction = useCallback(
    (id) => {
      console.log("clone", envs);
      let clone = _.cloneDeep(envs[id]);
      clone.id = uuid();
      clone.name += " copy";
      clone.variables.map((item) => {
        item.id = uuid();
      });
      dispatch(createEnvAction(clone));
    },
    [dispatch, envs]
  );

  const handleDeleteEnvAction = useCallback(
    (id) => {
      dispatch(deleteEnvAction(id));
    },
    [dispatch]
  );

  return (
    <div className="h-screen w-full overflow-y-hidden">
      <div className="flex w-full items-center justify-between border-b px-2 text-xs">
        <div className="w-full">
          <Listbox value={currentEnvId} onChange={handleSetCurrentEnvActive}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-pointer border-none bg-white py-2 pl-3 pr-10 text-left text-xs text-gray-700 shadow-none hover:border-none">
                <span className="block truncate">
                  {envs[currentEnvId]?.name}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDown
                    className="h-3 w-3 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-[1000] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white px-2 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {getKeyArrayOfDict(envs).map((id, idx) => (
                    <Listbox.Option
                      key={idx}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 px-4 text-xs text-gray-700 hover:bg-gray-100 ${
                          active
                            ? "bg-gray-100 font-bold text-indigo-500"
                            : "text-gray-900"
                        }`
                      }
                      value={id}
                    >
                      {({ selected }) => (
                        <div className="flex w-full items-center justify-between">
                          <span
                            className={`block truncate text-gray-700 ${
                              selected ? "font-bold " : "font-normal"
                            }`}
                          >
                            {envs[id].name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 right-0 flex items-center pl-3 text-indigo-500">
                              <Check2 className="h-5 w-5" />
                            </span>
                          ) : null}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
      <div className="flex w-full items-center justify-between border-b py-2 px-4">
        <div
          className="flex cursor-pointer items-center gap-1 text-gray-500 transition-all duration-300 hover:text-gray-700"
          onClick={handleCreateEnvAction}
        >
          <i className="">
            <Plus />
          </i>
          <span className="text-xs">New</span>
        </div>
        <div className="flex items-center gap-x-2">
          <Tippy content={"Wiki"} arrow={false} animation="scale">
            <i className="cursor-pointer px-2 text-gray-500 opacity-80 transition-none duration-200 hover:opacity-100">
              <QuestionCircle />
            </i>
          </Tippy>

          <Tippy content={"Import/Export"} arrow={false} animation="scale">
            <i className="cursor-pointer px-1 text-gray-500 opacity-80 transition-none duration-200 hover:opacity-100">
              <Archive />
            </i>
          </Tippy>
        </div>
      </div>
      <div className="flex h-full flex-col items-start overflow-y-auto py-2 text-xs text-gray-600">
        {getKeyArrayOfDict(envs).map((id, idx) => (
          <div
            className="flex w-full cursor-pointer items-center justify-between px-4 py-2"
            key={idx}
          >
            <div
              className="flex items-center gap-4"
              onClick={() => {
                handleEditEnvIdAction(id);
              }}
            >
              <i className="">
                <Layers />
              </i>
              <span className="truncate">{envs[id].name}</span>
            </div>

            <div className="group flex w-full items-center justify-end text-xs transition-all duration-200 ">
              <Menu>
                <div>
                  <Menu.Button
                    className={"z-[0] border-0 pr-0 text-gray-700 shadow-none"}
                  >
                    <Tippy content={"More"} arrow={false} animation="scale">
                      <i className=" cursor-pointer text-sm">
                        <ThreeDotsVertical />
                      </i>
                    </Tippy>
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    className={
                      "border-1 absolute right-0 z-10 mt-20 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    }
                  >
                    <Menu.Item>
                      {() => (
                        <div
                          className="mt-2 flex w-full cursor-pointer items-center justify-start gap-4  bg-white px-4 py-2 text-gray-700 transition-all duration-200 hover:border-0 hover:bg-gray-100"
                          onClick={() => {
                            handleEditEnvIdAction(id);
                          }}
                        >
                          <i className="">
                            <PencilSquare />
                          </i>
                          <span className="">Edit</span>
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {() => (
                        <div
                          className="mt-2 flex w-full cursor-pointer items-center justify-start gap-4  bg-white px-4 py-2 text-gray-700 transition-all duration-200 hover:border-0 hover:bg-gray-100"
                          onClick={() => {
                            handleDuplicateEnvAction(id);
                          }}
                        >
                          <i className="">
                            <Files />
                          </i>
                          <span className="">Duplicate</span>
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {() => (
                        <div
                          className="mb-2 flex w-full cursor-pointer items-center justify-start gap-4  bg-white px-4 py-2 text-gray-700 transition-all duration-200 hover:border-0 hover:bg-gray-100"
                          onClick={() => {
                            handleDeleteEnvAction(id);
                          }}
                        >
                          <i className="">
                            <Trash />
                          </i>
                          <span className="">Delete</span>
                        </div>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        ))}
      </div>
      <EditEnvDialog />
    </div>
  );
};

function EditEnvDialog() {
  const dispatch = useDispatch();
  const editEnvId = useSelector((store) => _.get(store, `common.editEnvId`));
  const handleEditEnvIdAction = useCallback(
    (id) => {
      dispatch(setEditEnvIdAction(id));
    },
    [dispatch, editEnvId]
  );
  const envs = useSelector((store) => _.get(store, `environment.env`));

  const handleCreateEnvVarAction = useCallback(
    (id) => {
      const envVar = {
        id: uuid(),
        variable: "",
        value: "",
      };

      dispatch(createEnvVarAction(id, envVar));
    },
    [dispatch]
  );
  const handleDeleteEnvVarAction = useCallback(
    (pid, cid) => {
      dispatch(deleteEnvVarAction(pid, cid));
    },
    [dispatch]
  );
  const handleDeleteAllEnvVarAction = useCallback(
    (pid) => {
      envs[pid].variables.map((item) => {
        dispatch(deleteEnvVarAction(pid, item.id));
      });
    },
    [dispatch, envs]
  );
  const handleUpdateEnvVarAction = useCallback(
    (pid, cid, vr, vl) => {
      let edited = {
        id: cid,
        variable: vr,
        value: vl,
      };

      let variables = [...envs[pid].variables];
      const cidx = variables.findIndex((obj) => obj.id == cid);
      variables[cidx] = edited;

      dispatch(updateEnvVarAction(pid, variables));
    },
    [dispatch, envs]
  );
  const handleUpdateEnvNameAction = useCallback(
    (name) => {
      let env = { ...envs[editEnvId], name: name };

      dispatch(updateEnvAction(editEnvId, env));
    },
    [dispatch, envs, editEnvId]
  );

  return (
    <Transition.Root show={!!editEnvId} as={Fragment}>
      <Dialog
        open={!!editEnvId}
        onClose={() => handleEditEnvIdAction("")}
        as="div"
        className="fixed inset-0 z-10 flex items-start justify-center overflow-y-scroll text-gray-700 backdrop-blur-sm"
      >
        <Dialog.Panel className="mt-24 w-full max-w-lg rounded-lg  border bg-white py-5 shadow-md">
          <Dialog.Title
            className={
              "mb-4 flex items-center justify-between px-6 pb-2 text-lg font-bold"
            }
          >
            <div className="">Edit Enviroment</div>
            <i
              className="cursor-pointer text-xs text-gray-500 transition-all duration-200 hover:text-gray-800"
              onClick={() => handleEditEnvIdAction("")}
            >
              <XLg />
            </i>
          </Dialog.Title>
          <Dialog.Panel
            className={
              "mb-4 flex flex-col items-center justify-between gap-4 px-6 pb-2 font-bold"
            }
          >
            <div className=" relative w-full rounded-md border px-3 py-2 shadow-sm focus-within:border-gray-400 ">
              <label className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs text-[0.6rem] font-normal text-gray-500">
                Label
              </label>
              <form
                action=""
                className=""
                onSubmit={() => {
                  handleEditEnvIdAction("");
                }}
              >
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={envs[editEnvId]?.name}
                  onChange={(e) => {
                    handleUpdateEnvNameAction(e.target.value);
                  }}
                  className="m-0 block w-full bg-white p-0 text-gray-700 shadow-none transition-all duration-300 focus:ring-0 sm:text-xs"
                  placeholder={envs[editEnvId]?.name || "Name"}
                />
              </form>
            </div>
            <div className=" w-full">
              <div className="flex items-center justify-between">
                <span className="bg-white px-1 text-left text-xs font-normal text-gray-500">
                  Variables
                </span>
                <div className="flex items-center justify-end gap-4">
                  <div
                    className=" cursor-pointer"
                    onClick={() => {
                      handleDeleteAllEnvVarAction(editEnvId);
                    }}
                  >
                    <i className="">
                      <Trash />
                    </i>
                  </div>
                  <div
                    className=" cursor-pointer"
                    onClick={() => handleCreateEnvVarAction(editEnvId)}
                  >
                    <i className="">
                      <Plus />
                    </i>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                {envs[editEnvId]?.variables?.map((item) => (
                  <div
                    className="flex items-center border text-gray-700"
                    key={item.id}
                  >
                    <form
                      action=""
                      className=""
                      onSubmit={() => {
                        handleEditEnvIdAction("");
                      }}
                    >
                      <input
                        type="text"
                        className="rounded-none border-y-0 border-l-0 border-gray-200 bg-white text-xs text-gray-700 shadow-none"
                        placeholder="Variable"
                        defaultValue={item.variable}
                        onChange={(e) => {
                          handleUpdateEnvVarAction(
                            editEnvId,
                            item.id,
                            e.target.value,
                            item.value
                          );
                          // edit variable
                        }}
                      />
                    </form>
                    <form
                      action=""
                      className=""
                      onSubmit={() => {
                        handleEditEnvIdAction("");
                      }}
                    >
                      <input
                        type="text"
                        className="rounded-none border-y-0 border-l-0 border-gray-200 bg-white text-xs text-gray-700 shadow-none"
                        placeholder="Value"
                        defaultValue={item.value}
                        onChange={(e) => {
                          handleUpdateEnvVarAction(
                            editEnvId,
                            item.id,
                            item.variable,
                            e.target.value
                          );
                          // edit value
                        }}
                      />
                    </form>
                    <div
                      className=" flex w-full cursor-pointer items-center justify-center border-gray-200"
                      onClick={() => {
                        handleDeleteEnvVarAction(editEnvId, item.id);
                      }}
                    >
                      <i className="">
                        <Trash />
                      </i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Dialog.Panel>
          <Dialog.Panel className={"px-6"}>
            <div className="flex items-center gap-4">
              <button
                className="rounded-md bg-indigo-500 py-1.5 text-sm text-white transition-all duration-300 hover:bg-indigo-700"
                onClick={() => handleEditEnvIdAction("")}
              >
                OK
              </button>
            </div>
          </Dialog.Panel>
        </Dialog.Panel>
      </Dialog>
    </Transition.Root>
  );
}

export default memo(Environment);
