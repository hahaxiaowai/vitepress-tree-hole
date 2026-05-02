<script setup lang="ts">
import { Button } from "@/components/ui/button";
import TagChip from "./TagChip.vue";

const props = defineProps<{
  tags: string[];
  categories: string[];
  type: string;
  filter: string;
}>();

const emit = defineEmits<{ setFilter: [name: string, type: string] }>();

function setFilter(name: string, type: string) {
  emit("setFilter", name, type);
}
</script>

<template>
  <div class="flex w-full max-w-[1000px] flex-col gap-6 px-4 py-4">
    <template v-if="props.type === 'tag' || props.type === 'filter'">
      <div class="flex flex-wrap gap-3">
        <TagChip
          v-for="(item, index) in props.tags"
          :key="index"
          as="button"
          :active="props.filter === item"
          :index="index"
          :label="item"
          variant="solid"
          class="px-4 py-2 text-sm font-semibold shadow-[var(--vp-shadow)]"
          @click="setFilter(item, 'tag')"
        />
      </div>
    </template>

    <template v-if="props.type === 'category' || props.type === 'filter'">
      <div class="flex flex-wrap gap-3">
        <Button
          v-for="(value, index) in props.categories"
          :key="index"
          :variant="props.filter === value ? 'default' : 'outline'"
          size="sm"
          class="rounded-full"
          @click="setFilter(value, 'category')"
        >
          {{ value }}
        </Button>
      </div>
    </template>
  </div>
</template>
