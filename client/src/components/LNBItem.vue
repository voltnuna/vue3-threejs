<template>
  <li v-for="(menu, index) in menus" :key="index">
    <a href="/signup"> {{ menu }} </a>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  menus: string[];
}>();
</script>

<style lang="scss" scoped>
li {
  display: flex;
  width: 100%;
  text-align: center;
  height: 3.5rem;
}
a {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 2rem;
  color: #fff;
  &::before {
    display: block;
    content: "";
    width: 20px;
    height: 20px;
    text-align: center;
  }
}
</style>
