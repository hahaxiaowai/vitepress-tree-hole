<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getStats, getActive } from '../../api/statistics';
import { useData } from 'vitepress';
const { theme } = useData()
const isShow = ref(false);
if (theme.value.umamiToken) {
  isShow.value = true
}
// 获取token后展示

const data = [
  {
    title: "总浏览量",
    value: 0,
  },
  {
    title: "今日浏览量",
    value: 0,
  },
]
const data2 = [
  {
    title: "今日访客",
    value: 0,
  },
  {
    title: "当前在线",
    value: 0,
  },
]
const frontDegree = ref('0deg');
const backDegree = ref('180deg');
const switchCard = () => {
  const temp = frontDegree.value;
  frontDegree.value = backDegree.value;
  backDegree.value = temp;
}
onMounted(() => {
  setTimeout(() => {
    switchCard();
    setInterval(() => {
      switchCard()
    }, 10000)
  }, 5000)

})
const getData = async () => {
  const total = await getStats(theme.value.umamiToken);
  if (total?.pageviews) data[0].value = total.pageviews.value;
  const date = new Date();
  const date2 = new Date(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)
  const day = await getStats(theme.value.umamiToken, date2.getTime() - 0);
  if (day?.pageviews) {
    data[1].value = day.pageviews.value;
    data2[0].value = day.visitors.value;
  }
  const active = await getActive(theme.value.umamiToken);
  data2[1].value = active.x || 1;
  isShow.value = true;
}
if (theme.value.umamiToken) {
  isShow.value = true
  getData()
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
    <div class="statistics front" :style="{ transform: 'rotateX(' + frontDegree + ')' }">
      <div class="card" v-for="(item, index) in data" :key="index">
        <div class="title">{{ item.title }}</div>
        <div class="number">{{ item.value }}</div>
      </div>
    </div>
    <div class="statistics back" :style="{ transform: 'rotateX(' + backDegree + ')' }">
      <div class="card" v-for="(item, index) in data2" :key="index">
        <div class="title">{{ item.title }}</div>
        <div class="number">{{ item.value }}</div>
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
    color: var(--vp-c-indigo-1);
    font-weight: 700;
  }
}
</style>