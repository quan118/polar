import Select from ".";

export default {
  title: "Postpone/Select",
  component: Select,
};

export const Default = () => (
  <Select
    defaultTriggerClassname="w-40 border dark:border-neutral-400 "
    options={[
      { id: "global", name: "Global" },
      { id: "twitter", name: "Twitter" },
    ]}
  />
);
