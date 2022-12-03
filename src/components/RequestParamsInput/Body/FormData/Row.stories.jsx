import { Row } from "./Row";

export default {
  title: "Postpone/Body/FormData/Row",
  component: Row,
};

export const Default = () => (
  <Row
    className="w-[500px]"
    keyPlaceholder="Parameter"
    key_="Param"
    onChangeKey={() => {}}
    valuePlaceholder="Value"
    value="Value"
    onChangeValue={() => {}}
    enabled
    onToggle={() => {}}
    onDelete={() => {}}
  />
);

export const File = () => (
  <Row
    className="w-[500px]"
    keyPlaceholder="Parameter"
    key_="Param"
    onChangeKey={() => {}}
    valuePlaceholder="Value"
    value="sample.txt"
    onChangeValue={() => {}}
    enabled
    onToggle={() => {}}
    onDelete={() => {}}
    isFile
  />
);
