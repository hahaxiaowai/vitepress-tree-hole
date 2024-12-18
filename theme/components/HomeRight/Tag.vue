<script setup lang="ts">
import { useData, useRouter } from "vitepress";
import { getRandomThemeColor } from "../../utils/common";
import Empty from "../Empty.vue";
const props = defineProps<{
  tags: string[];
}>();
const { theme } = useData();
const router = useRouter();
function toTag(value: string) {
  router.go(`/${theme.value.route.tag}?tag=${value}`);
}

function badgeUrl(category: string | number | boolean) {
  return `https://img.shields.io/badge/-${encodeURIComponent(category)}-${encodeURIComponent("#3c3c43c7")}?logo=${encodeURIComponent(category)}`;
}
</script>

<template>
  <div class="tag-box">
    <div class="title">
      标签
    </div>
    <div v-if="theme.iconTags" class="flex">
      <img v-for="(item, index) in props.tags" :key="index" :style="theme.iconTagStyle" :alt="item" class="tag-name"
        :src="badgeUrl(item)" @click="toTag(item)">
    </div>
    <div v-else class="flex">
      <div v-for="(item, index) in props.tags" :key="index" class="name"
        :style="{ backgroundColor: getRandomThemeColor() }" @click="toTag(item)">
        {{ item }}
      </div>
    </div>
    <empty class="scale-50" v-if="props.tags.length === 0" />
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
