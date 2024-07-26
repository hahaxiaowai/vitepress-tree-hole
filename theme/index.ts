// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme, DefaultTheme } from "vitepress";
import theme from "vitepress/theme";
import Blog from "./components/Blog.vue";
import FilterBlog from "./components/FilterBlog.vue";
import TimeLine from "./components/TimeLine.vue";
import Comment from "./components/Comment.vue";
import WebList from "./components/WebList.vue";
import HomeRight from "./components/HomeRight/index.vue";
import "./style.css";
// import theme from "@night-tea/vitepress-tree-hole";
export interface ThemeConfig extends DefaultTheme.Config {
  author?: string;
  /**
   * @default blog
   */
  indexPage?: "blog" | "home";
  /**
   * @default 10
   */
  docCount?: number;
  /**
   * @default now
   */
  startYear?: string;
  headImage?: string;
  headStyle?: any;
  authorImage?: string;
  umami?: {
    umamiId: string;
    umamiToken: string;
    umamiUrl: string;
  };
  comment?: {
    repo: string;
    repoId: string;
    categoryId: string;
    /**
     * @default "1"
     */
    reactionsEnabled?: "1" | "0";
  };
}
export default {
  extends: theme,
  Layout: () => {
    return h(theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      "doc-after": () => h(Comment),
      "nav-screen-content-after": () => h(HomeRight),
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.component("blog", Blog);
    app.component("category", FilterBlog);
    app.component("tag", FilterBlog);
    app.component("timeline", TimeLine);
    app.component("web-list", WebList);
  },
} satisfies Theme;
