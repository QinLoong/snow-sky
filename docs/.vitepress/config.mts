import { defineConfig } from "vitepress";
import { fileURLToPath, URL } from "node:url";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueMacros from "unplugin-vue-macros";
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  vite: {
    plugins: [
      // VueMacros.vite({
      //   setupComponent: false,
      //   setupSFC: false,
      //   plugins: {
      //     vueJsx: vueJsx(),
      //   },
      // }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("../../src", import.meta.url)),
      },
    },
  },
  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
      {
        text: "Basic",
        items: [
          { text: "Button", link: "/components/button" },
          { text: "Input", link: "/components/input" },
          { text: "Switch", link: "/components/switch" },
          { text: "Select", link: "/components/select" },
          { text: "Form", link: "/components/form" },
          { text: "Tooltip", link: "/components/tooltip" },
          { text: "Collapse", link: "/components/collapse" },
          { text: "Dropdown", link: "/components/dropdown" },
          { text: "Message", link: "/components/message" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
