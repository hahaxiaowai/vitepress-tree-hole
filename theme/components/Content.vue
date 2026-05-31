<script setup lang="ts">
import VPHome from "vitepress/dist/client/theme-default/components/VPHome.vue";
import VPPage from "vitepress/dist/client/theme-default/components/VPPage.vue";
import { useData } from "vitepress/dist/client/theme-default/composables/data";
import { useSidebar } from "vitepress/dist/client/theme-default/composables/sidebar";
import NotFound from "vitepress/dist/client/theme-default/NotFound.vue";
import { computed } from "vue";
import { cn } from "../lib/cn";
import Blog from "./Blog/index.vue";
import Doc from "./Doc.vue";
import FilterBlog from "./FilterBlog.vue";
import Memo from "./Memo/index.vue";
import TimeLine from "./TimeLine.vue";

const { page, frontmatter } = useData();
const { hasSidebar } = useSidebar();

const contentClasses = computed(() =>
  cn(
    "w-full grow shrink-0",
    frontmatter.value.layout === "home"
      ? "mt-[var(--vp-layout-top-height,0px)] max-w-none"
      : "mt-[var(--vp-layout-top-height,0px)]",
    !hasSidebar.value && "min-[960px]:pt-[var(--vp-nav-height)]",
    hasSidebar.value
    && "m-0 min-[960px]:mt-[var(--vp-layout-top-height,0px)] min-[960px]:pt-[var(--vp-nav-height)] min-[960px]:pl-[var(--vp-sidebar-width)] min-[1440px]:pr-[calc((100vw_-_var(--vp-layout-max-width))_/_2)] min-[1440px]:pl-[calc((100vw_-_var(--vp-layout-max-width))_/_2_+_var(--vp-sidebar-width))]",
  ),
);
</script>

<template>
  <div id="VPContent" :class="contentClasses">
    <slot v-if="page.isNotFound" name="not-found">
      <NotFound />
    </slot>

    <VPPage v-else-if="frontmatter.layout === 'page'">
      <template #page-top>
        <slot name="page-top" />
      </template>
      <template #page-bottom>
        <slot name="page-bottom" />
      </template>
    </VPPage>

    <VPHome v-else-if="frontmatter.layout === 'home'">
      <template #home-hero-before>
        <slot name="home-hero-before" />
      </template>
      <template #home-hero-info-before>
        <slot name="home-hero-info-before" />
      </template>
      <template #home-hero-info>
        <slot name="home-hero-info" />
      </template>
      <template #home-hero-info-after>
        <slot name="home-hero-info-after" />
      </template>
      <template #home-hero-actions-after>
        <slot name="home-hero-actions-after" />
      </template>
      <template #home-hero-image>
        <slot name="home-hero-image" />
      </template>
      <template #home-hero-after>
        <slot name="home-hero-after" />
      </template>
      <template #home-features-before>
        <slot name="home-features-before" />
      </template>
      <template #home-features-after>
        <slot name="home-features-after" />
      </template>
    </VPHome>
    <TimeLine v-else-if="frontmatter.layout === 'timeline'">
      <template #back-top>
        <slot name="back-top" />
      </template>
    </TimeLine>
    <Blog v-else-if="frontmatter.layout === 'blog'" />
    <FilterBlog
      v-else-if="frontmatter.layout === 'category' || frontmatter.layout === 'tag' || frontmatter.layout === 'filter'"
    />
    <Memo v-else-if="frontmatter.layout === 'memo'" />
    <component :is="frontmatter.layout" v-else-if="frontmatter.layout && frontmatter.layout !== 'doc'" />

    <Doc v-else>
      <template #doc-top>
        <slot name="doc-top" />
      </template>
      <template #doc-bottom>
        <slot name="doc-bottom" />
      </template>

      <template #doc-footer-before>
        <slot name="doc-footer-before" />
      </template>
      <template #doc-before>
        <slot name="doc-before" />
      </template>
      <template #doc-after>
        <slot name="doc-after" />
      </template>

      <template #aside-top>
        <slot name="aside-top" />
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
      <template #aside-bottom>
        <slot name="aside-bottom" />
      </template>
      <template #comment>
        <slot name="comment" />
      </template>
      <template #back-top>
        <slot name="back-top" />
      </template>
    </Doc>
  </div>
</template>
