<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";

const { title, description, theme } = useData();
const hasCoverImage = computed(() => Boolean(theme.value.headImage));

const style = computed(() =>
  Object.assign(
    {},
    theme.value.headStyle || {},
    theme.value.headImage
      ? {
          background: `linear-gradient(135deg, rgb(7 21 15 / 78%), rgb(17 24 39 / 28%)), url(${theme.value.headImage}) center center / cover no-repeat`,
          height: "30vh",
        }
      : {
          background:
            "radial-gradient(circle at top left, rgb(48 164 108 / 24%), transparent 40%), radial-gradient(circle at bottom right, rgb(71 202 255 / 18%), transparent 35%)",
        },
  ),
);

const descriptionClasses = computed(() =>
  hasCoverImage.value ? "text-white/88" : "text-[var(--vp-c-text-2)]",
);

const titleStyle = {
  backgroundImage: "var(--vp-home-hero-name-background)",
};
</script>

<template>
  <section class="mx-auto flex min-h-[30vh] w-[min(92rem,100%-2rem)] flex-col items-center justify-center gap-5 overflow-hidden rounded-[2rem] border border-[color:var(--vp-c-divider)] px-6 py-10 text-center shadow-[var(--vp-shadow)] min-[768px]:px-10" :style="style">
    <div class="max-w-4xl bg-clip-text text-4xl font-semibold tracking-tight text-transparent min-[768px]:text-6xl" :style="titleStyle">
      {{ theme.title || title }}
    </div>
    <p class="max-w-xl text-base font-medium leading-7 [text-wrap:balance] min-[768px]:text-xl min-[768px]:leading-8" :class="descriptionClasses">
      {{ theme.description || description }}
    </p>
  </section>
</template>
