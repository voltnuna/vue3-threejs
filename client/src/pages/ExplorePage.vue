<template>
  <ThumbNail />
</template>

<script setup lang="ts">
import { ref } from "vue";
import ThumbNail from "@components/ThumbNail.vue";

const input1 = ref("input1");
</script>

<style lang="scss" scoped>
.unit {
  display: block;
}
.title-b {
  font-size: 1.8rem;
  font-weight: 900;
  margin: 0 1rem;
}
</style>
