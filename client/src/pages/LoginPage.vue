<template>
  <h1>LOGIN</h1>
  <form @submit.prevent="onSubmitEvent">
    <div><input type="email" placeholder="Email" v-model="email" /></div>
    <div>
      <input type="password" placeholder="Password" v-model="password" />
    </div>
    <div>
      <button type="submit">LOGIN</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "@stores/userStore.ts";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const email = ref("");
const password = ref("");

const onSubmitEvent = async () => {
  const res = await userStore.login(email.value, password.value);
  console.log("로그인 페이지 입니다. 로그인 요청 결과: ", res);
  router.push("/workspace");
};

onMounted(() => {
  console.log("로그인 페이지입니다.", userStore.nickname);
  userStore.nickname.length > 0 && router.push("/workspace");
});
</script>

<style scoped lang="scss"></style>
