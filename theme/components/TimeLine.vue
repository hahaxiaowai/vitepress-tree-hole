<script setup lang="ts">
import HomeFooter from "./HomeFooter.vue";
import BackTop from "./BackTop.vue";
import { data, Post } from "../posts.data";
import { useRouter } from "vitepress";
import Fall from './Fall/index.vue';
const posts: Post[] = [];
data.posts.forEach((post) => {
  if (
    post.frontmatter.timeline === undefined ||
    post.frontmatter.timeline === true
  ) {
    posts.push(post);
  }
});
const { go } = useRouter();
const formatDate = (time: any) => {
  const date = new Date(time);
  const month = date.getMonth() + 1;
  const d = date.getDate();
  return `${month > 9 ? month : "0" + month}-${d > 9 ? d : "0" + d}`;
};
const showYear = (index: number) => {
  const year = posts[index].date.string.substring(0, 4);
  if (index) {
    const last = posts[index - 1].date.string.substring(0, 4);
    if (last === year) return "";
  }
  return year;
};
</script>

<template>
  <div class="timeline">
    <div class="flex-content">
      <div class="doc-box" v-for="(post, index) in posts" :key="index - 1" @click="go(post.url)">
        <div class="dot"></div>
        <div class="year">{{ showYear(index) }}</div>
        <div class="time">{{ formatDate(post.date.time) }}</div>
        <div class="title">{{ post?.title }}</div>
        <div class="info">
          <div v-if="post.frontmatter.tags" v-for="tag in post.frontmatter.tags">
            {{ tag }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <fall />
  <back-top />
  <home-footer />
  <content />
</template>

<style scoped>
  .timeline {
    position: relative;
    display: flex;
    justify-content: center;
    padding-top: 1rem;
  }

  .timeline:before {
    position: absolute;
    left: 30vw;
    top: 0;
    content: " ";
    display: block;
    width: 0.4rem;
    height: 100%;
    background: var(--vp-c-text-2);
    z-index: 5;
  }

  .flex-content {
    width: 70vw;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .doc-box {
      padding: 1rem;
      width: 100%;
      transition: all 0.3s;
      background-color: var(--vp-c-bg);
      cursor: pointer;
      display: flex;

      .dot {
        z-index: 2;
        margin-top: 0.3rem;
        height: 1rem;
        width: 1rem;
        background-color: var(--vp-c-text-2);
        border-radius: 100%;
        position: absolute;
        left: calc(30vw - 0.3rem);
      }

      .info {
        display: flex;
        font-size: 0.9rem;
        color: var(--vp-c-text-3);

        div {
          margin-left: 15px;
        }
      }

      .year {
        margin-left: calc(15vw - 5.5rem);
        width: 5rem;
        min-width: 5rem;
        font-size: 1.4rem;
        line-height: 1.4rem;
        text-align: left;
        color: var(--vp-c-indigo-1);
        font-weight: 600;
      }

      .time {
        width: 5rem;
        min-width: 5rem;
        text-align: center;
        font-size: 1.28rem;
      }

      .title {
        margin-left: 1rem;
        text-align: left;
        font-size: 1.1rem;
        white-space: normal;
      }
    }

    .doc-box:hover {
      color: var(--vp-c-indigo-1);

      .dot {
        background-color: var(--vp-c-indigo-1);
      }
    }
  }

  @media screen and (width<768px) {
    .timeline:before {
      left: 10vw;
    }

    .flex-content {
      width: 100vw;

      .doc-box {
        /* flex-direction: column; */
        flex-wrap: wrap;

        .dot {
          left: calc(10vw - 0.3rem);
        }

        .year {
          position: absolute;
          right: 0;
          /* margin-left: calc(20vw - 2.5rem); */
          /* min-width: 0rem;
          width: auto; */
        }

        .time {
          margin-left: 10vw;
          text-align: left;
        }

        .title {
          margin-top: 1rem;
          margin-left: calc(15vw);
          width: 70vw;
          text-align: left;
        }

        .info {
          margin-left: calc(15vw);
        }
      }
    }
  }
</style>

