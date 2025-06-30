<template>
  <div :class="{ pageArea: true, logined: !props.auth }">
    <!-- <Header /> -->
    <NaviBar />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import NaviBar from "@layouts/elements/NaviBar.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@stores/userStore";

const props = defineProps<{
  auth: boolean;
}>();
</script>

<!-- 이 곳에는 style에 scoped 속성 주지 말 것 -->
<style lang="scss">
.pageArea {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100%;

  &:not(.logined) {
    padding-left: 34rem;
  }
  &.logined {
    .header,
    .navibar {
      display: none;
    }
  }
}
</style>
