<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import { useData } from "vitepress";
import { Draw, getImageByMonth } from "./Fall";

const { theme } = useData();
const show = ref(false);
if (theme.value.fall)
  show.value = true;
onMounted(() => {
  nextTick(() => {
    if (!show.value)
      return;
    const image = new Image();
    if (theme.value.fall.image === "season") {
      image.src = new URL(`./img/${getImageByMonth()}.png`, import.meta.url).href;
    }
    else {
      image.src = new URL(`./img/${theme.value.fall.image}.png`, import.meta.url).href;
    }
    image.onload = () => {
      return new Draw("fall", { drawCount: theme.value.fall.count, image });
    };
  });
});
</script>

<template>
  <canvas v-if="show" id="fall" />
</template>

<style scoped>
  #fall {
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    /* 比sidebar 高一层 */
    z-index: 26;
  }
</style>
