<template>
  <div>{{ channel?.values }}</div>
  <div class="head-area"></div>
  <div class="body-area"></div>
  <div class="chatbox-area"></div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useChnStore } from "@stores/channelStore";
import { storeToRefs } from "pinia";

const useChn = useChnStore();
const { channel } = storeToRefs(useChn);

const route = useRoute();
const wsName = ref("");
const chnName = ref("");

watchEffect(() => {
  let paramChn = route.params.channel as string;
  let paramWs = route.params.workspace as string;

  if (!paramChn || !paramWs) {
    const fullpath = route.fullPath.split("/");
    paramChn = fullpath[4]; // ['','workspaces','general','channel',':channel']
    paramWs = fullpath[2]; // ['','workspaces','general','channel',':channel']
    wsName.value = paramWs;
    chnName.value = paramChn;
  }
  if (paramChn) {
    useChn.getChannel(paramWs, paramChn).then(() => {});
  } else {
    console.log("No workspace name found.");
  }
});
</script>

<style scoped lang="scss"></style>
