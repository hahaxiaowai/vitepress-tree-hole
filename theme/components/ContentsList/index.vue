<script setup lang='ts'>
import { useData, useRouter } from "vitepress";
import type { Post } from "../../posts.data";

defineProps<{
  dataList: Post[];
}>();

const { theme } = useData();
const { go } = useRouter();

const { blogList } = theme.value;
const imagesLocation = blogList?.imagesLocation;

function randomImages() {
  const imgNum = Math.floor(Math.random() * 5) + 1;
  return `url(./.vitepress/theme/public/img_${imgNum}.jpg)`;
}

function blogListImagesSize(item: { imgURL: string }) {
  let imagesSize;
  if (theme.value.blogList) {
    if (theme.value.blogList.imagesSize === "small") {
      imagesSize = "100px";
    }
    else if (theme.value.blogList.imagesSize === "large") {
      imagesSize = "200px";
    }
    else {
      imagesSize = "150px";
    }
    return {
      backgroundImage: item.imgURL ? `url(${item.imgURL})` : randomImages(),
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: imagesSize,
    };
  }
  return {};
}

function isImagesShow(index: number) {
  if((index % 2 === 0  && imagesLocation === 'reversal') || imagesLocation === 'left') {
    return true
  } else if ((index % 2 !== 0  && imagesLocation === 'reversal') || imagesLocation === 'right'){
    return false
  }
}
</script>

<template>
  <div v-if="theme.blogList && imagesLocation && imagesLocation !== 'center'">
    <div
      v-for="(item, index) in dataList"
      :key="index"
      class=" box group flex justify-center items-center w-9/10 mx-auto mt-3 mb-5 rounded cursor-pointer box-border"
      @click="go(item.url)"
    >
      <div v-if="imagesLocation === 'leftRight' || isImagesShow(index)" class="box-images-right w-3/10 overflow-hidden rounded-l">
        <div 
          :style="blogListImagesSize(item)" 
          class="group-hover:scale-125 transition-transform duration-700" 
        />
      </div>
      <div class="w-7/10 flex flex-col items-center p-4">
        <div class="z-1 text-2xl">
            {{ item.title }}
        </div>
        <div class="z-1 text-base flex mt-3">
          <div> {{ item.date.string }}</div>
          <div v-if="item.frontmatter.tags" class="flex ml-3">
            <div
              v-for="(tag, tagIndex) in item.frontmatter.tags"
              :key="tagIndex"
              class="mr-3"
            >
              {{ tag }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="imagesLocation === 'leftRight' || !isImagesShow(index)" class="box-images w-3/10 overflow-hidden rounded-r">
        <div 
          :style="blogListImagesSize(item)" 
          class="group-hover:scale-125 transition-transform duration-700" 
        />
      </div>
    </div>
  </div>
  <div v-else>
    <div
      v-for="(item, index) in dataList"
      :key="index"
      class="box flex flex-col justify-center w-9/10 mx-auto mt-3 mb-5 px-4 py-5 rounded cursor-pointer"
      :class="theme.blogList ? 'gradient' : ''"
      :style="blogListImagesSize(item)"
      @click="go(item.url)"
    >
      <div class="z-1 text-2xl">
        {{ item.title }}
      </div>
      <div class="z-1 text-base flex mt-3">
        <div> {{ item.date.string }}</div>
        <div v-if="item.frontmatter.tags" class="flex ml-3">
          <div
            v-for="(tag, tagIndex) in item.frontmatter.tags"
            :key="tagIndex"
            class="mr-3"
          >
            {{ tag }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  position: relative;
  box-shadow: var(--vp-shadow);
  transition: all 0.3s;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-bg);
}
.box:hover {
  transition: 0.3s;
  box-shadow: var(--vp-shadow-hover);
  border: 1px solid var(--vp-c-indigo-1);
}
.gradient::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(125, 125, 125, 1), rgba(125, 125, 125, 0.5));
  border-radius: inherit;
}
.gradient:hover::before {
  background: linear-gradient(to right, rgba(125, 125, 125, 1), rgba(125, 125, 125, 0.9));
  transition: background 0.5s ease;
}
.box-images {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 10% 100%);
}
.box-images-right {
  clip-path: polygon(0 0, 90% 0, 100% 100%, 0 100%) !important;
}
.box:hover .box-images {
  transition: 0.3s;
}
</style>