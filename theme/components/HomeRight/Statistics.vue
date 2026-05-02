<script setup lang="ts">
import { useData } from "vitepress";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { Card } from "@/components/ui/card";
import { getActive, getStats } from "../../api/statistics";

type StatsSide = "traffic" | "presence";

interface StatItem {
  title: string;
  value: number;
}

const labels = {
  trafficTab: "浏览",
  presenceTab: "在线",
  trafficOverview: "访问概览",
  presenceOverview: "访客状态",
  trafficEyebrow: "访问统计",
  presenceEyebrow: "在线人数",
  trafficDescription: "看一眼最近的阅读热度与浏览积累",
  presenceDescription: "跟踪当下访客活跃度与在线变化",
  totalViews: "累计浏览",
  todayViews: "今日浏览",
  todayVisitors: "今日访客",
  onlineNow: "当前在线",
  trafficBadge: "浏览热度",
  presenceBadge: "实时在线",
  trafficHintTitle: "更新频率",
  presenceHintTitle: "状态提示",
  trafficHintText: "每 10 秒轮换视图",
  presenceHintText: "数据可用时自动刷新",
} as const;

const { theme } = useData();
const isShow = ref(false);
const side = ref<StatsSide>("traffic");
let timer: number | undefined;

const trafficStats = ref<StatItem[]>([
  { title: labels.totalViews, value: 0 },
  { title: labels.todayViews, value: 0 },
]);

const presenceStats = ref<StatItem[]>([
  { title: labels.todayVisitors, value: 0 },
  { title: labels.onlineNow, value: 0 },
]);

const panelMeta = computed(() =>
  side.value === "traffic"
    ? {
        eyebrow: labels.trafficEyebrow,
        title: labels.trafficOverview,
        description: labels.trafficDescription,
        accent: "rgb(47 148 100 / 0.18)",
      }
    : {
        eyebrow: labels.presenceEyebrow,
        title: labels.presenceOverview,
        description: labels.presenceDescription,
        accent: "rgb(71 202 255 / 0.18)",
      },
);

const currentStats = computed(() =>
  side.value === "traffic" ? trafficStats.value : presenceStats.value,
);

const heroStat = computed(() => currentStats.value[0]);
const subStat = computed(() => currentStats.value[1]);

function formatValue(value: number) {
  return new Intl.NumberFormat("zh-CN").format(value);
}

function switchCard(next?: StatsSide) {
  side.value = next ?? (side.value === "traffic" ? "presence" : "traffic");
}

onMounted(() => {
  timer = window.setInterval(switchCard, 10000);
});

onBeforeUnmount(() => {
  if (timer) {
    window.clearInterval(timer);
  }
});

