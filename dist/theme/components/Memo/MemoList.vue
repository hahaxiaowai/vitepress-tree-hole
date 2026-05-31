<script setup lang="ts">
import { MdPreview } from "md-editor-v3";
import { useData } from "vitepress";
import { onMounted } from "vue";
import { Card } from "@/components/ui/card";
import { useMD } from "../../composables/md";
import { formateDate } from "../../utils/common";
import "md-editor-v3/lib/preview.css";

defineProps<{
  data: Array<{ content: string; updatedAt: Date }>;
}>();

const { isDark } = useData();

onMounted(async () => {
  await useMD();
});
</script>

<template>
  <div class="mx-auto flex w-full max-w-[768px] flex-col gap-4 px-4 py-4">
    <Card
      v-for="item in data"
      :key="`${item.updatedAt}-${item.content.slice(0, 12)}`"
      class="overflow-hidden rounded-2xl bg-[var(--tm-textarea-bg)] px-4 py-4 shadow-[var(--vp-shadow)]"
    >
      <div class="mb-4 flex items-center justify-between text-sm text-[var(--vp-c-text-2)]">
        {{ formateDate(item.updatedAt) }}
      </div>
      <MdPreview :model-value="item.content" :theme="isDark ? 'dark' : 'light'" />
    </Card>
  </div>
</template>
