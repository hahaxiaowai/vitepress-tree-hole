// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { DefaultTheme, Theme } from "vitepress";
import theme from "vitepress/theme";
import Blog from "./components/Blog.vue";
import FilterBlog from "./components/FilterBlog.vue";
import TimeLine from "./components/TimeLine.vue";
import Comment from "./components/Comment.vue";
import WebList from "./components/WebList.vue";
import HomeRight from "./components/HomeRight/index.vue";
import BackTop from "./components/BackTop.vue";
import Fall from "./components/Fall/index.vue";
// import theme from "@night-tea/vitepress-tree-hole";
import "./style.css";
// uno.css
import "virtual:uno.css";

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
  fall?: {
    image: "season" | "leaf" | "pop" | "sakura" | "snow";
    count?: number;
  };
  /**
   * https://github.com/simple-icons/simple-icons/blob/master/slugs.md
   * @default false
   * @description use ico tags or not
   */
  iconTags?: true | false;
  /**
   * @default height:20px
   * @description ico tags style
   */
  iconTagStyle?: object;
  /**
   * @default isBlogImages:false
   * @default imagesSize:medium
   * @default imagesLocation:center
   * @description Set blog image style
   * @description imagesSize small : 小图｜medium : 中图｜large : 大图
   * @description imagesLocation left : 左｜right : 右｜center : 中
   */
  blogList?: {
    isBlogImages?: boolean;
    imagesSize?: "small" | "medium" | "large";
    imagesLocation?: "left" | "right" | "center";
  };
}
export default {
  extends: theme,
  Layout: () => {
    return h(theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      "doc-after": () => h(Comment),
      "nav-screen-content-after": () => h(HomeRight),
      "doc-bottom": () => h(BackTop),
      "doc-before": () => h(Fall),
    });
  },
  enhanceApp({ app }) {
    app.component("blog", Blog);
    app.component("category", FilterBlog);
    app.component("tag", FilterBlog);
    app.component("timeline", TimeLine);
    app.component("web-list", WebList);
  },
} satisfies Theme;
