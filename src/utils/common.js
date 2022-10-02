export const removeUndefinedKeys = (obj) =>
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });

export const classNames = (...classes) => classes.filter(Boolean).join(" ");
