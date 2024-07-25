<script setup lang="ts">
import { ref, computed, Ref, ComputedRef } from 'vue';
import { data, Post } from '../posts.data'
import { useData, useRouter } from 'vitepress'
const { theme } = useData()
const { go } = useRouter()
const props = defineProps<{
  filterValue?: string,
  filterType?: string,
}>()
const posts: ComputedRef<Post[]> = computed(() => {
  if (props.filterType === 'tag') {
    const res = [];
    for (let i = 0; i < data.posts.length; i++) {
      if (data.posts[i].frontmatter.tags && data.posts[i].frontmatter.tags.indexOf(props.filterValue) >= 0) {
        res.push(data.posts[i]);
      }
    }
    return res;
  } else if (props.filterType === 'category') {
    const res = [];
    for (let i = 0; i < data.posts.length; i++) {
      if (data.posts[i].frontmatter.categories && data.posts[i].frontmatter.categories.indexOf(props.filterValue) >= 0) {
        res.push(data.posts[i]);
      }
    }
    return res;
  }
  return data.posts
})
const docCount: number = theme.value.docCount; // 每页展示文章数量
const totalPage: ComputedRef<number> = computed(() => { return Math.ceil(posts.value.length / docCount) });
const pageIndex: Ref<number> = ref(1);
const maxCount: ComputedRef<number> = computed(() => {
  return pageIndex.value * docCount > posts.value.length ? posts.value.length % docCount : docCount;
})
const morePageNumberFill: ComputedRef<number> = computed(() => {
  return Math.floor((pageIndex.value - 2) / 4) * 4 + 1
})
const jumpPage: Ref<number> = ref(1);
const jump = (pIndex: number) => {
  if (pIndex === undefined || pIndex === 0) return
  pageIndex.value = pIndex;
}
</script>
<template>
  <div class="list">
    <div class="doc-box" v-for="index in maxCount" :key="index - 1"
      @click="go(posts[(pageIndex - 1) * docCount + index - 1].url)">
      <div class="title">{{ posts[(pageIndex - 1) * docCount + index - 1]?.title }}</div>
      <div class="info">
        <div> {{ posts[(pageIndex - 1) * docCount + index - 1].date.string }}</div>
        <div v-if="posts[(pageIndex - 1) * docCount + index - 1].frontmatter.tags"
          v-for="tag in posts[(pageIndex - 1) * docCount + index - 1].frontmatter.tags">
          {{ tag }}</div>
      </div>
    </div>
    <div class="list-control">
      <div v-if="pageIndex !== 1" class="page-number" @click="jump(pageIndex - 1)">
        < </div>
          <div v-if="totalPage < 9" :class="pageIndex == i ? 'page-number page-number-active' : 'page-number'"
            v-for="i in totalPage " @click="jump(i)">{{ i }}</div>
          <div v-else class="more-page">
            <div :class="pageIndex == 1 ? 'page-number page-number-active' : 'page-number'" @click="jump(1)">{{ 1 }}
            </div>
            <div v-if="pageIndex > 5" class="page-ellipsis">...</div>
            <div v-if="pageIndex <= 5" :class="pageIndex == i + 1 ? 'page-number page-number-active' : 'page-number'"
              v-for="i in 4 " @click="jump(i + 1)">{{ i + 1 }}</div>
            <div v-if="pageIndex > 5"
              :class="pageIndex === morePageNumberFill + i ? 'page-number page-number-active' : 'page-number'"
              v-for="i in totalPage - morePageNumberFill > 4 ? 4 : totalPage - morePageNumberFill - 1 "
              @click="jump(morePageNumberFill + i)">{{ morePageNumberFill + i }}
            </div>

            <div v-if="pageIndex < totalPage - 3" class="page-ellipsis">...</div>
            <div :class="pageIndex == totalPage ? 'page-number page-number-active' : 'page-number'"
              @click="jump(totalPage)">{{ totalPage }}</div>
          </div>
          <div v-if="totalPage !== 1 && pageIndex !== totalPage" class="page-number" @click="jump(pageIndex + 1)">>
          </div>
          <div>
            <span class="page-number jumpDom">跳转至</span>
            <input class="page-number" type="number" name="页数" v-model="jumpPage">
            <button class="page-number" @click="jump(jumpPage)">前往</button>
          </div>
      </div>
    </div>
</template>

<style scoped>
.list {
  width: 60vw;
  max-width: 1000px;
  min-height: 79vh;

  .doc-box {
    margin: 10px auto 20px;
    padding: 16px 20px;
    width: 90%;
    overflow: hidden;
    border-radius: 0.25rem;
    box-shadow: var(--vp-shadow);
    box-sizing: border-box;
    transition: all 0.3s;
    background-color: var(--vp-c-bg);
    border: 1px solid var(--vp-c-bg);
    cursor: pointer;

    .info {
      display: flex;
      font-size: 16px;

      div {
        margin-right: 15px;
      }
    }

    .title {
      /* position: relative; */
      font-size: 1.28rem;
      line-height: 46px;
      /* display: inline-block; */
    }
  }

  .doc-box:hover {
    transition: 0.3s;
    box-shadow: var(--vp-shadow-hover);
    border: 1px solid var(--vp-c-indigo-1);
  }
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