<script setup lang="ts">
import { useRouter } from "vitepress";
import { Card } from "@/components/ui/card";
import DefaultSvg from "./Svg.vue";

const props = defineProps<{
  list: { title: string; icon?: string; desc?: string; link: string; tag?: string[] }[];
  type?: "normal" | "full";
  linkType?: "blank" | "router";
  justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly";
}>();

const router = useRouter();

function defaultIcon(url: string) {
  const images = ["github", "demo"];
  const index = images.indexOf(url);
  if (index >= 0) {
    return images[index];
  }
  return false;
}

function jumpTo(website: string) {
  if (props.linkType === "router") {
    router.go(website);
  }
  else {
    window.open(website, "_blank");
  }
}
</script>

<template>
  <div class="flex flex-wrap gap-4" :style="{ justifyContent: props.justifyContent }">
    <Card
      v-for="(item, index) in props.list"
      :key="index"
      class="w-[250px] cursor-pointer rounded-3xl bg-[var(--vp-c-bg)] px-4 py-4 shadow-[var(--vp-shadow)] [transition-property:transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[var(--vp-c-bg-elv)] hover:shadow-[var(--vp-shadow-hover)]"
      :class="type === 'full' && 'w-full'"
      @click="jumpTo(item.link)"
    >
      <div class="flex items-start gap-4">
        <div
          v-if="item.icon"
          class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--vp-c-default-soft)] text-2xl text-[var(--vp-c-text-1)]"
        >
          <DefaultSvg v-if="defaultIcon(item.icon)" :name="item.icon" />
          <img v-else :src="item.icon" alt="" class="size-8">
        </div>
        <div class="space-y-2">
          <div class="flex min-h-10 items-center text-base font-semibold text-[var(--vp-c-text-1)]">
            {{ item.title }}
          </div>
          <div class="text-sm leading-6 text-[var(--vp-c-text-2)]" v-html="item.desc" />
        </div>
      </div>
    </Card>
  </div>
</template>
