import KVForm from ".";

export default {
  title: "Postpone/KVForm",
  component: KVForm,
};

const Template = (args) => <KVForm {...args} />;

export const Default = Template.bind({});

Default.args = {
  data: [
    { id: 1, key: "key", value: "value", enabled: true },
    { id: 2, key: "key2", value: "value2", enabled: false },
  ],
  keyPlaceholder: "key",
  valuePlaceholder: "value",
};

export const ReadOnly = () => (
  <KVForm
    data={[
      { id: 1, key: "key", value: "value", enabled: true },
      { id: 2, key: "key2", value: "value2", enabled: false },
    ]}
    readOnly
  />
);
