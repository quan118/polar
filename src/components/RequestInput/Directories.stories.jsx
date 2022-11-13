import Directories from "./Directories";

export default {
  title: "Example/Directories",
  component: Directories,
};

const Template = (args) => <Directories {...args} />;

export const Default = Template.bind({});

Default.args = {
  allDirectories: {
    twitter: {
      id: "twitter",
      type: "group",
      name: "Twitter API",
      subGroups: ["twitter-auth", "twitter-tweet"],
    },
    "twitter-auth": {
      id: "twitter-auth",
      parentId: "twitter",
      type: "group",
      name: "Twitter Auth",
    },
    "twitter-tweet": {
      id: "twitter-tweet",
      parentId: "twitter",
      type: "group",
      name: "Twitter Tweet",
    },
    facebook: {
      id: "facebook",
      type: "group",
      name: "Facebook API",
      subGroups: [
        "facebook-auth",
        "facebook-posts",
        "facebook-friends",
        "facebook-ads",
        "facebook-reels",
      ],
    },
    "facebook-auth": {
      id: "facebook-auth",
      parentId: "facebook",
      type: "group",
      name: "Facebook Auth",
    },
    "facebook-posts": {
      id: "facebook-posts",
      parentId: "facebook",
      type: "group",
      name: "Facebook Posts",
    },
    "facebook-friends": {
      id: "facebook-friends",
      parentId: "facebook",
      type: "group",
      name: "Facebook Friends",
    },
    "facebook-ads": {
      id: "facebook-ads",
      parentId: "facebook",
      type: "group",
      name: "Facebook Ads",
    },
    "facebook-reels": {
      id: "facebook-reels",
      parentId: "facebook",
      type: "group",
      name: "Facebook Reels",
    },
  },
};

Default.decorators = [
  (Story) => (
    <div className="h-40 w-96 overflow-auto border border-slate-500">
      <Story />
    </div>
  ),
];
