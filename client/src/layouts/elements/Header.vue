<template>
  <div class="header">
    <!-- After Login -->
    <div v-if="userStore.nickname" class="wrap">
      <button type="button" @click="onToggler">{{ nickname }} 님</button>
      <ul v-if="active" class="dropdown">
        <li><button type="button" @click="onLogout">로그아웃</button></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import gravatar from "gravatar";

import { useUserStore } from "@stores/userStore.ts";

const userStore = useUserStore();
const { email, nickname } = storeToRefs(userStore);

import { useRouter } from "vue-router";

const router = useRouter();

const active = ref(false);
const onToggler = () => (active.value = !active.value);

const onLogout = () => {
  const res = userStore.logout();
  res.then(() => {
    router.push("/login");
  });
};
</script>
<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 4.6rem;
  /* background-color: #0f0f0f; */
  /* border-bottom: 1px solid #474141; */
  box-shadow: 0 0 6px 3px rgba(0, 0, 0, 0.3);
  background-color: #212121;
  color: #fff;
  @include display-flex(flex, space-between, center);
  .wrap {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0 1.5rem;
    justify-content: flex-end;
    align-items: center;
    button {
      display: flex;
      justify-content: center;
      font-size: 1.6rem;
    }
    img {
      border-radius: 50%;
    }
  }
  ul {
    display: flex;
    li {
      margin: 0 0.5rem;
    }
  }
}
.dropdown {
  position: absolute;
  top: 100%;
  right: 90px;
  width: 13rem;
  height: auto;
  border-radius: 7px;
  background-color: #212121;
  li {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 1rem 0;
    color: #fff;
    &:not(:last-child) {
      border-bottom: 1px solid #615f5f;
    }
    button {
      display: flex;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
