import Button from "./index";

export default {
  title: "Postpone/Button",
  component: Button,
};

export const Default = () => <Button>New request</Button>;

export const Secondary = () => <Button variant="secondary">New request</Button>;

export const Disabled = () => <Button disabled>New request</Button>;
