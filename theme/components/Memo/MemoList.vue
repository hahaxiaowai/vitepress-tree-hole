<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { formateDate } from '../../utils/common';
import { useMD } from '../../composables/md'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import { useData } from "vitepress";

const { isDark } = useData();
const props = defineProps<{
  data: Array<{ content: string, updatedAt: Date }>
}>()
const md = ref();
onMounted(async () => {
  md.value = await useMD();
})
</script>

<template>
  <div flex flex-col justify-center items-center>
    <div class="card-box" v-for="item in props.data">
      <div text-4 flex justify-between  text-coolgray>{{ formateDate(item.updatedAt) }}</div>
      <MdPreview :model-value="item.content" :theme="isDark ? 'dark' : 'light'" />
    </div>
  </div>
</template>

<style scoped>

  .card-box {
    margin: 0.5rem;
    padding: 1rem;
    border-radius: var(--tm-rounded);
    background-color: var(--tm-textarea-bg);
    width: 768px;
  }

  @media screen and (max-width: 430px) {
    .card-box {
      width: 95%;
    }
  }

  .card {
    margin-top: 0.25rem;
    /* padding: 1rem; */
    border-radius: var(--tm-rounded);
    background-color: var(--tm-textarea-bg);
    /* x轴滚动轴 */
    overflow-x: auto;

    p {
      line-height: 1.8rem;
    }

    h1,
    h2,
    h3 {
      line-height: 2rem;
    }
  }


</style>
