<script setup lang="ts">
import { useData } from "vitepress";
import { data } from "../../posts.data";
import Author from "./Author.vue";
import Category from "./Category.vue";
import Statistics from "./Statistics.vue";
import Tag from "./Tag.vue";

const { theme } = useData();
const { tags, categories, everyCategoryCount } = data;
</script>

<template>
  <aside class="w-full max-w-[400px] overflow-hidden rounded-[2rem] border border-[color:var(--vp-c-divider)] bg-[linear-gradient(180deg,var(--vp-c-bg)_0%,var(--vp-c-bg-soft)_100%)] shadow-[var(--vp-shadow)]">
    <Author
      :author="theme.author"
      :author-image="theme.authorImage"
      :doc-count="data.posts.length"
      :tag-count="tags.length"
      :category-count="categories.length"
    />
    <Statistics />
    <Category :every-category-count="everyCategoryCount" :count="categories.length" />
    <Tag :tags="tags" />
  </aside>
</template>
