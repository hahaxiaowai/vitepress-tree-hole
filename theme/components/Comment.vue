<script setup lang="ts">
import Giscus from '@giscus/vue'
import { useData, useRoute } from 'vitepress';
import { watch, ref } from 'vue';
const { theme, frontmatter, isDark } = useData();
const route = useRoute();
const show = frontmatter.value.comment === undefined || frontmatter.value.comment;
const timeStamp = ref(Date.now())
watch(() => route.path, () => {
  timeStamp.value = Date.now()
})
</script>

<template>
  <div :class="frontmatter.type === 'widen' ? 'comment-box-widen' : 'comment-box'">
    <giscus :key="timeStamp" v-if="theme.comment && show" id="comments" :repo="theme.comment.repo"
      :repo-id="theme.comment.repoId" category="Announcements" :category-id="theme.comment.categoryId" mapping="title"
      strict="0" :reactions-enabled="theme.comment.reactionsEnabled || '1'" emit-metadata="0" input-position="top"
      :theme="isDark ? 'dark' : 'light'" lang="zh-CN" crossorigin="anonymous" />
  </div>

</template>

<style scoped>
.comment-box {
  /* width: 50vw; */
  margin-top: 1rem;
}
.comment-box-widen {
  margin-top: 1rem;
  width: 800px;
  margin-left: 12vw;
}

@media screen and (width<768px) {
  .comment-box-widen {
    margin-top: 1rem;
    width: 90vw;
    margin-left: 0vw;
  }
}
</style>