<template>
  <p class="title">INPUT STYLE</p>

  <div class="underline">
    <div class="divide">
      <span>large </span>
      <input
        type="text"
        v-model="inputVal"
        placeholder="Edit ME"
        class="input input-lg"
      />
    </div>
    <div class="divide">
      <span>medium </span>
      <input
        type="text"
        v-model="inputVal"
        placeholder="Edit ME"
        class="input input-md"
      />
    </div>
    <div class="divide">
      <span>small </span>
      <input
        type="text"
        v-model="inputVal"
        placeholder="Edit ME"
        class="input input-sm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const inputVal = ref("");
const multiCheck = ref([]);
const checked = ref(false);
</script>

<style lang="scss" scoped>
.divide {
  margin: 1rem;
}
.title {
  font-weight: 800;
  font-size: 2rem;
  line-height: 2;
  margin: 0 1rem;
}
.underline {
  @include display-flex(flex, center, center);

  padding: 1rem;
  border-bottom: 1px solid gray;
}

.input {
  padding: 0.8rem;
  margin: 0.5rem 0;
  border-radius: 7px;

  &-lg {
    padding: 1rem;
    font-size: 1.8rem;
  }
  &-md {
    width: 24rem;
    padding: 1.1rem;
    font-size: 1.4rem;
    border: 1px solid #615f5f;
  }
  &-sm {
    padding: 0.5rem;
    font-size: 1.4rem;
  }
}
</style>
