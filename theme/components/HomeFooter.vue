<script setup lang="ts">
import { ref } from 'vue';
import { useData } from 'vitepress'
const { theme, isDark } = useData()
import { getStats } from '../api/statistics';
const { umamiToken, umamiUrl, umamiId } = theme.value.umami
const count = ref(0);
const year = ref((new Date()).getFullYear())
const getData = async () => {
  const start = theme.value.startYear ? new Date(theme.value.startYear).getTime() : new Date(year.value).getTime()
  const total = await getStats(umamiId, umamiUrl, umamiToken, start,);
  if (total?.pageviews) count.value = total.pageviews.value;
}
if (umamiToken && umamiUrl && umamiId) {
  getData()
}
const jumpTo = () => {
  window.open("https://github.com/hahaxiaowai/vitepress-tree-hole", '_blank')
}
</script>

<template>
  <div class="home-footer">
    <div class="flex" @click="jumpTo">
      <svg t="1718900204155" class="icon" :fill="isDark ? '#8B8B8B' : '#7F7F7F'" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" p-id="6638" width="20" height="20">
        <path
          d="M768 388v475.2c0 17.6-14.4 32-32 32H288c-17.6 0-32-14.4-32-32V390.4l-72.8 40c-8 4-17.6 1.6-21.6-6.4L72 268c-4.8-8-1.6-17.6 6.4-21.6l216-117.6h46.4c6.4 0 12.8 4 15.2 10.4 19.2 51.2 82.4 89.6 156.8 89.6 75.2 0 137.6-37.6 156.8-89.6 2.4-6.4 8-10.4 15.2-10.4h46.4l214.4 117.6c8 4 10.4 14.4 5.6 21.6l-88 156c-4 8-14.4 10.4-21.6 5.6L768 388z"
          p-id="6639"></path>
      </svg>
      vitepress-tree-hole
    </div>
    <div class="flex">
      <svg t="1718900068559" class="icon" :fill="isDark ? '#8B8B8B' : '#7F7F7F'" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" p-id="5449" width="16" height="20">
        <path
          d="M516.224 42.666667a469.333333 469.333333 0 1 0 469.333333 469.333333 467.968 467.968 0 0 0-469.333333-469.333333z m4.266667 678.4a133.290667 133.290667 0 0 0 136.533333-98.133334h72.533333a203.776 203.776 0 0 1-213.333333 157.866667c-157.866667 0-238.933333-119.466667-238.933333-273.066667 0-145.066667 81.066667-277.333333 243.2-277.333333 128 0 196.266667 72.533333 209.066666 162.133333h-72.533333a133.205333 133.205333 0 0 0-140.8-102.4c-119.466667 0-166.4 106.666667-166.4 213.333334s46.933333 217.6 170.666667 217.6z"
          p-id="5450"></path>
      </svg>
      {{ theme.author || '' }} {{ theme.startYear || year }} ~ {{ year }}
    </div>
    <div class="flex" v-if="count">
      <svg t="1718899204675" class="icon" :fill="isDark ? '#8B8B8B' : '#7F7F7F'" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" p-id="4263" width="20" height="20">
        <path d="M508 512m-112 0a112 112 0 1 0 224 0 112 112 0 1 0-224 0Z" p-id="4264"></path>
        <path
          d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3-7.7 16.2-7.7 35.2 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z"
          p-id="4265"></path>
      </svg>
      {{ count }}
    </div>
  </div>
</template>

<style scoped>
  .home-footer {
    color: var(--vp-c-indigo-1);
    padding-top: 2rem;
    height: 5rem;
    line-height: 20px;

    display: flex;
    justify-content: center;
    font-size: .9rem;

    .flex {
      display: flex;
      align-items: center;
      cursor: pointer;

      svg {
        margin-right: 0.2rem;
      }
    }

    div {
      padding: 0rem 1rem;
    }
  }

  @media screen and (width<768px) {
    .home-footer {
      font-size: .8rem;

      .flex {
        display: flex;

        svg {
          margin-right: 0.2rem;
        }
      }

      div {
        padding: 0rem 0.4rem;
      }
    }
  }
</style>