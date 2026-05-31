<script setup lang="ts">
import { useData } from "vitepress";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { getMemoList } from "../../api/memo";
import MemoList from "./MemoList.vue";
import Search from "./Search.vue";

const { theme } = useData();
const data = ref<any[]>([]);
const page = ref(0);
const allLoaded = ref(false);
const filter = ref("");

function searchMemo(f: string) {
  page.value = 0;
  filter.value = f;
  allLoaded.value = false;
  getMemoList(page.value, filter.value, theme.value.memo.memoUrl, theme.value.memo.memoUser, theme.value.memo.memoToken).then((res) => {
    data.value = res.data;
    if (res.data.length < 10) {
      allLoaded.value = true;
    }
  });
}

function loadMore() {
  if (allLoaded.value) {
    return;
  }
  page.value++;
  getMemoList(page.value, filter.value, theme.value.memo.memoUrl, theme.value.memo.memoUser, theme.value.memo.memoToken).then((res) => {
    if (res.data.length === 0) {
      allLoaded.value = true;
    }
    else {
      data.value = [...data.value, ...res.data];
      if (res.data.length < 10) {
        allLoaded.value = true;
      }
    }
  });
}

function handleScroll() {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 24) {
    loadMore();
  }
}

onMounted(() => {
  getMemoList(page.value, filter.value, theme.value.memo.memoUrl, theme.value.memo.memoUser, theme.value.memo.memoToken).then((res) => {
    data.value = res.data;
    if (res.data.length < 10) {
      allLoaded.value = true;
    }
  });

  window.addEventListener("scroll", handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="pb-8 pt-4">
    <Search :search="searchMemo" />
    <MemoList :data="data" />
    <div v-if="allLoaded" class="pb-4 text-center text-sm text-[var(--vp-c-text-3)]">
      已加载全部内容
    </div>
  </div>
</template>
