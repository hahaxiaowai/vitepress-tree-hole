import { createContentLoader } from "vitepress";
// Copy  https://github.com/vuejs/blog/blob/main/.vitepress/theme/posts.data.ts
export interface Post {
  title: string;
  url: string;
  date: {
    time: number;
    string: string;
  };
  excerpt: string | undefined;
  frontmatter: any;
}
interface BlogData {
  posts: Post[];
  tags: string[];
  categories: string[];
  everyCategoryCount: {};
}
declare const data: BlogData;

export { data };

export default createContentLoader("blogs/**/*.md", {
  transform(raw): BlogData {
    const blogData: BlogData = {
      posts: [],
      tags: [],
      categories: [],
      everyCategoryCount: {},
    };
    raw.forEach(({ url, frontmatter, excerpt }) => {
      if (frontmatter.publish == undefined || frontmatter.publish) {
        if (frontmatter.tags) blogData.tags.push(...frontmatter.tags);
        if (frontmatter.categories) {
          blogData.categories.push(...frontmatter.categories);
          frontmatter.categories.forEach((category: string) => {
            if (blogData.everyCategoryCount[category]) {
              blogData.everyCategoryCount[category]++;
            } else {
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
        });
      }
    });
    blogData.tags = removeDuplicates(blogData.tags) as string[];
    blogData.categories = removeDuplicates(blogData.categories) as string[];
    blogData.posts.sort((a, b) => b.date.time - a.date.time);
    return blogData;
  },
});

function removeDuplicates(array: string[]) {
  return [...new Set(array)];
}
function formatDate(raw: string): Post["date"] {
  const date = new Date(raw);
  date.setUTCHours(8);
  return {
    time: +date,
    string: date.toLocaleDateString("zh", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }),
  };
}
