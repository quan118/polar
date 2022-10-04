import { createContext, useContext, useState } from "react";

export const CollectionsContext = createContext();

export const generateObjectID = function () {
  var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
};

export function CollectionsProvider(props) {
  const [collections, setCollections] = useState([
    // {
    //   label: "Folder",
    //   objectId: generateObjectID(),
    //   isOpen: false,
    //   folder: [],
    //   rests: [
    //     {
    //       name: "Request 1",
    //       objectId: generateObjectID(),
    //       type: "GET",
    //       selected: false,
    //     },
    //   ],
    // },
  ]);

  const [restEdit, setRestEdit] = useState(null);
  const [folderEdit, setFolderEdit] = useState(null);

  const openFolder = (folder, id) => {
    console.log(id);
    if (folder.objectId == id) {
      folder.isOpen = !folder.isOpen;
      setCollections([...collections]);
      return;
    }
    folder.folder.forEach((item) => {
      if (item.folder.length > 0) {
        openFolder(item.folder, id);
      }
    });
  };

  const addFolder = (folder, id) => {
    folder.isOpen = true;
    if (id !== null)
      folder.folder.push({
        label: "Folder",
        objectId: generateObjectID(),
        isOpen: false,
        folder: [],
        rests: [
          // {
          //   name: "Request 1",
          //   objectId: generateObjectID(),
          //   type: "GET",
          //   selected: false,
          // },
        ],
      });
    else
      folder.push({
        label: "Folder",
        objectId: generateObjectID(),
        isOpen: false,
        folder: [],
        rests: [
          // {
          //   name: "Request 1",
          //   objectId: generateObjectID(),
          //   type: "GET",
          //   selected: false,
          // },
        ],
      });
    setCollections([...collections]);
  };

  const addRest = (folder) => {
    folder.isOpen = true;
    folder.rests.push({
      name: "Request 1",
      objectId: generateObjectID(),
      type: "GET",
      selected: false,
    });
    setCollections([...collections]);
  };

  const duplicateRest = (folder, idRest) => {
    folder.isOpen = true;
    folder.rests.forEach((item, index) => {
      if (item.objectId === idRest) {
        folder.rests.splice(index + 1, 0, {
          ...item,
          name: item.name + "-duplicate",
          objectId: generateObjectID(),
          selected: false,
        });
      }
    });
    setCollections([...collections]);
  };

  // {
  //   label: "Folder",
  //   objectId: generateObjectID(),
  //   isOpen: false,
  //   folder: [],
  //   rests: [
  //     {
  //       name: "Request 1",
  //       objectId: generateObjectID(),
  //       type: "GET",
  //       selected: false,
  //     },
  //   ],
  // },
  const duplicateFolder = (folder, fId) => {
    console.log("duplicateFolder called");
    if (folder?.length > 0)
      folder?.forEach((item, index) => {
        if (item.objectId == fId) {
          let copy = structuredClone(item);
          updateDeepCopyFolder(copy);
          folder?.splice(index + 1, 0, copy);
          return;
        } else {
          duplicateFolder(item.folder, fId);
        }
      });
    setCollections([...collections]);
    return;
  };

  const updateDeepCopyFolder = (folder) => {
    folder.label = folder.label + "-copy";
    folder.objectId = generateObjectID();
    folder.rests.forEach((item) => {
      item.name = item.name + "-copy";
      item.objectId = generateObjectID();
    });
    console.log("updateDeepCopy", folder);
    folder.folder.forEach((item) => {
      updateDeepCopyFolder(item);
    });
  };

  const deleteRest = (folder, id) => {
    if (folder.rests == 0) return;
    folder.rests.forEach((item, index) => {
      if (item.objectId == id) {
        folder.rests.splice(index, 1);
        return;
      }
    });
    setCollections([...collections]);
  };

  const deleteFolder = (folder, id) => {
    if (folder?.length > 0)
      folder?.forEach((item, index) => {
        if (item.objectId == id) {
          folder?.splice(index, 1);
          setCollections([...collections]);
          return;
        } else {
          deleteFolder(item.folder, id);
        }
      });
  };

  const handleEditRest = (newName) => {
    restEdit.name = newName;
    setCollections([...collections]);
    setRestEdit(null);
  };

  const handleEditFolder = (newName) => {
    folderEdit.label = newName;
    setCollections([...collections]);
    setFolderEdit(null);
  };

  const setRestSelectedFalse = (folder) => {
    folder.forEach((item) => {
      if (item.rests.length > 0)
        item.rests.forEach((i) => (i.selected = false));
      if (item.folder.length > 0) setRestSelectedFalse(item.folder);
    });
  };

  const selectRest = (rest) => {
    setRestSelectedFalse(collections);
    rest.selected = !rest.selected;
    setCollections([...collections]);
  };

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        setCollections,
        openFolder,
        addFolder,
        addRest,
        selectRest,
        deleteRest,
        deleteFolder,
        duplicateRest,
        duplicateFolder,
        restEdit,
        setRestEdit,
        handleEditRest,
        folderEdit,
        setFolderEdit,
        handleEditFolder,
      }}
    >
      {props.children}
    </CollectionsContext.Provider>
  );
}

export const useCollections = () => useContext(CollectionsContext);
