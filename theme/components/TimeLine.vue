<script setup lang="ts">
import type { Post } from "../posts.data";
import { withBase } from "vitepress";
import { computed } from "vue";
import { Card } from "@/components/ui/card";
import { data } from "../posts.data";
import Empty from "./Empty.vue";
import TagChip from "./TagChip.vue";

const posts = computed<Post[]>(() =>
  data.posts.filter(post =>
    post.frontmatter.timeline === undefined || post.frontmatter.timeline === true,
  ),
);

const yearSections = computed(() => {
  const groups = new Map<string, Post[]>();

  for (const post of posts.value) {
    const year = new Date(post.date.time).getFullYear().toString();
    const section = groups.get(year);

    if (section) {
      section.push(post);
    }
    else {
      groups.set(year, [post]);
    }
  }

  return Array.from(groups, ([year, items]) => ({ year, items }));
});

function postHref(url: string) {
  return withBase(url);
}

function formatMonthDay(time: number) {
  const date = new Date(time);

  return {
    month: `${date.getMonth() + 1}`.padStart(2, "0"),
    day: `${date.getDate()}`.padStart(2, "0"),
  };
}

function excerptPreview(excerpt?: string) {
  const plain = excerpt?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  if (!plain) {
    return "";
  }

  return plain.length > 92 ? `${plain.slice(0, 92)}...` : plain;
}
</script>

<template>
  <div v-if="yearSections.length" class="mx-auto w-full max-w-[1180px] px-4 pb-10 pt-8 min-[768px]:px-8">
    <div class="space-y-8">
      <section
        v-for="section in yearSections"
        :key="section.year"
        class="grid gap-5 rounded-[2rem] bg-[linear-gradient(180deg,var(--vp-c-bg)_0%,var(--vp-c-bg-soft)_100%)] p-4 shadow-[var(--vp-shadow)] min-[960px]:grid-cols-[12rem_minmax(0,1fr)] min-[960px]:p-6"
      >
        <div class="flex flex-col gap-3 min-[960px]:sticky min-[960px]:top-[calc(var(--vp-nav-height)+2rem)] min-[960px]:self-start">
          <div class="inline-flex w-fit items-center rounded-full bg-[var(--vp-c-bg)] px-4 py-2 text-sm font-semibold tracking-[0.3em] text-[var(--nt-theme-color-1)] shadow-[var(--vp-shadow)]">
            {{ section.year }}
          </div>
          <p class="max-w-[12rem] text-sm leading-6 text-[var(--vp-c-text-2)]">
            这一年共整理了 {{ section.items.length }} 篇内容。
          </p>
        </div>

        <div class="grid gap-4">
          <a
            v-for="post in section.items"
            :key="post.url"
            :href="postHref(post.url)"
            class="group block rounded-[1.75rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--vp-c-bg)]"
          >
            <Card
              class="overflow-hidden rounded-[1.75rem] bg-[var(--vp-c-bg)] shadow-[var(--vp-shadow)] [transition-property:transform,box-shadow,background-color] duration-200 group-hover:-translate-y-0.5 group-hover:bg-[var(--vp-c-bg-elv)] group-hover:shadow-[var(--vp-shadow-hover)]"
            >
              <div class="grid gap-4 p-5 min-[768px]:grid-cols-[7rem_minmax(0,1fr)] min-[768px]:items-start">
                <div class="flex flex-col items-start gap-2">
                  <div class="inline-flex items-end gap-2 rounded-[1.25rem] bg-[var(--nt-theme-color-soft)] px-4 py-3 text-[var(--nt-theme-color-1)]">
                    <span class="text-3xl font-semibold leading-none">{{ formatMonthDay(post.date.time).day }}</span>
                    <span class="pb-0.5 text-sm font-medium">{{ formatMonthDay(post.date.time).month }}月</span>
                  </div>
                  <span class="inline-flex items-center rounded-full bg-[var(--vp-c-bg-soft)] px-3 py-1 text-xs tracking-[0.18em] text-[var(--vp-c-text-2)]">
                    {{ post.date.string }}
                  </span>
                </div>

                <div class="space-y-3">
                  <div class="flex items-start justify-between gap-3">
                    <h3 class="text-xl font-semibold text-[var(--vp-c-text-1)] transition-colors group-hover:text-[var(--nt-theme-color-1)]">
                      {{ post.title }}
                    </h3>
                    <span class="hidden rounded-full bg-[var(--vp-c-bg-soft)] px-3 py-1 text-xs text-[var(--vp-c-text-2)] min-[768px]:inline-flex">
                      年度档案
                    </span>
                  </div>

                  <p v-if="excerptPreview(post.excerpt)" class="max-w-3xl text-sm leading-7 text-[var(--vp-c-text-2)]">
                    {{ excerptPreview(post.excerpt) }}
                  </p>

                  <div v-if="post.frontmatter.tags?.length" class="flex flex-wrap gap-2">
                    <TagChip
                      v-for="(tag, index) in post.frontmatter.tags.slice(0, 4)"
                      :key="tag"
                      :index="index"
                      :label="tag"
                      variant="soft"
                      class="text-xs"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </a>
        </div>
      </section>
    </div>
  </div>
  <Empty v-else class="mx-auto mt-6 max-w-[900px]" />

  <slot name="back-top" />
  <content />
</template>
