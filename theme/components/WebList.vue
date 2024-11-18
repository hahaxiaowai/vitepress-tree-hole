<script setup lang="ts">
import { useRouter } from "vitepress";
import defaultSvg from "./Svg.vue";

const props = defineProps<{
  list: { title: string; icon?: string; desc?: string; link: string; tag: string[] }[];
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
  <div class="list" :style="{ justifyContent: props.justifyContent }">
    <div v-for="(item, index) in props.list" :key="index" :class="`list-box ${type}`" @click="jumpTo(item.link)">
      <div class="flex-row">
        <div v-if="item.icon" class="icon-box">
          <default-svg v-if="defaultIcon(item.icon)" :name="item.icon" />
          <img v-else :src="item.icon" alt="" srcset="">
        </div>
        <div class="title">
          {{ item.title }}
        </div>
      </div>
      <div class="desc" v-html="item.desc" />
    </div>
  </div>
</template>

<style scoped>
  .list {
    display: flex;
    flex-wrap: wrap;

    .list-box {
      padding: 0.5rem;
      margin: 0.5rem;
      border: 1px solid var(--vp-c-bg-soft);
      background-color: var(--vp-c-bg-soft);
      transition: border-color .25s, background-color .25s;
      border-radius: 0.5rem;
      width: 250px;
      /* height: 6.5rem; */

      .flex-row {
        /* margin: 1rem; */
        display: flex;

        .icon-box {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: var(--vp-c-default-soft);
          width: 2.5rem;
          height: 2.5rem;
          font-size: 24px;
          transition: background-color .25s;
          border-radius: 0.2rem;

          .icon {
            width: 2rem;
            height: 2rem;
          }

          img {
            width: 1.8rem;
            height: 1.8rem;
          }

        }

        .title {
          display: flex;
          align-items: center;
          /* text-justify:auto; */
          line-height: 1rem;
          height: 2.5rem;
          font-size: 1rem;
          padding-left: 1rem;
          font-weight: 600;
        }
      }

      .desc {
        line-height: 1.2rem;
        padding: 0.6rem 0.3rem;
        font-size: 0.85rem;
        font-weight: 400;
        color: var(--vp-c-text-2);
      }
    }

    .full {
      width: 100%;
    }

    .list-box:hover {
      transition: 0.3s;
      box-shadow: var(--vp-shadow-hover);
      border: 1px solid var(--nt-theme-color-1);
    }

  }

  @media screen and (width<768px) {
    .list {
      justify-content: center;
    }
  }
</style>
