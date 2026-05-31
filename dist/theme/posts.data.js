import { createContentLoader } from "vitepress";
// declare const data: BlogData;
const data = {
    posts: [],
    tags: [],
    categories: [],
    everyCategoryCount: {},
};
export { data };
export default createContentLoader("blogs/**/*.md", {
    transform(raw) {
        const blogData = {
            posts: [],
            tags: [],
            categories: [],
            everyCategoryCount: {},
        };
        raw.forEach(({ url, frontmatter, excerpt }) => {
            if (frontmatter.publish === undefined || frontmatter.publish) {
                if (frontmatter.tags)
                    blogData.tags.push(...frontmatter.tags);
                if (frontmatter.categories) {
                    blogData.categories.push(...frontmatter.categories);
                    frontmatter.categories.forEach((category) => {
                        if (blogData.everyCategoryCount[category]) {
                            blogData.everyCategoryCount[category]++;
                        }
                        else {
                            blogData.everyCategoryCount[category] = 1;
                        }
                    });
                }
                blogData.posts.push({
                    title: frontmatter.title,
                    url,
                    excerpt,
                    date: formatDate(frontmatter.date),
                    frontmatter,
                    imgURL: frontmatter.imgURL ? `images/${frontmatter.imgURL}` : "",
                });
            }
        });
        blogData.tags = removeDuplicates(blogData.tags);
        blogData.categories = removeDuplicates(blogData.categories);
        blogData.posts.sort((a, b) => b.date.time - a.date.time);
        return blogData;
    },
});
function removeDuplicates(array) {
    return [...new Set(array)];
}
function formatDate(raw) {
    const date = new Date(raw);
    date.setUTCHours(8);
    return {
        time: +date,
        string: date.toLocaleDateString("zh-CN", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        }),
    };
}
