import { URL, fileURLToPath } from "node:url";
import type { RawConfigExports } from "vitepress";
import type { ThemeConfig } from ".";

// const isEnv = process.env.NODE_ENV !== "production";
const baseConfig = {
  lang: "zh",
  rewrites: {
    "page/(.*)": "(.*)",
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPDoc\.vue$/,
          replacement: fileURLToPath(
            new URL("./components/Doc.vue", import.meta.url),
          ),
        },
      ],
    },
  },
  markdown: {
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "简述",
      detailsLabel: "详细信息",
    },
  },
  themeConfig: {
    docCount: 10,
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    lastUpdated: {
      text: "更新于",
      formatOptions: {
        dateStyle: "medium",
        timeStyle: "medium",
      },
    },
    search: {
      provider: "local",
      options: {
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
    notFound: {
      title: "未找到页面，迷路了~",
      quote: "请检查地址是否正确，或当前页面未开通，点击下方按钮返回首页",
      linkText: "返回首页",
    },
    sidebarMenuLabel: "侧边栏",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换至浅色模式",
    darkModeSwitchTitle: "切换至深色模式",
    returnToTopLabel: "返回顶部",
    outline: {
      label: "页面导航",
    },
  },
} as RawConfigExports<ThemeConfig>;
export default baseConfig;
