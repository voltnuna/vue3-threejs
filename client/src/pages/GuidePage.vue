<template>
  <div iv class="subject">
    <p class="title">TEXT INPUT</p>
    <input type="text" v-model="inputVal" placeholder="Edit ME" />
    <span> OUTPUT: {{ inputVal }}</span>
  </div>
  <div class="subject">
    <p class="title">Checkbox</p>
    <input type="checkbox" name="checkbox" id="checkbox" v-model="checked" />
    <label for="checkbox">Checkbox :{{ checked }}</label>
  </div>

  <div class="subject">
    <p class="title">Multi Checkbox</p>
    <input type="checkbox" id="APPLE" value="APPLE" v-model="multiCheck" />
    <label for="APPLE"> APPLE </label>

    <input type="checkbox" id="BANANA" value="BANANA" v-model="multiCheck" />
    <label for="BANANA"> BANANA</label>

    <input type="checkbox" id="ORANGE" value="ORANGE" v-model="multiCheck" />
    <label for="ORANGE">ORANGE </label>

    <p>Checked names: {{ multiCheck }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const inputVal = ref("");
const multiCheck = ref([]);
const checked = ref(false);
</script>

<style lang="scss" scoped>
.subject {
  .title {
    font-weight: 800;
    font-size: 2rem;
    line-height: 2;
  }
  input {
    padding: 0.8rem;
  }
  padding: 1rem;
  border-bottom: 1px solid gray;
}
</style>
