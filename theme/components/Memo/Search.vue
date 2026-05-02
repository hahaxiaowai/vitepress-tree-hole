<script setup lang="ts">
import { ref } from "vue";
import { Input } from "@/components/ui/input";

const props = defineProps<{
  search: (value: string) => void;
}>();

const filter = ref("");
</script>

<template>
  <div class="mx-auto flex w-full max-w-[768px] justify-end px-4">
    <Input
      v-model="filter"
      class="mt-2 h-11 w-full max-w-xs bg-[var(--vp-c-bg)]"
      type="text"
      placeholder="搜索"
      @keyup.enter="props.search(filter)"
    />
  </div>
</template>
