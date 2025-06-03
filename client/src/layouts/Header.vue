<template>
  <div class="header">
    <button type="button">MENU</button>
    <div class="search-wrap">
      <form class="search-word">
        <input type="text" v-model="keyword" placeholder="검색" />
        <button type="submit" @click.prevent="onSearchHandler">검색</button>
      </form>
      <div class="search-voice">
        <button type="button" @click.prevent="onListenKeyword">음성검색</button>
      </div>
    </div>
    <ul>
      <li>
        <a href="">{{}} </a>
      </li>
      <li v-if="userStore.nickname">
        <button type="button" @click.prevent="onLogout">Logout</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { onMounted, ref } from "vue";
import { useUserStore } from "@stores/userStore.ts";

const userStore = useUserStore();

const keyword = ref("");
const onSearchHandler = () => {};
const onListenKeyword = () => {};

const onLogout = async () => {
  await userStore.logout();
};

onMounted(() => userStore.nickname.length < 0 && router.push("/login"));
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 5.6rem;
  background-color: #0f0f0f;
  color: #fff;
  @include display-flex(flex, space-between, center);
  .search-wrap {
    @include display-flex;
  }
}
</style>
