<template>
  <h1>SignUP</h1>
  <form @submit.prevent="onSubmitEvent">
    <div><input type="email" placeholder="Email" v-model="email" /></div>
    <div><input type="text" placeholder="Nickname" v-model="nickname" /></div>
    <div>
      <input type="password" placeholder="Password" v-model="password" />
    </div>
    <div>
      <input type="password" placeholder="Password Check" v-model="pwcheck" />
    </div>
    <div>
      <button type="submit">SignUP</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "@stores/userStore";
import router from "@/router";
const userStore = useUserStore();

const email = ref();
const nickname = ref();
const password = ref();
const pwcheck = ref();

const onSubmitEvent = () => {
  const res = userStore.signup(email.value, nickname.value, password.value);
  console.log("@signup_onSubmitEvent 결과:", res);
};

onMounted(() => {
  userStore.nickname.length && router.push("/workspace");
});
</script>

<style scoped lang="scss"></style>
