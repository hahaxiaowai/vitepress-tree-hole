<script setup lang="ts">
import HomeTop from "./HomeTop.vue";
import List from "./List.vue";
import HomeRight from "./HomeRight/index.vue";
import HomeFooter from "./HomeFooter.vue";
import Fall from "./Fall/index.vue";

const width = window.outerWidth;
</script>

<template>
  <HomeTop />
  <div class="flex-content">
    <List />

    <HomeRight v-if="width >= 768" />
  </div>
  <Fall />
  <HomeFooter />
  <content />
</template>

<style scoped>
.flex-content {
  padding-top: 1rem;
  display: flex;
  justify-content: center;
  flex: auto
}
</style>
