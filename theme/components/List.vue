<script setup lang="ts">
import type { ComputedRef, Ref } from "vue";
import type { Post } from "../posts.data";
import { useData } from "vitepress";
import { computed, ref, watch } from "vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { data } from "../posts.data";
import ContentsList from "./ContentsList/index.vue";
import Empty from "./Empty.vue";

const props = defineProps<{
  filterValue?: string;
  filterType?: string;
}>();

const { theme } = useData();

const posts: ComputedRef<Post[]> = computed(() => {
  if (props.filterType === "tag") {
    return data.posts.filter(post =>
      post.frontmatter.tags && post.frontmatter.tags.includes(props.filterValue),
    );
  }
  if (props.filterType === "category") {
    return data.posts.filter(post =>
      post.frontmatter.categories && post.frontmatter.categories.includes(props.filterValue),
    );
  }
  return data.posts;
});

const docCount: number = theme.value.docCount || 10;
const totalPage: ComputedRef<number> = computed(() => Math.max(1, Math.ceil(posts.value.length / docCount)));
const pageIndex: Ref<number> = ref(1);
const jumpPage: Ref<number> = ref(1);

const filteredPosts = computed(() => {
  const start = (pageIndex.value - 1) * docCount;
  const end = start + docCount;
  return posts.value.slice(start, end);
});

watch(() => [props.filterType, props.filterValue], () => {
  pageIndex.value = 1;
  jumpPage.value = 1;
});

function updateJumpPage(value: string | number) {
  jumpPage.value = Number(value || 1);
}

function jump(pIndex: number) {
  if (!pIndex || Number.isNaN(pIndex)) {
    return;
  }
  pageIndex.value = Math.min(totalPage.value, Math.max(1, pIndex));
  jumpPage.value = pageIndex.value;
}
</script>

<template>
  <div v-if="filteredPosts.length" class="min-h-[79vh] w-full max-w-[1000px]">
    <ContentsList :data-list="filteredPosts" />
    <div class="mt-8 flex flex-col items-center gap-4 px-4 pb-4">
      <Pagination
        v-if="totalPage > 1"
        :items-per-page="1"
        :page="pageIndex"
        :sibling-count="1"
        :total="totalPage"
        show-edges
        @update:page="jump"
      >
        <PaginationContent v-slot="{ items }" class="flex-wrap justify-center gap-2">
          <PaginationPrevious />
          <template v-for="(item, index) in items" :key="`${item.type}-${item.value ?? index}`">
            <PaginationItem
              v-if="item.type === 'page'"
              :value="item.value"
              :is-active="item.value === pageIndex"
            >
              {{ item.value }}
            </PaginationItem>
            <PaginationEllipsis v-else :index="index" />
          </template>
          <PaginationNext />
        </PaginationContent>
      </Pagination>

      <div class="flex items-center gap-2 rounded-2xl bg-[var(--vp-c-bg-soft)] px-3 py-2">
        <span class="hidden text-sm text-[var(--vp-c-text-2)] min-[350px]:inline">跳转到</span>
        <Input
          :model-value="String(jumpPage)"
          class="h-8 w-20 bg-[var(--vp-c-bg)] text-center"
          type="number"
          name="页码"
          aria-label="页码"
          @update:model-value="updateJumpPage"
        />
        <Button size="sm" class="rounded-full" @click="jump(jumpPage)">
          前往
        </Button>
      </div>
    </div>
  </div>
  <Empty v-else class="mx-auto w-full max-w-[1000px]" />
</template>
