<script setup lang="ts">
import { useData, useRoute } from "vitepress";
import VPDocAside from "vitepress/dist/client/theme-default/components/VPDocAside.vue";
import VPDocFooter from "vitepress/dist/client/theme-default/components/VPDocFooter.vue";
import { useSidebar } from "vitepress/theme";
import { computed } from "vue";
import { cn } from "../lib/cn";
import TagChip from "./TagChip.vue";
import "../styles/widen.css";

const { theme, frontmatter } = useData();
const isWiden = computed(() => frontmatter.value.type === "widen");
const route = useRoute();
const { hasSidebar, hasAside, leftAside } = useSidebar();

const pageName = computed(() =>
  route.path.replace(/[./]+/g, "_").replace(/_html$/, ""),
);

const contentClasses = computed(() => {
  if (isWiden.value) {
    return "content-widen";
  }
  if (!hasSidebar.value) {
    return "mx-auto w-full max-w-[752px] min-[1440px]:max-w-[784px]";
  }
  return "mx-auto w-full max-w-[688px]";
});

function tagHref(value: string) {
  return `/${theme.value.route.tag}?tag=${encodeURIComponent(value)}`;
}
</script>

<template>
  <div class="w-full min-h-screen px-6 pb-24 pt-8 min-[768px]:px-8 min-[768px]:pb-32 min-[768px]:pt-12 min-[960px]:pb-0">
    <slot name="doc-top" />
    <div :class="isWiden ? 'container-widen' : 'mx-auto flex w-full max-w-[1204px] justify-center gap-8'">
      <aside
        v-if="hasAside && !isWiden"
        class="relative hidden w-full max-w-64 shrink-0 min-[1280px]:block"
        :class="leftAside ? 'order-first pr-8' : 'order-last pl-8'"
      >
        <div class="fixed top-0 h-screen w-56 overflow-x-hidden overflow-y-auto pt-[calc(var(--vp-nav-height)_+_var(--vp-layout-top-height,0px)_+_var(--vp-doc-top-height,0px)_+_48px)] [scrollbar-width:none]">
          <div class="pointer-events-none fixed bottom-0 z-10 h-8 w-56 bg-[linear-gradient(180deg,transparent_0%,var(--vp-c-bg)_70%)]" />
          <div class="flex min-h-[calc(100vh_-_(var(--vp-nav-height)_+_var(--vp-layout-top-height,0px)_+_48px))] flex-col pb-8">
            <VPDocAside>
              <template #aside-top>
                <slot name="aside-top" />
              </template>
              <template #aside-bottom>
                <slot name="aside-bottom" />
              </template>
              <template #aside-outline-before>
                <slot name="aside-outline-before" />
              </template>
              <template #aside-outline-after>
                <slot name="aside-outline-after" />
              </template>
              <template #aside-ads-before>
                <slot name="aside-ads-before" />
              </template>
              <template #aside-ads-after>
                <slot name="aside-ads-after" />
              </template>
            </VPDocAside>
          </div>
        </div>
      </aside>

      <div :class="cn('relative w-full min-[960px]:pb-32', contentClasses)">
        <div :class="isWiden ? 'content-container-widen' : 'mx-auto'">
          <slot name="doc-before" />
          <main class="min-w-0">
            <Content
              class="vp-doc"
              :class="[
                pageName,
                theme.externalLinkIcon && 'external-link-icon-enabled',
              ]"
            />
          </main>
          <div v-if="frontmatter.tags" class="mt-6 flex flex-wrap items-center gap-3">
            <TagChip
              v-for="(item, index) in frontmatter.tags"
              :key="index"
              :href="tagHref(item)"
              :index="index"
              :label="item"
              :style="theme.iconTagStyle"
              :variant="theme.iconTags ? 'solid' : 'soft'"
            />
          </div>
          <VPDocFooter class="mt-6">
            <template #doc-footer-before>
              <slot name="doc-footer-before" />
            </template>
          </VPDocFooter>
          <slot name="back-top" />
          <slot name="doc-after" />
          <slot name="comment" />
        </div>
      </div>
    </div>
    <slot name="doc-bottom" />
  </div>
</template>
