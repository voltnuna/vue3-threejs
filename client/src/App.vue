<script setup lang="ts">
import { useUserStore } from "@stores/userStore";
import DefaultLayout from "@layouts/DefaultLayout.vue";
import { watch } from "vue";
import { storeToRefs } from "pinia";
import router from "./router";

const userStore = useUserStore();
const { nickname } = storeToRefs(userStore);

watch(nickname, () => {
  console.log("APP에서 nickname 감시중", nickname.value);
  nickname.value.length <= 0 && router.push("/");
});
</script>

<template>
  <div id="contentArea">
    <DefaultLayout />
    <div class="page-area">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss">
#contentArea {
  display: flex;
  justify-content: center;
  height: 100%;
  min-height: 100%;
  padding-top: 5.6rem;
  .page-area {
    width: 100%;
    height: 100%;
  }
}
</style>
