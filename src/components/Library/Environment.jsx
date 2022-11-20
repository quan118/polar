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
  deleteEnvAndRelatedVarsAction,
  createEnvVarAction,
  deleteEnvVarAction,
  deleteAllVarsOfEnvAction,
  setEnvPropertyLevel1Action,
} from "@/store/modules/environment";
import { setVarPropertiesLevel1Action } from "@/store/modules/variable";
import {
  setCurrentEnvIdAction,
  setEditEnvIdAction,
} from "@/store/modules/common";
import uuid from "react-uuid";
import _ from "lodash";
import { Listbox } from "@headlessui/react";
import { Transition, Dialog } from "@headlessui/react";
import Tippy from "@tippyjs/react";

import "@radix-ui/colors/blackA.css";
import "@radix-ui/colors/mauve.css";
import "@radix-ui/colors/violet.css";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

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

  const envs = useSelector((store) => _.get(store, `environment.byId`));

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
      variables: [uuid()],
    };
    dispatch(createEnvAction(env));
  }, [dispatch]);

  const handleDuplicateEnvAction = useCallback(
    (id) => {
      console.log("clone", envs);
      let clone = _.cloneDeep(envs[id]);
      clone.id = uuid();
      clone.name += " copy";
      clone.variables.map(uuid);
      dispatch(createEnvAction(clone));
    },
    [dispatch, envs]
  );

  const handleDeleteEnvAction = useCallback(
    (id) => () => {
      dispatch(deleteEnvAndRelatedVarsAction(id));
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
              <Layers className="h-4 w-4" />

              <span className="truncate">{envs[id].name}</span>
            </div>

            <div className="group flex w-full items-center justify-end text-xs transition-all duration-200 ">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <div className="" aria-label="Customise options">
                    <ThreeDotsVertical />
                  </div>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="DropdownMenuContent alignOffset-start z-20"
                    sideOffset={5}
                    align={"end"}
                    alignOffset={0}
                  >
                    <DropdownMenu.Item
                      className="DropdownMenuItem"
                      onSelect={() => {
                        handleEditEnvIdAction(id);
                      }}
                    >
                      <PencilSquare className="mr-2" />
                      Edit
                      <div className="RightSlot">⌘+E</div>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item
                      className="DropdownMenuItem"
                      onSelect={() => {
                        handleDuplicateEnvAction(id);
                      }}
                    >
                      <Files className="mr-2" />
                      Duplicate
                      <div className="RightSlot">⌘+U</div>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item
                      className="DropdownMenuItem"
                      onSelect={() => {
                        handleDeleteEnvAction(id);
                      }}
                    >
                      <Trash className="mr-2" />
                      Delete
                      <div className="RightSlot">⌘+D</div>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
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
  const variables = useSelector((store) => store.variable.byId);
  const editEnvId = useSelector((store) => _.get(store, `common.editEnvId`));
  const handleEditEnvIdAction = useCallback(
    (id) => {
      dispatch(setEditEnvIdAction(id));
    },
    [dispatch, editEnvId]
  );
  const env = useSelector((store) =>
    _.get(store, `environment.byId[${editEnvId}]`)
  );

  const handleCreateEnvVarAction = useCallback(
    (id) => () => {
      const variable = {
        id: uuid(),
        environmentId: id,
        name: "",
        type: "default",
        initialValue: "",
        currentValue: "",
      };

      dispatch(createEnvVarAction(id, variable));
    },
    [dispatch]
  );

  const handleDeleteEnvVarAction = useCallback(
    (varId) => () => {
      dispatch(deleteEnvVarAction(varId));
    },
    [dispatch]
  );

  const handleDeleteAllEnvVarAction = useCallback(
    (id) => () => {
      dispatch(deleteAllVarsOfEnvAction(id));
    },
    []
  );

  const handleUpdateEnvVarAction = useCallback(
    (id, key) => (evt) => {
      dispatch(setVarPropertiesLevel1Action(id, key, evt.target.value));
    },
    [dispatch]
  );

  const handleUpdateEnvNameAction = useCallback(
    (e) => {
      dispatch(setEnvPropertyLevel1Action(editEnvId, "name", e.target.value));
    },
    [dispatch, editEnvId]
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
                  defaultValue={env?.name}
                  onChange={handleUpdateEnvNameAction}
                  className="m-0 block w-full bg-white p-0 text-gray-700 shadow-none transition-all duration-300 focus:ring-0 sm:text-xs"
                  placeholder="Name"
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
                    onClick={handleDeleteAllEnvVarAction(editEnvId)}
                  >
                    <i className="">
                      <Trash />
                    </i>
                  </div>
                  <div
                    className=" cursor-pointer"
                    onClick={handleCreateEnvVarAction(editEnvId)}
                  >
                    <i className="">
                      <Plus />
                    </i>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                {env?.variables?.map((varId) => (
                  <div
                    className="flex items-center border text-gray-700"
                    key={variables[varId].id}
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
                        defaultValue={variables[varId].name}
                        onChange={handleUpdateEnvVarAction(varId, "name")}
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
                        defaultValue={variables[varId].currentValue}
                        onChange={handleUpdateEnvVarAction(
                          varId,
                          "currentValue"
                        )}
                      />
                    </form>
                    <div
                      className=" flex w-full cursor-pointer items-center justify-center border-gray-200"
                      onClick={handleDeleteEnvVarAction(varId)}
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
