<script setup lang="ts">
import HomeTop from './HomeTop.vue'
import List from './List.vue'
import HomeRight from './HomeRight/index.vue';
import HomeFooter from './HomeFooter.vue';
import Fall from './Fall/index.vue';
const width = window.outerWidth

</script>

<template>
  <home-top />
  <div class="flex-content">
    <list />

    <home-right v-if="width >= 768" />
  </div>
  <fall />
  <home-footer />
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