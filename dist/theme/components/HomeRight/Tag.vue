<script setup lang="ts">
import { useData } from "vitepress";
import Empty from "../Empty.vue";
import TagChip from "../TagChip.vue";

const props = defineProps<{
  tags: string[];
}>();

const { theme } = useData();

function tagHref(value: string) {
  return `/${theme.value.route.tag}?tag=${encodeURIComponent(value)}`;
}
</script>

<template>
  <section class="flex flex-col gap-4 px-5 py-2">
    <div class="text-sm font-semibold tracking-[0.25em] text-[var(--vp-c-text-2)]">
      标签
    </div>
    <div v-if="props.tags.length" class="flex flex-wrap gap-2">
      <TagChip
        v-for="(item, index) in props.tags"
        :key="index"
        :href="tagHref(item)"
        :index="index"
        :label="item"
        :style="theme.iconTagStyle"
        :variant="theme.iconTags ? 'solid' : 'soft'"
      />
    </div>
    <Empty v-else class="min-h-28 scale-90" />
  </section>
</template>
