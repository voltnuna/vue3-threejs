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

<!-- ### POST /users/login

- 로그인
- body: { email: string(이메일), password: string(비밀번호) }
- return: IUser -->

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { useUserStore } from "@stores/userStore.ts"; // 경로에 맞게 수정
import { storeToRefs } from "pinia";

const userStore = useUserStore(); // 스토어 인스턴스 생성

const email = ref();
const password = ref();

const onSubmitEvent = () => {
  alert("submit");

  axios
    .post("/api/users/login", {
      email: email.value,
      password: password.value,
    })
    .then((res) => {
      console.log("로그인성공!!!", res.data);
      userStore.setUser({
        id: res.data.id,
        email: res.data.email,
        nickname: res.data.nickname,
      });
    })
    .catch((err) => {
      console.log("로그인 실패", err.resposne.data);
    });
};
</script>

<style scoped lang="scss"></style>
