<template>
  <RootLayout :auth="auth" />
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted } from "vue";
import router from "./router";
import RootLayout from "@layouts/RootLayout.vue";
import { useUserStore } from "@stores/userStore";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { auth } = storeToRefs(userStore);
onBeforeMount(() => {
  if (!auth) {
    console.log("APP.vue mount 전 로컬스토리지 리셋");
    localStorage.clear();
  }
});
onMounted(() => {
  //  !auth.value && router.push("/");
});
</script>
