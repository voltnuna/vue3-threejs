<template>
  <div v-if="_path.params.id === 'dm'">
    <DmPage />
  </div>
  <div v-else-if="_path.params.id === 'channel'">
    <ChannelPage />
  </div>
  <div v-else>
    <h1>404</h1>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import DmPage from "@pages/DmPage.vue";
import ChannelPage from "@pages/ChannelPage.vue";

const _path = useRoute();
</script>

<style scoped></style>
