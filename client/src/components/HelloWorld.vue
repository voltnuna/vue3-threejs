<template>
  <h1>{{ msg }}</h1>

  <div>
    <button type="button" @click="increment">Counter: {{ count }}</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();
const count = ref(0);
const increment = () => {
  count.value++;
};
</script>

<style scoped></style>
