<script setup lang="ts">
import type { HTMLAttributes, StyleValue } from "vue";
import { withBase } from "vitepress";
import { computed } from "vue";
import { cn } from "../lib/cn";
import { getContrastingTextColor, getThemeColorByIndex, hexToRgba } from "../utils/common";

interface Props {
  as?: "span" | "a" | "button";
  href?: string;
  label: string;
  index?: number;
  variant?: "soft" | "solid" | "contrast";
  active?: boolean;
  class?: HTMLAttributes["class"];
  style?: StyleValue;
}

const props = withDefaults(defineProps<Props>(), {
  as: "span",
  index: 0,
  variant: "soft",
  active: false,
});

const tagName = computed(() => (props.href ? "a" : props.as));
const resolvedHref = computed(() => (props.href ? withBase(props.href) : undefined));
const themeColor = computed(() => getThemeColorByIndex(props.index));

const visualStyle = computed(() => {
  const spacing = {
    paddingBlock: "0.375rem",
    paddingInline: "0.75rem",
  };

  if (props.variant === "solid") {
    return {
      ...spacing,
      background: `linear-gradient(135deg, ${hexToRgba(themeColor.value, props.active ? 0.96 : 0.88)} 0%, ${hexToRgba(themeColor.value, props.active ? 0.78 : 0.68)} 100%)`,
      borderColor: hexToRgba(themeColor.value, 0.22),
      color: getContrastingTextColor(themeColor.value),
      boxShadow: props.active
        ? `0 18px 36px -24px ${hexToRgba(themeColor.value, 0.92)}`
        : `0 12px 24px -22px ${hexToRgba(themeColor.value, 0.7)}`,
    };
  }

  if (props.variant === "contrast") {
    return {
      ...spacing,
      background: props.active
        ? "linear-gradient(135deg, rgb(255 255 255 / 0.26) 0%, rgb(255 255 255 / 0.12) 100%)"
        : "linear-gradient(135deg, rgb(255 255 255 / 0.16) 0%, rgb(255 255 255 / 0.06) 100%)",
      borderColor: props.active ? "rgb(255 255 255 / 0.42)" : "rgb(255 255 255 / 0.18)",
      color: "#ffffff",
      boxShadow: props.active ? "0 18px 34px -24px rgb(15 23 42 / 0.65)" : "none",
    };
  }

  return {
    ...spacing,
    background: `linear-gradient(135deg, ${hexToRgba(themeColor.value, props.active ? 0.22 : 0.14)} 0%, ${hexToRgba(themeColor.value, props.active ? 0.08 : 0.04)} 100%)`,
    borderColor: hexToRgba(themeColor.value, props.active ? 0.34 : 0.18),
    color: themeColor.value,
    boxShadow: props.active
      ? `0 18px 34px -26px ${hexToRgba(themeColor.value, 0.82)}`
      : `0 10px 24px -28px ${hexToRgba(themeColor.value, 0.65)}`,
  };
});

const dotStyle = computed(() => {
  if (props.variant === "solid") {
    return {
      backgroundColor: getContrastingTextColor(themeColor.value),
      boxShadow: `0 0 0 5px ${hexToRgba(getContrastingTextColor(themeColor.value), 0.14)}`,
    };
  }

  if (props.variant === "contrast") {
    return {
      backgroundColor: "#ffffff",
      boxShadow: "0 0 0 5px rgb(255 255 255 / 0.12)",
    };
  }

  return {
    backgroundColor: themeColor.value,
    boxShadow: `0 0 0 5px ${hexToRgba(themeColor.value, 0.12)}`,
  };
});

const interactive = computed(() => tagName.value === "a" || tagName.value === "button");

const classes = computed(() =>
  cn(
    "relative inline-flex min-h-8 items-center overflow-hidden rounded-[0.9rem] border px-3 py-1.5 text-sm font-semibold tracking-[0.01em]",
    interactive.value && "cursor-pointer transition-[transform,box-shadow,background-color,border-color,color] duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--vp-c-bg)]",
    props.active && "translate-y-[-1px]",
    props.class,
  ),
);
</script>

<template>
  <component
    :is="tagName"
    :href="resolvedHref"
    :type="tagName === 'button' ? 'button' : undefined"
    :class="classes"
    :style="[visualStyle, props.style]"
  >
    <span class="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/35" aria-hidden="true" />
    <span class="relative z-10 inline-flex items-center gap-2">
      <span class="size-1.5 rounded-full" :style="dotStyle" aria-hidden="true" />
      <span class="leading-none">{{ props.label }}</span>
    </span>
  </component>
</template>
