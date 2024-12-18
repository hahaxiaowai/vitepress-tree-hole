<script setup lang="ts">
import { onMounted, ref } from 'vue';
import MemoList from './MemoList.vue';
import Search from './Search.vue';
import { getMemoList } from '../../api/memo'
import { useData } from "vitepress";

const { theme } = useData();
const data = ref<any[]>([]);
const page = ref(0);
const allLoaded = ref(false);
const filter = ref('')
const searchMemo = (f: string) => {
  page.value = 0
  filter.value = f
  allLoaded.value = false
  getMemoList(page.value, filter.value, theme.value.memo.memoUrl, theme.value.memo.memoUser, theme.value.memo.memoToken).then(res => {
    data.value = res.data;
    if (res.data.length < 10) {
      allLoaded.value = true
    }
  })
}
const loadMore = () => {
  if (allLoaded.value) return;
  page.value++;
  getMemoList(page.value, filter.value, theme.value.memo.memoUrl, theme.value.memo.memoUser, theme.value.memo.memoToken).then(res => {
    if (res.data.length === 0) {
      allLoaded.value = true;
    } else {
      data.value = [...data.value, ...res.data];
    }
  });
};

onMounted(() => {
  getMemoList(page.value, filter.value, theme.value.memo.memoUrl, theme.value.memo.memoUser, theme.value.memo.memoToken).then(res => {
    data.value = res.data;
    if(res.data.length<10){
      allLoaded.value = true
    }
  });

  window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      loadMore();
    }
  });
});
</script>

<template>
  <search :search="searchMemo" />
  <memo-list :data="data" />
  <div v-if="allLoaded" class="all-loaded">已加载全部内容</div>
</template>

<style scoped>
  .all-loaded {
    text-align: center;
    padding: 10px;
    color: #888;
  }
</style>
