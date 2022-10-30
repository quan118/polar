import { Buffer } from "buffer";

export const removeUndefinedKeys = (obj) =>
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });

export const classNames = (...classes) => classes.filter(Boolean).join(" ");

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
      dataPresentation = `data:image/${format};base64,` + bytesToBase64(body);
      break;
    default:
      dataPresentation = JSON.parse(Buffer.from(body).toString());
      break;
  }
  return dataPresentation;
};
