<script setup lang="ts">
import Header from "@layouts/Header.vue";
import LNB from "@layouts/LNB.vue";
</script>

<template>
  <Header />
  <div id="contentArea">
    <LNB />
    <div class="view-area">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss">
#content {
  font-size: 16px;
}
#contentArea {
  display: flex;
  justify-content: center;
  height: 100%;
  min-height: 100%;
  padding-top: 5.6rem;
  .view-area {
    width: 100%;
    height: 100%;
  }
}
</style>
