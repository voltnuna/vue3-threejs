<template>
  <div class="container">
    <NaviBar />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import NaviBar from "@layouts/elements/NaviBar.vue";
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
