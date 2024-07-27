<script setup lang="ts">
import { ref } from 'vue';
const show = ref(false)
const active = ref(false)
const backTop = () => {
  active.value = true;
  scrollTo({
    top: 0,
    behavior: 'smooth'
  })
  setTimeout(() => {
    active.value = false
  }, 1000)
}
window.addEventListener('scrollend', () => {
  console.log(window.scrollY, window.innerHeight)
  if (window.scrollY > (window.innerHeight * 0.9)) {
    show.value = true
  } else {
    show.value = false
  }
})
</script>
<template>
  <div v-if="show" :class="active ? 'btn active' : 'btn'" @click="backTop">
    <svg t="1722062582377" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
      p-id="4821" width="50" height="50">
      <path
        d="M662.72 462.784l136.448 169.408v173.248l-136.448-48.32zM342.72 457.344L206.272 626.816v173.248l136.448-48.384z"
        fill="#3A7EB9" p-id="4822"></path>
      <path
        d="M570.688 418.688l-142.848 1.152a266.496 266.496 0 0 1-20.288-0.576l3.712 448.64c0.256 28.928 94.272 130.048 94.272 130.048s93.888-102.656 93.632-131.584l-3.712-448.96a344.64 344.64 0 0 1-24.768 1.28z"
        fill="#D48171" p-id="4823"></path>
      <path
        d="M531.456 599.296l-63.04 0.576c-3.008 0-5.952-0.064-8.96-0.384l2.176 257.792c0.128 16.64 41.728 74.816 41.728 74.816s41.344-58.944 41.28-75.52l-2.176-257.92c-3.648 0.384-7.296 0.64-11.008 0.64z"
        fill="#E9DF92" p-id="4824"></path>
      <path
        d="M554.304 93.568a324.352 324.352 0 0 0-110.592 1.728L342.72 240.768v584.512c13.824-0.96 27.968-1.536 42.368-1.536h245.248c11.84 0 23.36 0.384 34.816 1.024V253.312L554.304 93.568z"
        fill="#B5D5EB" p-id="4825"></path>
      <path
        d="M541.44 94.144L500.416 35.008l-45.696 59.136v29.504h89.024v-29.504zM459.456 288.64h88.96v88.896h-88.96zM459.456 467.456h88.96v88.96h-88.96zM459.456 634.176h88.96v88.896h-88.96zM364.928 788.736h277.76v44.352h-277.76z"
        fill="#3A7EB9" p-id="4826"></path>
    </svg>
  </div>
</template>
<style scoped>
  .tinUpOut {
    -webkit-animation-name: tinUpOut;
    animation-name: tinUpOut;
  }

  @-webkit-keyframes tinUpOut {

    0%,
    20%,
    40%,
    50% {
      opacity: 1;
      -webkit-transform: scale(1, 1) translateY(0);
      transform: scale(1, 1) translateY(0);
    }

    10%,
    30% {
      opacity: 1;
      -webkit-transform: scale(1.1, 1.1) translateY(0);
      transform: scale(1.1, 1.1) translateY(0);
    }

    100% {
      opacity: 0;
      -webkit-transform: scale(1, 1) translateY(-900%);
      transform: scale(1, 1) translateY(-900%);
    }
  }

  @keyframes tinUpOut {

    0%,
    20%,
    40%,
    50% {
      opacity: 1;
      -webkit-transform: scale(1, 1) translateY(0);
      transform: scale(1, 1) translateY(0);
    }

    10%,
    30% {
      opacity: 1;
      -webkit-transform: scale(1.1, 1.1) translateY(0);
      transform: scale(1.1, 1.1) translateY(0);
    }

    100% {
      opacity: 0;
      -webkit-transform: scale(1, 1) translateY(-900%);
      transform: scale(1, 1) translateY(-900%);
    }
  }

  .btn {
    position: fixed;
    bottom: 5vh;
    right: 5vw;
    background-color: var(--vp-c-indigo-1);
    padding: 0.25rem;
    border-radius: 2.5rem;
    cursor: pointer;
  }

  .btn:hover {
    transform: scale(1.1, 1.1)
  }

  .active {
    animation: tinUpOut 1s;
  }

</style>