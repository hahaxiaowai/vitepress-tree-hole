<script setup lang="ts">
import type { ComputedRef, Ref } from "vue";
import { computed, ref } from "vue";
import { useData } from "vitepress";
import type { Post } from "../posts.data";
import { data } from "../posts.data";
import ContentsList from "./ContentsList/index.vue";

const props = defineProps<{
  filterValue?: string;
  filterType?: string;
}>();
const { theme } = useData();

const posts: ComputedRef<Post[]> = computed(() => {
  if (props.filterType === "tag") {
    const res = [];
    for (let i = 0; i < data.posts.length; i++) {
      if (data.posts[i].frontmatter.tags && data.posts[i].frontmatter.tags.includes(props.filterValue)) {
        res.push(data.posts[i]);
      }
    }
    return res;
  }
  else if (props.filterType === "category") {
    const res = [];
    for (let i = 0; i < data.posts.length; i++) {
      if (data.posts[i].frontmatter.categories && data.posts[i].frontmatter.categories.includes(props.filterValue)) {
        res.push(data.posts[i]);
      }
    }
    return res;
  }
  return data.posts;
});
const docCount: number = theme.value.docCount || 10; // 每页展示文章数量
const totalPage: ComputedRef<number> = computed(() => { return Math.ceil(posts.value.length / docCount); });
const pageIndex: Ref<number> = ref(1);

const filteredPosts = computed(() => {
  const start = (pageIndex.value - 1) * docCount;
  const end = start + docCount;
  return posts.value.slice(start, end);
});

const morePageNumberFill: ComputedRef<number> = computed(() => {
  return Math.floor((pageIndex.value - 2) / 4) * 4 + 1;
});
const jumpPage: Ref<number> = ref(1);
function jump(pIndex: number) {
  if (pIndex === undefined || pIndex === 0)
    return;
  pageIndex.value = pIndex;
}
</script>

<template>
  <div class="list">
    <ContentsList :data-list="filteredPosts" />
    <div class="list-control">
      <div v-if="pageIndex !== 1" class="page-number" @click="jump(pageIndex - 1)">
        <span>&lt;</span>
      </div>
      <div v-if="totalPage < 9" class="list-control">
        <div
          v-for="i in totalPage"
          :key="i" :class="pageIndex === i ? 'page-number page-number-active' : 'page-number'"
          @click="jump(i)"
        >
          {{ i }}
        </div>
      </div>
      <div v-else class="more-page">
        <div :class="pageIndex === 1 ? 'page-number page-number-active' : 'page-number'" @click="jump(1)">
          {{ 1 }}
        </div>
        <div v-if="pageIndex > 5" class="page-ellipsis">
          ...
        </div>
        <div v-if="pageIndex <= 5" class="list-control">
          <div
            v-for="i in 4 "
            :key="i" :class="pageIndex === i + 1 ? 'page-number page-number-active' : 'page-number'"
            @click="jump(i + 1)"
          >
            {{ i + 1 }}
          </div>
        </div>
        <div v-if="pageIndex > 5" class="list-control">
          <div
            v-for="i in totalPage - morePageNumberFill > 4 ? 4 : totalPage - morePageNumberFill - 1 "
            :key="i"
            :class="pageIndex === morePageNumberFill + i ? 'page-number page-number-active' : 'page-number'"
            @click="jump(morePageNumberFill + i)"
          >
            {{ morePageNumberFill + i }}
          </div>
        </div>

        <div v-if="pageIndex < totalPage - 3" class="page-ellipsis">
          ...
        </div>
        <div
          :class="pageIndex === totalPage ? 'page-number page-number-active' : 'page-number'"
          @click="jump(totalPage)"
        >
          {{ totalPage }}
        </div>
      </div>
      <div v-if="totalPage !== 1 && pageIndex !== totalPage" class="page-number" @click="jump(pageIndex + 1)">
        <span>&gt;</span>
      </div>
      <div>
        <span class="page-number jumpDom">跳转至</span>
        <input v-model="jumpPage" class="page-number" type="number" name="页数">
        <button class="page-number" @click="jump(jumpPage)">
          前往
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list {
  width: 60vw;
  max-width: 1000px;
  min-height: 79vh;
}

.list-control {
  display: flex;
  justify-content: center;
  user-select: none;

  div {
    padding: 0px 5px;
    margin: 0px 3px;
  }

  .more-page {
    display: flex;
    justify-content: center;
  }

  input {
    width: 70px;
    margin: 0 8px;
  }

  .page-number {
    font-size: 1.1rem;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: var(--vp-shadow);
    border: 1px solid var(--vp-c-bg);
  }

  .page-ellipsis {
    font-size: 1.1rem;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: default;
    box-shadow: var(--vp-shadow);
  }

  .page-number:hover {
    transition: 0.3s;
    box-shadow: var(--vp-shadow-hover);
    border: 1px solid var(--vp-c-indigo-1);
  }

  .page-number-active {
    background-color: var(--vp-c-indigo-1);
    cursor: default;
  }
}
@media screen and (width<768px) {
  .list {
    width: 100vw;
  }

  .list-control {
    div {
      padding: 0px 5px;
      margin: 0px 2px;
    }

    .page-number {
      padding: 1px 4px;
    }

    .page-ellipsis {
      padding: 1px 4px;
    }

    input {
      width: 20px;
      margin: 0 4px;
    }
  }
}

@media screen and (width<350px) {
  .jumpDom {
    display: none
  }
}
</style>
