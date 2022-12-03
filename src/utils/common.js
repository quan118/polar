import { Buffer } from "buffer";

export const removeUndefinedKeys = (obj) =>
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });

export const classNames = (...classes) => classes.filter(Boolean).join(" ");

const tagRegex = /(<([^>]+)>)/gi;

export const convertToPureText = (innerHTML) => innerHTML.replace(tagRegex, "");

export const bytesToBase64 = (bytes) => {
  var binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
};

export const getDataPresentation = (format, body) => {
  let dataPresentation;
  switch (format) {
    case "jpeg":
    case "png":
    case "jpg":
    case "webp":
      dataPresentation = `data:image/${format};base64,` + bytesToBase64(body);
      break;
    case "json":
      dataPresentation = JSON.parse(Buffer.from(body).toString());
      break;
    default:
      dataPresentation = Buffer.from(body).toString();
      break;
  }

  return dataPresentation;
};

export const getOutermostItems = (itemsInDict) =>
  Object.keys(itemsInDict)
    .map((key) => itemsInDict[key])
    .filter((item) => item.type === "group")
    .filter((item) => !item.parentId);
// .filter((item) => item.id !== "drafts"); // don't show drafts folder
