<script setup lang="ts">
import { getRandomThemeColor } from '../utils/common'
import { useData } from 'vitepress';
const { theme } = useData();
const props = defineProps<{
  tags: string[],
  categories: string[],
  type: string,
  filter: string,
}>()
const emit = defineEmits<{ setFilter: [name: string, type: string] }>();
const tagColors = props.tags.map(() => { return getRandomThemeColor() })
const setFilter = (name: string, type: string) => {
  emit('setFilter', name, type);
}
function badgeUrl(category: string | number | boolean) {
  return `https://img.shields.io/badge/-${encodeURIComponent(category)}-${encodeURIComponent('#3c3c43c7')}?logo=${encodeURIComponent(category)}`
}
</script>

<template>
  <div class="tag-box" v-if="props.type === 'tag'">
    <img v-if="theme.icoTags" v-for="(item, index) in props.tags" :style="theme.icoTagStyle" :key="index" :alt="item"
      :class="props.filter === item ? 'tag-name active' : 'tag-name'" :src="badgeUrl(item)"
      @click="setFilter(item, 'tag')">
    <div v-else v-for="(item, index) in props.tags" :class="props.filter === item ? 'name active' : 'name'" :style="{
      backgroundColor: tagColors[index],
      boxShadow: props.filter === item ? '0 1px 8px 0' + tagColors[index] : ''
    }" @click="setFilter(item, 'tag')">
      {{ item }}</div>
  </div>
  <div class="category-box" v-else>
    <div :class="props.filter === value ? 'name active' : 'name'" v-for="value in props.categories"
      @click="setFilter(value, 'category')">
      {{ value }}
    </div>
  </div>
</template>

<style scoped>
  .tag-box {
    width: 55%;
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
    max-width: 1000px;
    user-select: none;

    .name {
      padding: 0.05rem 0.3rem;
      margin: 0.3rem 0.4rem;
      text-align: center;
      line-height: 1.6rem;
      border-radius: 0.25rem;
      font-size: 1rem;
      font-weight: 400;
      cursor: pointer;
    }

    .tag-name {
      margin: 0.3rem;
      cursor: pointer;
    }

    .name,
    .tag-name:hover {
      transform: scale(1.1);
    }

    .active {
      transform: scale(1.1);
    }
  }

  .category-box {
    width: 55%;
    display: flex;
    flex-wrap: wrap;
    user-select: none;
    padding: 1rem;

    .name {
      /* width: 100%; */
      margin: 0.5rem 0.5rem;
      padding: 0rem 1rem;
      font-size: 1.1rem;
      line-height: 2.5rem;
      border-radius: 0.25rem;
      box-shadow: var(--vp-shadow);
      box-sizing: border-box;
      background-color: var(--vp-c-bg);
      border: 1px solid var(--vp-c-bg);
      cursor: pointer;
    }



    .name:hover {
      transition: 0.3s;
      box-shadow: var(--vp-shadow-hover);
      border: 1px solid var(--vp-c-indigo-1);
    }

    .active {
      background-color: var(--vp-c-indigo-1);
    }
  }

  @media screen and (width<768px) {
    .tag-box {
      width: 100%;
    }

    .category-box {
      width: 100%;
    }
  }
</style>