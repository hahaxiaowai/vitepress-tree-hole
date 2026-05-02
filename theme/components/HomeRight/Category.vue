<script setup lang="ts">
import { useData, useRouter } from "vitepress";
import { computed } from "vue";
import { Card } from "@/components/ui/card";
import { getThemeColorByIndex } from "../../utils/common";
import Empty from "../Empty.vue";

const props = defineProps<{
  everyCategoryCount: Record<string, number>;
  count: number;
}>();

const { theme } = useData();
const router = useRouter();

const entries = computed(() => Object.entries(props.everyCategoryCount));

function toCategory(value: string) {
  router.go(`/${theme.value.route.category}?category=${value}`);
}
</script>

<template>
  <section class="flex flex-col gap-4 px-5 py-2">
    <div class="text-sm font-semibold tracking-[0.25em] text-[var(--vp-c-text-2)]">
      分类
    </div>
    <div v-if="props.count !== 0" class="space-y-3">
      <Card
        v-for="([key, value], index) in entries"
        :key="key"
        class="flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-[var(--vp-c-bg)] px-3 py-3 shadow-[var(--vp-shadow)] [transition-property:transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[var(--vp-c-bg-elv)] hover:shadow-[var(--vp-shadow-hover)]"
        @click="toCategory(key)"
      >
        <span class="truncate text-sm font-medium text-[var(--vp-c-text-1)]">{{ key }}</span>
        <span
          class="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
          :style="{ backgroundColor: getThemeColorByIndex(index) }"
        >{{ value }}</span>
      </Card>
    </div>
    <Empty v-else class="min-h-28 scale-90" />
  </section>
</template>
