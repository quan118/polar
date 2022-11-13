import Directory from ".";

export default {
  title: "Example/Directory",
  component: Directory,
};

const Template = (args) => <Directory {...args} />;

export const Default = Template.bind({});

Default.args = {
  id: "twitter",
  open: false,
  editting: false,
  name: "Twitter",
};
