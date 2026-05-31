export interface Post {
    title: string;
    url: string;
    date: {
        time: number;
        string: string;
    };
    excerpt: string | undefined;
    frontmatter: any;
    imgURL: string;
}
interface BlogData {
    posts: Post[];
    tags: string[];
    categories: string[];
    everyCategoryCount: {
        [key: string]: number;
    };
}
declare const data: BlogData;
export { data };
declare const _default: {
    watch: string | string[];
    load: () => Promise<BlogData>;
};
export default _default;
