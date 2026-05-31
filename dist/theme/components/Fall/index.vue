<script setup lang="ts">
import { SakuraFall } from "@night-tea/sakura-fall/vue";
import { useData } from "vitepress";
import { computed } from "vue";

const { theme } = useData();
const fall = computed(() => theme.value.fall);
</script>

<template>
  <SakuraFall
    v-if="fall"
    :count="fall.count"
    :image="fall.image"
  />
</template>
