import { themes } from "@storybook/theming";
import "../src/style.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    dark: { ...themes.dark, appBg: "black" },
    light: { ...themes.normal, appBg: "white" },
    darkClass: "dark",
    lightClass: "light",
    stylePreview: true,
  },
  // backgrounds: {
  //   default: 'twitter',
  //   values: [
  //     {
  //       name: 'twitter',
  //       value: '#00aced',
  //     },
  //     {
  //       name: 'facebook',
  //       value: '#3b5998',
  //     },
  //   ],
  // },
  // viewport: {
  //   viewports: {
  //     kindleFire2: {
  //       name: 'Kindle Fire 2',
  //       styles: {
  //         width: '600px',
  //         height: '963px',
  //         backgroundColor: 'white'
  //       },
  //     },
  //   },
  //   defaultViewport: 'kindleFire2',
  // },
};
