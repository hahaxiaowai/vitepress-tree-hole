<script setup lang="ts">
import Giscus from "@giscus/vue";
import { useData, useRoute } from "vitepress";
import { ref, watch } from "vue";
import { cn } from "../lib/cn";

const { theme, frontmatter, isDark } = useData();
const route = useRoute();
const show = frontmatter.value.comment === undefined || frontmatter.value.comment;
const timeStamp = ref(Date.now());

watch(() => route.path, () => {
  timeStamp.value = Date.now();
});
</script>

<template>
  <div
    :class="cn(
      'mt-6 w-full',
      frontmatter.type === 'widen'
        ? 'mx-auto max-w-[800px] min-[768px]:ml-[12vw]'
        : 'mx-auto max-w-4xl',
    )"
  >
    <Giscus
      v-if="theme.comment && show"
      id="comments"
      :key="timeStamp"
      :repo="theme.comment.repo"
      :repo-id="theme.comment.repoId"
      category="Announcements"
      :category-id="theme.comment.categoryId"
      mapping="title"
      strict="0"
      :reactions-enabled="theme.comment.reactionsEnabled || '1'"
      emit-metadata="0"
      input-position="top"
      :theme="isDark ? 'dark' : 'light'"
      lang="zh-CN"
      crossorigin="anonymous"
    />
  </div>
</template>
