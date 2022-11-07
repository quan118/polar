import { KVForm } from "../../components";

export default {
  title: "Example/KVForm",
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
