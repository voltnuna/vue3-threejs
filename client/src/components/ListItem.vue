<template>
  <li v-for="(item, index) in lists" :key="index">
    <router-link :to="`/workspace/${item}`">{{ item }}</router-link>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  lists: string[];
}>();
</script>

<style lang="scss" scoped></style>
