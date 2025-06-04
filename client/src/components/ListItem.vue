<template>
  <li v-for="(item, index) in lists" :key="index">
    <a :href="`/workspace/${item}`"></a>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  lists: string[];
}>();
</script>

<style lang="scss" scoped></style>
