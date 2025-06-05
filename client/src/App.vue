<script setup lang="ts">
import { onMounted, watch } from "vue";
import router from "./router";
import RootLayout from "@layouts/RootLayout.vue";
import { useUserStore } from "@stores/userStore";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { nickname } = storeToRefs(userStore);

onMounted(async () => {
  await userStore.fetchUser();
  userStore.auth && router.push("/");
});

watch(nickname, () => {
  //사용자 nickname 닉값 여부로 login 상태 감시 및 리디렉트
  console.log("APP.vue에서 nickname 감시중", nickname.value);
  nickname.value.length <= 0 && router.push("/");
});
</script>

<template>
  <RootLayout />
</template>
