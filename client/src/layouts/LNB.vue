<template>
  <div class="lnb">
    <ul>
      <LNBItem :menus="menulist" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LNBItem from "@components/LNBItem.vue";

const menulist = ref(["홈", "shorts", "구독", "인급동"]);
</script>

<style lang="scss" scoped>
.lnb {
  position: fixed;
  top: 56px;
  left: 0;
  width: 24rem;
  height: 100%;
  background-color: #212121;
}
</style>
