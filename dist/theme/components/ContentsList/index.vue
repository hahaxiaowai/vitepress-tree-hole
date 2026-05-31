<script setup lang="ts">
import type { Post } from "../../posts.data";
import { useData, withBase } from "vitepress";
import { Card } from "@/components/ui/card";
import TagChip from "../TagChip.vue";

defineProps<{
  dataList: Post[];
}>();

const { theme } = useData();

const { blogList } = theme.value;
const imagesLocation = blogList?.imagesLocation;

function randomImages() {
  const imgNum = Math.floor(Math.random() * 5) + 1;
  return new URL(`./img/img_${imgNum}.jpg`, import.meta.url).href;
}

function blogListImagesSize(item: { imgURL: string }) {
  let imagesSize = "150px";
  if (theme.value.blogList?.imagesSize === "small") {
    imagesSize = "100px";
  }
  else if (theme.value.blogList?.imagesSize === "large") {
    imagesSize = "200px";
  }
  return {
    backgroundImage: item.imgURL ? `url(${item.imgURL})` : `url(${randomImages()})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: imagesSize,
  };
}

function postHref(url: string) {
  return withBase(url);
}

function tagVariant(): "soft" | "solid" | "contrast" {
  if (theme.value.blogList) {
    return "contrast";
  }
  return theme.value.iconTags ? "solid" : "soft";
}

function isImagesShow(index: number) {
  if ((index % 2 === 0 && imagesLocation === "reversal") || imagesLocation === "left") {
    return true;
  }
  if ((index % 2 !== 0 && imagesLocation === "reversal") || imagesLocation === "right") {
    return false;
  }
  return true;
}
</script>

<template>
  <div class="space-y-5">
    <template v-if="theme.blogList && imagesLocation && imagesLocation !== 'center'">
      <a
        v-for="(item, index) in dataList"
        :key="index"
        class="group block mx-auto w-[90%] rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--vp-c-bg)]"
        :href="postHref(item.url)"
      >
        <Card
          class="overflow-hidden rounded-3xl bg-[var(--vp-c-bg)] shadow-[var(--vp-shadow)] [transition-property:transform,box-shadow,background-color] duration-200 group-hover:-translate-y-0.5 group-hover:bg-[var(--vp-c-bg-elv)] group-hover:shadow-[var(--vp-shadow-hover)]"
        >
          <div class="flex flex-col min-[900px]:flex-row">
            <div
              v-if="imagesLocation === 'leftRight' || isImagesShow(index)"
              class="min-h-[160px] w-full overflow-hidden min-[900px]:w-[30%]"
            >
              <div
                :style="blogListImagesSize(item)"
                class="size-full min-h-[160px] transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div class="flex w-full flex-1 flex-col justify-center gap-4 px-5 py-5 min-[900px]:w-[70%]">
              <div class="text-2xl font-semibold text-[var(--vp-c-text-1)]">
                {{ item.title }}
              </div>
              <div class="flex flex-wrap items-center gap-3 text-sm text-[var(--vp-c-text-2)]">
                <span>{{ item.date.string }}</span>
                <div v-if="item.frontmatter.tags" class="flex flex-wrap gap-2">
                  <TagChip
                    v-for="(tag, tagIndex) in item.frontmatter.tags"
                    :key="tagIndex"
                    :index="tagIndex"
                    :label="tag"
                    :style="theme.iconTagStyle"
                    :variant="tagVariant()"
                    class="text-xs"
                  />
                </div>
              </div>
            </div>
            <div
              v-if="imagesLocation === 'leftRight' || !isImagesShow(index)"
              class="min-h-[160px] w-full overflow-hidden min-[900px]:w-[30%]"
            >
              <div
                :style="blogListImagesSize(item)"
                class="size-full min-h-[160px] transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        </Card>
      </a>
    </template>
    <template v-else>
      <a
        v-for="(item, index) in dataList"
        :key="index"
        class="group block mx-auto w-[90%] rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--vp-c-bg)]"
        :href="postHref(item.url)"
      >
        <Card
          class="relative overflow-hidden rounded-3xl bg-[var(--vp-c-bg)] px-5 py-5 shadow-[var(--vp-shadow)] [transition-property:transform,box-shadow,background-color] duration-200 group-hover:-translate-y-0.5 group-hover:bg-[var(--vp-c-bg-elv)] group-hover:shadow-[var(--vp-shadow-hover)]"
        >
          <div
            v-if="theme.blogList"
            class="absolute inset-0"
            :style="blogListImagesSize(item)"
          />
          <div
            v-if="theme.blogList"
            class="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,24,39,0.78)_0%,rgba(17,24,39,0.32)_100%)] transition duration-300 group-hover:bg-[linear-gradient(90deg,rgba(17,24,39,0.88)_0%,rgba(17,24,39,0.55)_100%)]"
          />
          <div class="relative z-10 flex flex-col gap-4">
            <div class="text-2xl font-semibold" :class="theme.blogList ? 'text-white' : 'text-[var(--vp-c-text-1)]'">
              {{ item.title }}
            </div>
            <div class="flex flex-wrap items-center gap-3 text-sm" :class="theme.blogList ? 'text-white/80' : 'text-[var(--vp-c-text-2)]'">
              <span>{{ item.date.string }}</span>
              <div v-if="item.frontmatter.tags" class="flex flex-wrap gap-2">
                <TagChip
                  v-for="(tag, tagIndex) in item.frontmatter.tags"
                  :key="tagIndex"
                  :index="tagIndex"
                  :label="tag"
                  :style="theme.iconTagStyle"
                  :variant="tagVariant()"
                  class="text-xs"
                />
              </div>
            </div>
          </div>
        </Card>
      </a>
    </template>
  </div>
</template>
