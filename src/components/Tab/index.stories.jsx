import Tab from "./index";

export default {
  title: "Postpone/Tab",
  component: Tab,
};

export const Default = () => (
  <Tab variant="secondary" label="Headers" className="bg-blue-200" />
);

export const Selected = () => (
  <Tab variant="secondary" label="Headers" selected />
);

export const WithRightComponent = () => (
  <Tab
    variant="secondary"
    label="Headers"
    selected
    rightComponent={
      <span className="ml-1 rounded border px-1 text-xxxs">2</span>
    }
  />
);
