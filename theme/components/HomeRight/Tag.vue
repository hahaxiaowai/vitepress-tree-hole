<script setup lang="ts">
import { getRandomThemeColor } from '../../utils/common'
import { useRouter } from 'vitepress';
const props = defineProps<{
  tags: string[],
}>()
const router = useRouter();
const toTag = (value: string) => {
  router.go(`/tag?tag=${value}`)
}
</script>

<template>
  <div class="tag-box">
    <div class="title">标签</div>
    <div class="flex">
      <div v-for="(item, index) in props.tags" :key="index" class="name" @click="toTag(item)"
        :style="{ backgroundColor: getRandomThemeColor() }">
        {{ item }}</div>
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

    .name:hover {
      transform: scale(1.04);

    }
  }


}
</style>