import { defineConfig } from "vitepress";
import { fileURLToPath, URL } from "node:url";
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Snow-Sky",
  description: "A VitePress Site",
  head: [["link", { rel: "icon", href: "/snowflake.png" }]],
  vite: {
    plugins: [],
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
    logo: "snowflake.png",
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: "local",
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询条件",
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                },
              },
            },
          },
        },
      },
    },
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/install" },
      { text: "组件", link: "/components/overview" },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "指南",
          items: [
            { text: "安装", link: "/guide/install" },
            { text: "快速开始", link: "/guide/quickstart" },
          ],
        },
      ],
      "/components/": [
        {
          text: "组件库",
          items: [{ text: "组件总览", link: "/components/overview" }],
        },
        {
          text: "基础",
          items: [
            { text: "Button", link: "/components/button" },
            { text: "Switch", link: "/components/switch" },
          ],
        },
        {
          text: "数据录入",
          items: [
            { text: "Input", link: "/components/input" },
            { text: "Select", link: "/components/select" },
            { text: "Form", link: "/components/form" },
          ],
        },
        {
          text: "数据展示",
          items: [
            { text: "Collapse", link: "/components/collapse" },
            { text: "Dropdown", link: "/components/dropdown" },
          ],
        },
        {
          text: "反馈组件",
          items: [
            { text: "Message", link: "/components/message" },
            { text: "Tooltip", link: "/components/tooltip" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/QinLoong/snow-sky" },
    ],
    footer: {
      copyright: "Copyright @ 2024-present QinLoong",
    },
  },
});
