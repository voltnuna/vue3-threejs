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
import axios from "axios";
import { ref } from "vue";
import { useUserStore } from "@stores/userStore.ts";
import { storeToRefs } from "pinia";

const userStore = useUserStore(); // 스토어 인스턴스 생성

//pinia의 state를 storeToRefs에 스토어 인스턴스 삽입하여 필요한 state나 getter 등을 구조분해로 가져와사용,
// Pinia store의 state 값을 ref로 바꿔준다. Vue 컴포에서 반응형으로 값을 가져올 때 사용.
const { id, nickname } = storeToRefs(userStore);

const email = ref();
const password = ref();

const onSubmitEvent = () => {
  axios
    .post("/api/users/login", {
      email: email.value,
      password: password.value,
    })
    .then((res) => {
      userStore.setUser({ ...res.data });
    })
    .catch((err) => {
      console.log("로그인 실패", err.resposne.data);
    })
    .finally(() => {
      console.log("pinia 저장 확인", id.value, nickname.value);
    });
};
</script>

<style scoped lang="scss"></style>
