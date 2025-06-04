<template>
  <Header />
  <div id="pageArea">
    <PageArea />
  </div>
</template>

<script setup lang="ts">
import Header from "@layouts/elements/Header.vue";
import PageArea from "@layouts/elements/PageArea.vue";
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
  padding-left: 34rem;
}
</style>
