<template>
  <h1 class="bigtitle">ExplorePage</h1>
</template>

<script setup lang="ts">
import { useUserStore } from "@stores/userStore.ts";
import router from "@/router";
import { onMounted, ref } from "vue";

const userStore = useUserStore();

//import ThumbNail from "@components/ThumbNail.vue";

onMounted(() => {
  console.log("익스플로어 페이지입니다: ", userStore.nickname);
  userStore.nickname.length <= 0 && router.push("/login");
});
</script>

<style lang="scss" scoped>
.bigtitle {
  font-size: 3rem;
  font-weight: 800;
}

.unit {
  display: block;
}
.title-b {
  font-size: 1.8rem;
  font-weight: 900;
  margin: 0 1rem;
}
</style>
