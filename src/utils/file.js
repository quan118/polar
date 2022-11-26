import { writeTextFile } from "@tauri-apps/api/fs";
import { Collection, Item, ItemGroup, Header } from "postman-collection";

export const saveJsonObjectToFile = async (json, path) => {
  try {
    await writeTextFile(path, JSON.stringify(json));
  } catch (e) {
    console.log("[saveJsonObjectToFile]:", e);
  }
};

const createRequestBody = (request) => {
  if (!request.body) return undefined;

  const definition = {
    mode: request.body.mode,
    raw: request.body.raw,
    urlencoded: Array.isArray(request.body?.urlencoded)
      ? request.body?.urlencoded?.map((e) => ({
          key: e.key,
          value: e.value,
          enabled: !e.disabled,
        }))
      : undefined,
    file: request.body?.file || undefined,
    formdata: Array.isArray(request.body?.formdata)
      ? request.body?.formdata.map((e) => ({
          key: e.key,
          value: e.value,
          enabled: !e.disabled,
        }))
      : undefined,
  };

  return definition;
};

const createRequestAuth = (request) => {
  if (!request.auth) return undefined;

  const definition = {};
  request.auth.type && (definition.type = request.auth.type);

  if (request.auth.basic) {
    definition.basic = [];
    if (request.auth.basic.username) {
      definition.basic.push({
        key: "username",
        value: request.auth.basic.username,
        type: "string",
      });
    }

    if (request.auth.basic.password) {
      definition.basic.push({
        key: "password",
        value: request.auth.basic.password,
        type: "string",
      });
    }
  }

  if (request.auth.bearer) {
    definition.bearer = [
      {
        key: "token",
        value: request.auth.bearer,
        type: "string",
      },
    ];
  }

  if (request.auth.apikey) {
    definition.apikey = [];
    if (request.auth.apikey.in === "query") {
      definition.apikey.push({
        key: "in",
        value: "query",
        type: "string",
      });
    }

    definition.apikey.push({
      key: "key",
      value: definition.apikey.key,
      type: "string",
    });

    definition.apikey.push({
      key: "value",
      value: definition.apikey.value,
      type: "string",
    });
  }

  return definition;
};

const createItem = (request) => {
  return new Item({
    name: request.name,
    request: {
      url: request.url?.raw || "",
      method: request.method,
      header: request.header.map(
        (h) =>
          new Header({
            key: h.key,
            value: h.value,
            enabled: !h.disabled,
          })
      ),
      body: createRequestBody(request),
      auth: createRequestAuth(request),
    },
  });
};

const createItemGroup = (itemId, collectionItemById) => {
  const folder = collectionItemById[itemId];
  if (!folder) return null;

  const itemGroup = new ItemGroup({ name: folder.name });

  // handle sub groups
  folder.subGroups?.forEach((id) => {
    const group = createItemGroup(id, collectionItemById);
    itemGroup.items.add(group);
  });

  // handle requests
  folder.requests?.forEach((requestId) => {
    const item = createItem(collectionItemById[requestId]);
    itemGroup.items.add(item);
  });

  return itemGroup;
};

export const exportCollectionToFile = async (
  collectionId,
  collectionItemById,
  outputPath
) => {
  try {
    let id = collectionId;
    let currentItem = collectionItemById[id];
    if (!currentItem) return null;

    const collection = new Collection({ info: { name: currentItem.name } });

    // handle subGroups
    currentItem.subGroups?.forEach((itemId) => {
      const group = createItemGroup(itemId, collectionItemById);
      collection.items.add(group);
    });

    // handle requests
    currentItem.requests?.forEach((requestId) => {
      const item = createItem(collectionItemById[requestId]);
      collection.items.add(item);
    });

    await writeTextFile(outputPath, JSON.stringify(collection));
  } catch (e) {
    console.log(e);
  }
};
