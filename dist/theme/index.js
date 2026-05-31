import theme from "vitepress/theme";
// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import BackTop from "./components/BackTop.vue";
import Comment from "./components/Comment.vue";
import HomeRight from "./components/HomeRight/index.vue";
import WebList from "./components/WebList.vue";
import "./style.css";
export default {
    extends: theme,
    Layout: () => {
        return h(theme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
            "comment": () => h(Comment),
            "nav-screen-content-after": () => h(HomeRight),
            "back-top": () => h(BackTop),
        });
    },
    enhanceApp({ app }) {
        app.component("web-list", WebList);
    },
};
