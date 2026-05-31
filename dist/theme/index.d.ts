import type { SakuraFallImage } from "@night-tea/sakura-fall";
import type { DefaultTheme } from "vitepress";
import "./style.css";
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
    headStyle?: Record<string, string>;
    authorImage?: string;
    umami?: {
        umamiId: string;
        umamiToken: string;
        umamiUrl: string;
    };
    memo?: {
        memoUrl: string;
        memoUser: string;
        memoToken: string;
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
        image: SakuraFallImage;
        count?: number;
    };
    /**
     * @default false
     * @description use vibrant local tag chips or not
     */
    iconTags?: boolean;
    /**
     * @default height:20px
     * @description tag chip style
     */
    iconTagStyle?: object;
    /**
     * @default imagesSize:medium
     * @default imagesLocation:center
     * @description Set blog image style
     * @description imagesSize small : 小图 | medium : 中图 | large : 大图
     * @description imagesLocation left : 左 | right : 右 | center : 中 | reversal : 左右交替 | leftRight : 左右
     */
    blogList?: {
        imagesSize?: "small" | "medium" | "large";
        imagesLocation?: "left" | "right" | "center" | "reversal" | "leftRight";
    };
    route: {
        category: string;
        filter: string;
        tag: string;
    };
}
declare const _default: {
    extends: {
        Layout: import("vue").DefineComponent;
        enhanceApp: (ctx: import("vitepress").EnhanceAppContext) => void;
    };
    Layout: () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    enhanceApp({ app }: import("vitepress").EnhanceAppContext): void;
};
export default _default;
