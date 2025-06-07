<template>
  <div v-for="(ws, index) in lists" :key="index">
    <router-link :to="`/workspaces/${ws.name}`" :title="ws.name"
      ><img :src="gravatar.url(ws.name, { s: '53px', d: 'initials' })" alt="" />
    </router-link>
  </div>
</template>

<script setup lang="ts">
import type { IWorkspace, IChannel } from "@/types/db";
defineProps<{
  lists: IWorkspace[];
}>();

import gravatar from "gravatar";
</script>

<style lang="scss" scoped>
a {
  @include display-flex(inline-flex, center, center);
  width: 100%;
  color: #fff;
  padding: 0.5rem 0.5rem;
  cursor: pointer;
  img {
    border-radius: 50%;
  }
}
</style>
