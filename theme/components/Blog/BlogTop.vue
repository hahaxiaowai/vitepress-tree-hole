<script setup lang="ts">
import { useData } from "vitepress";

const { title, description, theme } = useData();

const style = Object.assign({}, theme.value.headStyle || {}, theme.value.headImage ? { background: `url(${theme.value.headImage}) center center / cover no-repeat`, height: "30vh" } : {});
</script>

<template>
  <div class="home-top" :style="style">
    <div class="title">
      {{ theme.title || title }}
    </div>
    <div class="description">
      {{ theme.description || description }}
    </div>
  </div>
</template>

<style scoped>
.home-top{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column
}
.title{
  font-size: 2.5rem;
  line-height: 2.5rem;
  font-weight: 600;
  background: var(--vp-home-hero-name-background);
  background-clip: text;
  -webkit-text-fill-color: var(--vp-home-hero-name-color);
}
.description{
  font-size: 1.5rem;
  font-weight: 600;
  background: var(--vp-home-hero-name-background);
  background-clip: text;
  -webkit-text-fill-color: var(--vp-home-hero-name-color);
}
</style>
