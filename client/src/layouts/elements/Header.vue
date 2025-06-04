<template>
  <div class="header">
    <!-- After Login -->
    <div v-if="userStore.nickname" class="wrap">
      <img
        :src="gravatar.url(email, { s: '50px', d: 'wavatar' })"
        :alt="`${nickname}의 프로필 이미지`"
        :title="email"
        @click.prevent="onToggler"
      />
      <ul v-if="active" class="dropdown">
        <li><button type="button" @click="onLogout">로그아웃</button></li>
      </ul>
    </div>
    <!-- Before Login -->
    <ul v-else>
      <li v-if="pathStore.currentPath === '/login'">
        <a href="/signup">signup</a>
      </li>
      <li v-else>
        <a href="/login">login</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import gravatar from "gravatar";

import { useUserStore } from "@stores/userStore.ts";
import { usePathStore } from "@/stores/pathStore";
import useRouter from "@/router";

const userStore = useUserStore();
const pathStore = usePathStore();
const { email, nickname } = storeToRefs(userStore);

const active = ref(false);
const onToggler = () => (active.value = !active.value);
const onLogout = async () => await userStore.logout();

onMounted(() => userStore.nickname.length < 0 && useRouter.push("/login"));
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
  .wrap {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
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
  top: 50%;
  right: 50px;
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
