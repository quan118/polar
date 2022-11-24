import {
  useCallback,
  useRef,
  useReducer,
  useState,
  useMemo,
  Fragment,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import { FolderPlus, Pen, Plus } from "react-bootstrap-icons";
import uuid from "react-uuid";
import Fuse from "fuse.js";
import { getOutermostItems } from "@/utils/common";
import Directory from "../Directory";
import { Tooltip } from "../Tooltip";

const reducer = (state, action) => {
  switch (action.type) {
    case "toggle":
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          collapse: !state[action.id].collapse,
        },
      };
    case "updateEditing": {
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          editing: state[action.id].editing,
        },
      };
    }
    case "updateName": {
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          name: action.name,
        },
      };
    }
    case "addNew": {
      const newState = {
        ...state,
        [action.id]: {
          id: action.id,
          name: action.name,
          parentId: action.parentId,
          type: "group",
        },
      };
      if (action.parentId) {
        newState[action.parentId] = {
          ...state[action.parentId],
          subGroups: [...(state[action.parentId].subGroups || []), action.id],
        };
      }

      return newState;
    }
    default:
      return state;
  }
};

const DirectoryTree = ({
  allDirectories,
  subGroups,
  searchText,
  selectedId,
  editingId,
  onToggle,
  onToggleRename,
  onUpdateName,
  onFinishEditing,
  onAddNew,
}) => {
  const fuse = useMemo(() => {
    const subGroupsInDict = subGroups.map((id) => allDirectories[id]);
    return new Fuse(subGroupsInDict, { keys: ["name"] });
  }, [allDirectories, subGroups]);

  const filteredSubGroups = useMemo(() => {
    if (!searchText) return subGroups;
    return fuse.search(searchText).map((e) => e.item.id);
  }, [fuse, searchText]);

  return (
    <div className="ml-4 border-l-2 border-gray-200">
      {filteredSubGroups?.length > 0 &&
        filteredSubGroups?.map((id) => (
          <Fragment key={id}>
            <Directory
              id={id}
              key={id}
              className={selectedId === id ? "bg-blue-500" : ""}
              name={allDirectories[id].name}
              open={!allDirectories[id].collapse}
              editing={editingId === id}
              onToggle={onToggle}
              onUpdateName={onUpdateName}
              onFinishEditing={onFinishEditing}
            >
              {!searchText && (
                <div className="flex flex-1 flex-row justify-end gap-4">
                  <Tooltip content={"New Collection"}>
                    <FolderPlus
                      className="cursor-pointer"
                      onClick={onAddNew(id)}
                    />
                  </Tooltip>

                  <Tooltip content={"Rename"}>
                    <Pen
                      className="cursor-pointer"
                      onClick={onToggleRename(id)}
                    />
                  </Tooltip>
                </div>
              )}
            </Directory>
            {!allDirectories[id].collapse &&
              allDirectories[id].subGroups?.length > 0 && (
                <DirectoryTree
                  key={id}
                  allDirectories={allDirectories}
                  subGroups={allDirectories[id].subGroups}
                  selectedId={selectedId}
                  editingId={editingId}
                  onToggle={onToggle}
                  onToggleRename={onToggleRename}
                  onUpdateName={onUpdateName}
                  onFinishEditing={onFinishEditing}
                  onAddNew={onAddNew}
                  searchText={searchText}
                />
              )}
          </Fragment>
        ))}
    </div>
  );
};

