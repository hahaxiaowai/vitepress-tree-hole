<script setup lang="ts">
import { useData, useRouter } from "vitepress";
import { getRandomThemeColor } from "../../utils/common";
import Empty from "../Empty.vue";
const props = defineProps<{
  everyCategoryCount: object;
  count: number;
}>();
const { theme } = useData();
const router = useRouter();
function toCategory(value: string) {
  router.go(`/${theme.value.route.tag}?category=${value}`);
}
</script>

<template>
  <div class="category-box">
    <div class="title">
      分类
    </div>
    <div v-if="props.count !== 0" v-for="(value, key) in props.everyCategoryCount" :key="key" class="flex"
      @click="toCategory(key)">
      <div class="name">
        {{ key }}
      </div>
      <div class="count" :style="{ backgroundColor: getRandomThemeColor() }">
        {{ value }}
      </div>
    </div>
    <empty class="scale-50" v-else />
  </div>
</template>

<style scoped>
  .category-box {
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
      margin: 8px auto 8px;
      justify-content: space-between;
      font-size: 1.1rem;
      line-height: 2.5rem;
      overflow: hidden;
      border-radius: 0.25rem;
      box-shadow: var(--vp-shadow);
      box-sizing: border-box;
      transition: all 0.3s;
      background-color: var(--vp-c-bg);
      border: 1px solid var(--vp-c-bg);
      cursor: pointer;

      .name {
        padding: 0rem 1rem;
      }

      .count {
        margin-top: 0.45rem;
        margin-right: 1rem;
        text-align: center;
        width: 1.6rem;
        height: 1.6rem;
        line-height: 1.6rem;
        border-radius: 0.25rem;
        background: #4bbd8d;
      }
    }

    .flex:hover {
      box-shadow: var(--vp-shadow-hover);
      border: 1px solid var(--nt-theme-color-1);
    }

  }
</style>
