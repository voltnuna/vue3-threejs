<template>
  <RootLayout :auth="auth" />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import RootLayout from "@layouts/RootLayout.vue";
import { useUserStore } from "@stores/userStore";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { auth } = storeToRefs(userStore);

onMounted(() => {
  userStore.fetchUser().then(() => !auth.value && localStorage.clear());
});
</script>
