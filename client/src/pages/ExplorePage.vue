<template>
  <div class="unit">
    <span class="title-b">Text Input</span>
    <input type="text" :placeholder="input1" v-model="input1" />
    <p>{{ input1 }}</p>

    dsfsd
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

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
