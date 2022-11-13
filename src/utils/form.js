import uuid from "react-uuid";

export const addNewRow = (formdata) => {
  let output = [];
  if (Array.isArray(formdata)) {
    output = [
      ...formdata,
      {
        id: uuid(),
        key: "",
        value: "",
        enabled: false,
      },
    ];
  }

  return output;
};
