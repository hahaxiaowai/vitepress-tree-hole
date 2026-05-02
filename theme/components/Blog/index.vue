<script setup lang="ts">
import HomeRight from "../HomeRight/index.vue";
import List from "../List.vue";
import HomeTop from "./BlogTop.vue";
</script>

<template>
  <HomeTop />
  <div class="mx-auto flex w-full max-w-[1440px] gap-6 px-4 pb-6 pt-6 min-[1024px]:px-6">
    <List class="min-w-0 flex-1" />
    <div class="hidden shrink-0 min-[1024px]:block">
      <HomeRight />
    </div>
  </div>
  <content />
</template>
