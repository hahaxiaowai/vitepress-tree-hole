<script setup lang="ts">
import { useData } from 'vitepress';
import Author from './Author.vue'
import Category from './Category.vue';
import Tag from './Tag.vue'
import Statistics from './Statistics.vue'
import { data } from '../../posts.data'
const { theme } = useData();
const { tags, categories, everyCategoryCount } = data;
</script>

<template>
  <div class="home-right">
    <div>
      <author :author="theme.author" :authorImage="theme.authorImage" :docCount="data.posts.length"
        :tagCount="tags.length" :categoryCount="categories.length" />
      <statistics />
      <category :everyCategoryCount :count="categories.length" />
      <tag :tags="tags" />

      <!-- <div>
      <div>hot docs</div>
      <div>hot message</div>
      <div>friend link</div>
      <div>tag || group</div> -->
    </div>

  </div>
</template>

<style scoped>
.home-right {
  width: 20vw;
  max-width: 400px;
  border-radius: 0.25rem;
  box-shadow: var(--vp-shadow);
  box-sizing: border-box;
  transition: all 0.3s;
  background-color: var(--vp-c-bg);
}
@media screen and (width<768px) {
  .home-right {
    width: calc(100vw - 64px)
  }
}
</style>