if (theme.value.umami) {
  const { umamiToken, umamiUrl, umamiId } = theme.value.umami;
  if (umamiToken && umamiUrl && umamiId) {
    isShow.value = true;
  }

  const getData = async () => {
    const year = new Date().getFullYear();
    const start = theme.value.startYear
      ? new Date(theme.value.startYear).getTime()
      : new Date(year).getTime();

    try {
      const total = await getStats(umamiId, umamiUrl, umamiToken, start);
      if (total?.pageviews) {
        trafficStats.value[0].value = total.pageviews.value;
      }

      const date = new Date();
      const startOfDay = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 00:00:00`);
      const day = await getStats(umamiId, umamiUrl, umamiToken, startOfDay.getTime());
      if (day?.pageviews) {
        trafficStats.value[1].value = day.pageviews.value;
        presenceStats.value[0].value = day.visitors.value;
      }

      const active = await getActive(umamiId, umamiUrl, umamiToken);
      presenceStats.value[1].value = active.x || 1;
    }
    catch (error) {
      console.warn("Failed to load Umami statistics.", error);
    }
  };

  onMounted(() => {
    if (isShow.value) {
      void getData();
    }
  });
}
</script>

<template>
  <section v-if="isShow" class="px-5 pt-4 pb-3">
    <div class="relative overflow-hidden rounded-[1.75rem] bg-[linear-gradient(160deg,var(--vp-c-bg)_0%,var(--vp-c-bg-soft)_60%,var(--vp-c-bg)_100%)] p-5 shadow-[var(--vp-shadow)]">
      <div
        class="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full blur-3xl"
        :style="{ backgroundColor: panelMeta.accent }"
      />
      <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgb(255_255_255_/_0.45)_50%,transparent_100%)]" />

      <div class="relative z-10 space-y-5">
        <div class="flex flex-col gap-4 min-[420px]:flex-row min-[420px]:items-start min-[420px]:justify-between">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2 rounded-full bg-[var(--vp-c-bg)]/80 px-3 py-1 text-[11px] font-semibold tracking-[0.28em] text-[var(--vp-c-text-2)] shadow-[var(--vp-shadow)]">
              <span class="size-2 rounded-full bg-[var(--nt-theme-color-1)]" />
              {{ panelMeta.eyebrow }}
            </div>
            <!-- <div>
              <h3 class="text-xl font-semibold text-[var(--vp-c-text-1)]">
                {{ panelMeta.title }}
              </h3>
              <p class="mt-1 max-w-xs text-sm leading-6 text-[var(--vp-c-text-2)]">
                {{ panelMeta.description }}
              </p>
            </div> -->
          </div>

          <button
            type="button"
            class="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-[var(--vp-c-bg)]/78 px-4 py-2 text-sm font-medium text-[var(--vp-c-text-1)] shadow-[var(--vp-shadow)] backdrop-blur transition-[background-color,color,transform,box-shadow] duration-200 hover:bg-[var(--vp-c-bg)]/92 hover:text-[var(--nt-theme-color-1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--nt-theme-color-1)]/40"
            :aria-label="side === 'traffic' ? `切换到${labels.presenceTab}` : `切换到${labels.trafficTab}`"
            @click="switchCard()"
          >
            <span
              class="size-2.5 rounded-full"
              :class="side === 'traffic' ? 'bg-[var(--nt-theme-color-1)]' : 'bg-sky-400'"
            />
            <span>{{ side === "traffic" ? labels.trafficTab : labels.presenceTab }}</span>
          </button>
        </div>

        <div class="grid gap-3 min-[640px]:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <Card class="overflow-hidden rounded-[1.5rem] border-0 bg-[linear-gradient(145deg,var(--vp-c-bg)_0%,rgb(255_255_255_/_0.55)_100%)] px-5 py-5 shadow-none dark:bg-[linear-gradient(145deg,rgb(255_255_255_/_0.04)_0%,rgb(255_255_255_/_0.02)_100%)]">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-xs font-semibold tracking-[0.2em] text-[var(--vp-c-text-2)]">
                  {{ heroStat.title }}
                </p>
                <div class="mt-4 text-4xl font-semibold tracking-tight text-[var(--vp-c-text-1)]">
                  {{ formatValue(heroStat.value) }}
                </div>
              </div>
              <!-- <div class="inline-flex items-center rounded-full bg-[var(--nt-theme-color-soft)] px-3 py-1 text-xs font-medium text-[var(--nt-theme-color-1)]">
                {{ side === "traffic" ? labels.trafficBadge : labels.presenceBadge }}
              </div> -->
            </div>
          </Card>

          <div class="grid gap-3">
            <Card class="rounded-[1.5rem] border-0 bg-[var(--vp-c-bg)]/78 px-4 py-4 text-center shadow-none dark:bg-white/4">
              <div class="text-xs font-semibold tracking-[0.2em] text-[var(--vp-c-text-2)]">
                {{ subStat.title }}
              </div>
              <div class="mt-3 text-3xl font-semibold text-[var(--nt-theme-color-1)]">
                {{ formatValue(subStat.value) }}
              </div>
            </Card>

            <!-- <Card class="rounded-[1.5rem] border-0 bg-[var(--vp-c-bg)]/78 px-4 py-4 shadow-none dark:bg-white/4">
              <div class="flex items-center justify-between gap-3">
                <div>
                  <div class="text-xs font-semibold tracking-[0.2em] text-[var(--vp-c-text-2)]">
                    {{ side === "traffic" ? labels.trafficHintTitle : labels.presenceHintTitle }}
                  </div>
                  <div class="mt-2 text-sm leading-6 text-[var(--vp-c-text-2)]">
                    {{ side === "traffic" ? labels.trafficHintText : labels.presenceHintText }}
                  </div>
                </div>
                <span class="inline-flex size-9 items-center justify-center rounded-full bg-[var(--nt-theme-color-soft)] text-[var(--nt-theme-color-1)]">
                  {{ side === "traffic" ? "01" : "02" }}
                </span>
              </div>
            </Card> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
