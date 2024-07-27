<script setup lang="ts">
import { ref } from 'vue';
import { useData } from 'vitepress';
import { getQuery } from '../utils/common';
import List from './List.vue'
import HomeFooter from './HomeFooter.vue';
import Filter from './Filter.vue';
import { data } from '../posts.data'
import Fall from './Fall/index.vue';
const { frontmatter } = useData();
const { tags, categories } = data;
const filterValue = ref('');
const filterType = ref('');
const setFilter = (name: string, type: string) => {
  filterType.value = type;
  filterValue.value = name;
}
const params: any = getQuery();
if (params.category) {
  filterType.value = 'category';
  filterValue.value = params.category;
} else if (params.tag) {
  filterType.value = 'tag';
  filterValue.value = params.tag;
}

</script>

<template>
  <div class="flex-content">
    <Filter ref="filter" @setFilter="setFilter" :tags="tags" :categories="categories" :type="frontmatter.layout"
      :filter="filterValue" />
    <list :filterValue="filterValue" :filterType="filterType" />
  </div>
  <fall />
  <home-footer />

  <content />
</template>

<style scoped>
.flex-content {
  padding-top: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>