<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
  search: Function
}>()
const filter = ref('')

</script>

<template>
  <div flex flex-col justify-center items-center>
    <!-- <input v-model="memoStore.filter" autocomplete="off" rounded-1 placeholder="搜索" @search="search" /> -->
    <div class="search" flex justify-end>
      <input v-model="filter" class="input" type="text" placeholder="搜索" mt-2 @keyup.enter="props.search(filter)">
    </div>
  </div>
</template>

<style scoped>
  .search {
    width: 768px;

    .input {
      padding: 0.25rem;
      padding-left: 0.5rem;
      border-radius: var(--tm-rounded);
      background-color: var(--vp-c-bg-alt);
      width: 250px;
      height: 40px;
      font-size: 1rem;
    }
  }

  @media screen and (max-width: 430px) {
    .search {
      width: 100vw;

      .input {
        width: 250px;
      }
    }
  }
</style>