const Directories = (
  { allDirectories, onSelectDir, selectedDirId, tab },
  ref
) => {
  const [localState, localDispatch] = useReducer(reducer, allDirectories);
  const [editingId, setEditingId] = useState();
  const [searchText, setSearchText] = useState();
  const dirties = useRef({});

  useEffect(() => {
    onSelectDir(tab.parentId);
  }, [tab]);

  const outerMostDirectories = useMemo(() => {
    return getOutermostItems(localState);
  }, [localState]);

  const fuse = useMemo(() => {
    return new Fuse(outerMostDirectories, { keys: ["name"] });
  }, [outerMostDirectories]);

  const directories = useMemo(() => {
    if (searchText) {
      return fuse.search(searchText).map((e) => e.item);
    } else {
      return outerMostDirectories;
    }
  }, [searchText, fuse]);

  console.log("FILTERED DIRECTORIES:", directories);

  const handleSearch = useCallback((event) => {
    setSearchText(event.target.value);
  }, []);

  const handleToggle = useCallback(
    (id) => () => {
      localDispatch({ type: "toggle", id });
      onSelectDir(id);
    },
    []
  );

  const handleToggleRename = useCallback(
    (id) => (event) => {
      event.stopPropagation();
      setEditingId(id);
      console.log("editing id:", id);
    },
    []
  );

  const handleFinishEditing = useCallback(
    (id) => () => {
      setEditingId(undefined);
      if (dirties.current[id] !== "new") {
        dirties.current[id] = "rename";
      }
    },
    [dirties.current]
  );

  const handleUpdateName = useCallback(
    (id) => (event) => {
      localDispatch({ type: "updateName", id, name: event.target.value });
    },
    []
  );

  const handleAddNew = useCallback(
    (parentId) => (event) => {
      event.stopPropagation();
      const id = uuid();
      localDispatch({
        type: "addNew",
        parentId,
        id,
        name: "New folder",
      });

      // open parent directory if it is closed
      if (localState[parentId]?.collapse) {
        localDispatch({ type: "toggle", id: parentId });
      }

      // focus to newly created directory
      setEditingId(id);
      console.log("add new");
      dirties.current[id] = "new";
    },
    [localState, dirties.current]
  );

  useImperativeHandle(
    ref,
    () => ({
      getLocalState: () => localState,
      getDirties: () => dirties.current,
    }),
    [localState, dirties.current]
  );

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search"
        className="block w-full rounded-none border-none text-sm text-gray-700 shadow-none"
        onChange={handleSearch}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
      />
      <div className="flex h-8 w-full flex-row border-y border-slate-200">
        <button
          type="button"
          className=" flex h-full flex-row items-center gap-1 border-none bg-transparent px-1 shadow-none transition-none hover:border-none focus:border-none"
          onClick={handleAddNew(undefined)}
        >
          <Plus size={18} />
          <span className="text-xs">New</span>
        </button>
      </div>
      <div className="h-44 w-full overflow-auto">
        {directories.map((dir) => (
          <Fragment key={dir.id}>
            <Directory
              id={dir.id}
              key={dir.id}
              className={selectedDirId === dir.id ? "bg-blue-500" : ""}
              name={localState[dir.id]?.name}
              open={!localState[dir.id]?.collapse}
              editing={editingId === dir.id}
              onToggle={handleToggle}
              onFinishEditing={handleFinishEditing}
              onUpdateName={handleUpdateName}
            >
              {!searchText && dir.id !== "drafts" && (
                <div className="flex flex-1 flex-row justify-end gap-4">
                  <Tooltip content={"New Collection"}>
                    <FolderPlus
                      className="cursor-pointer"
                      onClick={handleAddNew(dir.id)}
                    />
                  </Tooltip>

                  <Tooltip content={"Rename"}>
                    <Pen
                      className="cursor-pointer"
                      onClick={handleToggleRename(dir.id)}
                    />
                  </Tooltip>
                </div>
              )}
            </Directory>
            {!localState[dir.id].collapse &&
              localState[dir.id].subGroups?.length > 0 && (
                <DirectoryTree
                  allDirectories={localState}
                  subGroups={localState[dir.id].subGroups}
                  selectedId={selectedDirId}
                  editingId={editingId}
                  onToggle={handleToggle}
                  onToggleRename={handleToggleRename}
                  onUpdateName={handleUpdateName}
                  onFinishEditing={handleFinishEditing}
                  onAddNew={handleAddNew}
                  searchText={searchText}
                />
              )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default forwardRef(Directories);
