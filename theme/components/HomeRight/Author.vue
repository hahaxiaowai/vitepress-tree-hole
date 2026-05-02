<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const props = defineProps<{
  author?: string;
  authorImage?: string;
  docCount?: number;
  tagCount?: number;
  categoryCount?: number;
}>();
</script>

<template>
  <section class="flex flex-col items-center gap-5 px-5 py-6">
    <Avatar
      v-if="props.authorImage || props.author"
      size="base"
      class="size-24 border-4 border-white/60 shadow-[var(--vp-shadow)]"
    >
      <AvatarImage v-if="props.authorImage" :src="props.authorImage" :alt="props.author || '作者头像'" />
      <AvatarFallback class="bg-[var(--nt-theme-color-soft)] text-[var(--nt-theme-color-1)]">
        {{ props.author?.slice(0, 1) || "NT" }}
      </AvatarFallback>
    </Avatar>
    <div v-if="props.author" class="text-2xl font-semibold text-[var(--vp-c-text-1)]">
      {{ props.author }}
    </div>
    <div class="grid w-full grid-cols-3 gap-3 text-center">
      <Card class="rounded-2xl border-0 bg-[var(--vp-c-bg-soft)] px-3 py-4 shadow-none">
        <div class="text-xl font-semibold text-[var(--nt-theme-color-1)]">
          {{ props.docCount || 0 }}
        </div>
        <div class="mt-1 text-xs tracking-[0.2em] text-[var(--vp-c-text-2)]">
          文章
        </div>
      </Card>
      <Card class="rounded-2xl border-0 bg-[var(--vp-c-bg-soft)] px-3 py-4 shadow-none">
        <div class="text-xl font-semibold text-[var(--nt-theme-color-1)]">
          {{ props.tagCount || 0 }}
        </div>
        <div class="mt-1 text-xs tracking-[0.2em] text-[var(--vp-c-text-2)]">
          标签
        </div>
      </Card>
      <Card class="rounded-2xl border-0 bg-[var(--vp-c-bg-soft)] px-3 py-4 shadow-none">
        <div class="text-xl font-semibold text-[var(--nt-theme-color-1)]">
          {{ props.categoryCount || 0 }}
        </div>
        <div class="mt-1 text-xs tracking-[0.2em] text-[var(--vp-c-text-2)]">
          分类
        </div>
      </Card>
    </div>
    <Separator class="opacity-60" />
  </section>
</template>
