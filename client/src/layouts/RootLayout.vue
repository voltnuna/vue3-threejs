<template>
  <Header />
  <LNB />
  <div id="pageArea">
    <Workspace />
  </div>
</template>

<script setup lang="ts">
import Header from "@layouts/Header.vue";
import LNB from "@layouts/LNB.vue";
import Workspace from "@layouts/Workspace.vue";
</script>

<!-- 이 곳에는 style에 scoped 속성 주지 말 것 -->
<style lang="scss">
#pageArea {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100%;
  padding-top: 5.6rem;
  padding-left: 24rem;
}
</style>
