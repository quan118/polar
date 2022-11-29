import Button from "../Button";
import SaveRequestDropdownMenu from "./SaveRequestDropdownMenu";

export default {
  title: "Postpone/SaveRequestDropdownMenu",
  component: SaveRequestDropdownMenu,
};

export const Default = () => (
  <SaveRequestDropdownMenu>
    <Button>Save as</Button>
  </SaveRequestDropdownMenu>
);
