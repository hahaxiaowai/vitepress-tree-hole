<script setup lang="ts">
const props = defineProps<{
  author?: string,
  authorImage?: string,
  docCount?: number,
  tagCount?: number,
  categoryCount?: number,
}>()
</script>

<template>
  <div class="author-box">
    <div v-if="props.authorImage" class="author-image">
      <img :src="props.authorImage" alt="" srcset="">
    </div>
    <div v-if="props.author" class="author">{{ props.author }}</div>
    <div class="flex-count">
      <div v-if="props.docCount" class="count-box">{{ props.docCount }} <br> 文章 </div>
      <div class="right-border"></div>
      <div v-if="props.tagCount" class="count-box">{{ props.tagCount }} <br> 标签</div>
      <div class="right-border"></div>
      <div v-if="props.categoryCount" class="count-box">{{ props.categoryCount }} <br> 分类</div>
    </div>
    <div class="bottom-border"></div>
  </div>
</template>

<style scoped>
.author-box {
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  .author-image {
    width: 100px;
    height: 100px;

    img {
      border-radius: 50%;
    }
  }

  .author {
    padding-top: 1rem;
    font-size: 1.5rem;
  }

  .flex-count {
    width: 70%;
    padding-top: 1rem;
    display: flex;
    justify-content: space-between;

    .count-box {
      padding: 0rem 1rem;
      text-align: center;
      font-size: 1.1rem;
      border-right: 1px solid var();
    }
    .right-border {
      border-right: 1px solid var(--vp-c-gray-3);
    }
  }
  .bottom-border{
      padding-top: 1rem;
      width: 90%;
      border-bottom: 1px solid var(--vp-c-gray-3);
    }
}
</style>