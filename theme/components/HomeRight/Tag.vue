<script setup lang="ts">
import { getRandomThemeColor } from '../../utils/common'
import { useRouter, useData } from 'vitepress';
const { theme } = useData();
const props = defineProps<{
  tags: string[],
}>()
const router = useRouter();
const toTag = (value: string) => {
  router.go(`/tag?tag=${value}`)
}

function badgeUrl(category: string | number | boolean) {
  return `https://img.shields.io/badge/-${encodeURIComponent(category)}-${encodeURIComponent('#3c3c43c7')}?logo=${encodeURIComponent(category)}`
}
</script>

<template>
  <div class="tag-box">
    <div class="title">标签</div>
    <div class="flex">
      <img v-if="theme.icoTags" v-for="(item, index) in props.tags" :style="theme.icoTagStyle" :key="index" :alt="item"
        class="tag-name" :src="badgeUrl(item)" @click="toTag(item)">
      <div v-else="!theme.icoTags" v-for="(item) in props.tags" class="name" @click="toTag(item)"
        :style="{ backgroundColor: getRandomThemeColor() }">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped>
  .tag-box {
    /* width: 100%; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;

    .title {
      width: 90%;
      text-align: left;
      font-size: 1.2rem;
    }

    .flex {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-top: 0.5rem;

      .name {
        padding: 0.05rem 0.2rem;
        margin: 0.3rem 0.3rem;
        text-align: center;
        line-height: 1.6rem;
        border-radius: 0.25rem;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
      }

      .name:hover,
      .tag-name:hover {
        transform: scale(1.04);

      }

      .tag-name {
        margin: 0.3rem;
        cursor: pointer;
      }
    }
  }
</style>