<script setup lang="ts">
import { useData } from "vitepress";
import { ref } from "vue";
import { data } from "../posts.data";
import { getQuery } from "../utils/common";
import Filter from "./Filter.vue";
import List from "./List.vue";

const { frontmatter } = useData();
const { tags, categories } = data;
const filterValue = ref("");
const filterType = ref("");

function setFilter(name: string, type: string) {
  filterType.value = type;
  filterValue.value = name;
}

const params: Record<string, string> = getQuery();
if (params.category) {
  filterType.value = "category";
  filterValue.value = params.category;
}
else if (params.tag) {
  filterType.value = "tag";
  filterValue.value = params.tag;
}
</script>

<template>
  <div class="mx-auto flex w-full max-w-[1100px] flex-col items-center pb-6 pt-4">
    <Filter
      :tags="tags"
      :categories="categories"
      :type="frontmatter.layout"
      :filter="filterValue"
      @set-filter="setFilter"
    />
    <List :filter-value="filterValue" :filter-type="filterType" />
  </div>
  <content />
</template>
