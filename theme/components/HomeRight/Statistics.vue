<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useData } from "vitepress";
import { getActive, getStats } from "../../api/statistics";

const { theme } = useData();
const isShow = ref(false);

// 获取token后展示

const data = ref([
  {
    title: "总浏览量",
    value: 0,
  },
  {
    title: "今日浏览量",
    value: 0,
  },
]);
const data2 = ref([
  {
    title: "今日访客",
    value: 0,
  },
  {
    title: "当前在线",
    value: 0,
  },
]);
const frontDegree = ref("0deg");
const backDegree = ref("180deg");
function switchCard() {
  const temp = frontDegree.value;
  frontDegree.value = backDegree.value;
  backDegree.value = temp;
}
onMounted(() => {
  setTimeout(() => {
    switchCard();
    setInterval(() => {
      switchCard();
    }, 10000);
  }, 5000);
});
if (theme.value.umami) {
  const { umamiToken, umamiUrl, umamiId } = theme.value.umami;
  if (umamiToken && umamiUrl && umamiId) {
    isShow.value = true;
  }
  const getData = async () => {
    const year = ref((new Date()).getFullYear());
    const start = theme.value.startYear ? new Date(theme.value.startYear).getTime() : new Date(year.value).getTime();
    const total = await getStats(umamiId, umamiUrl, umamiToken, start);
    if (total?.pageviews)
      data.value[0].value = total.pageviews.value;
    const date = new Date();
    const date2 = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 00:00:00`);
    const day = await getStats(umamiId, umamiUrl, umamiToken, date2.getTime() - 0);
    if (day?.pageviews) {
      data.value[1].value = day.pageviews.value;
      data2.value[0].value = day.visitors.value;
    }
    const active = await getActive(umamiId, umamiUrl, umamiToken);
    data2.value[1].value = active.x || 1;
    isShow.value = true;
  };
  if (isShow.value) {
    getData();
  }
}

// login().then(async (res: any) => {
//   const total = await getStats(res.token);
//   if (total?.pageviews) data[0].value = total.pageviews.value;

//   const day = await getStats(res.token, Date.now() - 24 * 60 * 60 * 1000);
//   if (day?.pageviews) {
//     data[1].value = day.pageviews.value;
//     data2[0].value = day.visitors.value;
//   }
//   const active = await getActive(res.token);
//   if (active.x) data2[1].value = active.x;
//   isShow.value = true;
// })
</script>

<template>
  <div v-if="isShow" class="statistics-box" @click="switchCard">
    <div class="statistics front" :style="{ transform: `rotateX(${frontDegree})` }">
      <div v-for="(item, index) in data" :key="index" class="card">
        <div class="title">
          {{ item.title }}
        </div>
        <div class="number">
          {{ item.value }}
        </div>
      </div>
    </div>
    <div class="statistics back" :style="{ transform: `rotateX(${backDegree})` }">
      <div v-for="(item, index) in data2" :key="index" class="card">
        <div class="title">
          {{ item.title }}
        </div>
        <div class="number">
          {{ item.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .statistics-box {
    position: relative;
  }

  .statistics {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    transform-style: preserve-3d;
    transition: transform 1s;
    cursor: pointer;
  }

  .front {
    /* transform: rotateY(0deg); */
    backface-visibility: hidden;
  }

  .back {
    margin-top: -6.0rem;
    /* transform: rotateY(180deg); */
    backface-visibility: hidden;
  }

  /* padding: 1rem; */
  .card {
    margin: 0.5rem;
    padding: 0.8rem 1.2rem;
    width: 40%;
    height: 5rem;
    overflow: hidden;
    border-radius: 0.25rem;
    box-shadow: var(--vp-shadow);
    box-sizing: border-box;
    /* transition: all 0.3s; */
    background-color: var(--vp-c-bg);

    .title {
      font-size: 0.9em;
      color: var(--vp-c-text-2);
      font-weight: 600;
    }

    .number {
      padding-top: 0.5rem;
      padding-left: 0.5rem;
      font-size: 1.5rem;
      color: var(--nt-theme-color-1);
      font-weight: 700;
    }
  }
</style>
